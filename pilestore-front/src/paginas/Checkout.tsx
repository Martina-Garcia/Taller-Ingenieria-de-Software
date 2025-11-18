import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usarCarrito } from "../contexto/Carrito";
import { usarAuth } from "../contexto/Auth";
import { crearPedidoInvitado, crearPedidoUsuario } from "../api/api";
import type { PagoInfo } from "../api/api";

type MetodoPago = "webpay" | "transferencia";

export default function Checkout() {
  const { items, total, vaciarCarrito } = usarCarrito();
  const { usuario } = usarAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");

  const [metodoPago, setMetodoPago] = useState<MetodoPago>("webpay");

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-4">
          Tu carrito está vacío
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-slate-900 text-white px-4 py-2 rounded"
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  const manejarSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);
    setCargando(true);

    try {
      const pago: PagoInfo = {
        cardNumber: metodoPago,
        cardName: metodoPago,
        exp: "",
        cvv: "",
      };

      const itemsInput = items.map((it) => ({
        productId: it.id,
        cantidad: it.cantidad,
      }));

      if (!usuario) {
        await crearPedidoInvitado(itemsInput, pago, {
          nombre,
          apellido,
          direccion,
        });
      } else {
        await crearPedidoUsuario(usuario.id, itemsInput, pago);
      }

      setMensaje("Pedido realizado con éxito");
      vaciarCarrito();
      setNombre("");
      setApellido("");
      setDireccion("");
      setMetodoPago("webpay");
    } catch (err) {
      setError("Hubo un problema al procesar el pedido.");
    } finally {
      setCargando(false);
    }
  };

  const esInvitado = !usuario;

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Checkout PileStore</h1>
        <button
          onClick={() => navigate("/")}
          className="text-sm underline"
        >
          Volver a la tienda
        </button>
      </header>

      <main className="max-w-4xl mx-auto p-6 grid gap-6 md:grid-cols-[2fr,1fr]">
        <form
          onSubmit={manejarSubmit}
          className="space-y-4 bg-white rounded-xl shadow p-4"
        >
          {esInvitado ? (
            <>
              <h2 className="text-lg font-semibold mb-2">
                Datos del comprador (invitado)
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="block text-sm mb-1">Nombre</label>
                  <input
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Apellido</label>
                  <input
                    className="w-full border rounded px-2 py-1 text-sm"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Dirección</label>
                <input
                  className="w-full border rounded px-2 py-1 text-sm"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-2">
                Comprador
              </h2>
              <p className="text-sm text-gray-700">
                {usuario.nombre} {usuario.apellido} ({usuario.email})
              </p>
              <p className="text-xs text-gray-500">
                Tus datos ya están registrados.
              </p>
            </>
          )}

          <h2 className="text-lg font-semibold mt-4">
            Forma de pago
          </h2>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMetodoPago("webpay")}
              className={`px-4 py-2 rounded border text-sm ${
                metodoPago === "webpay"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-100 text-slate-900 border-slate-300"
              }`}
            >
              Webpay
            </button>
            <button
              type="button"
              onClick={() => setMetodoPago("transferencia")}
              className={`px-4 py-2 rounded border text-sm ${
                metodoPago === "transferencia"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-100 text-slate-900 border-slate-300"
              }`}
            >
              Transferencia
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Simulación de pago, no se realiza cobro real.
          </p>

          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          {mensaje && (
            <p className="text-sm text-green-600 mt-2">{mensaje}</p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="mt-4 bg-slate-900 text-white px-4 py-2 rounded text-sm disabled:opacity-60"
          >
            {cargando ? "Procesando..." : "Confirmar pedido"}
          </button>
        </form>

        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3">
            Resumen del pedido
          </h2>
          <ul className="space-y-2 max-h-64 overflow-y-auto text-sm">
            {items.map((it) => (
              <li
                key={it.id}
                className="flex justify-between"
              >
                <span>
                  {it.emoji} {it.nombre} x {it.cantidad}
                </span>
                <span>
                  $
                  {(
                    Number(it.precio) * it.cantidad
                  ).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </section>
      </main>
    </div>
  );
}
