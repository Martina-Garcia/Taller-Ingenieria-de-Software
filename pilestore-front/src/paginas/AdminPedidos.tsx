import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usarAuth } from "../contexto/Auth";
import { obtenerPedidosAdmin } from "../api/api";
import type { PedidoAdmin } from "../api/api";

export default function AdminPedidos() {
  const { usuario, esAdmin } = usarAuth();
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState<PedidoAdmin[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarPedidos = async () => {
    try {
      setError(null);
      setCargando(true);
      const data = await obtenerPedidosAdmin();
      setPedidos(data);
    } catch (err) {
      setError("Error al cargar pedidos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (!usuario || !esAdmin) return;
    cargarPedidos();
  }, [usuario, esAdmin]);

  if (!usuario || !esAdmin) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-2">Acceso no autorizado</h2>
        <p className="text-sm text-gray-600 mb-4">
          Debes iniciar sesión como administrador para ver esta sección.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-slate-900 text-white px-4 py-2 rounded text-sm"
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">Pedidos (Admin)</h1>
        <button
          onClick={() => navigate("/")}
          className="text-sm underline"
        >
          Volver a la tienda
        </button>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        {cargando && <p className="text-sm text-gray-600">Cargando pedidos...</p>}
        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        {!cargando && pedidos.length === 0 && !error && (
          <p className="text-sm text-gray-600">
            No hay pedidos registrados.
          </p>
        )}

        <div className="space-y-4">
          {pedidos.map((pedido) => {
            const nombreCliente =
              pedido.user
                ? `${pedido.user.nombre} ${pedido.user.apellido}`
                : pedido.invitado_nombre || pedido.invitado_apellido
                ? `${pedido.invitado_nombre ?? ""} ${
                    pedido.invitado_apellido ?? ""
                  }`.trim()
                : "Invitado";

            return (
              <div
                key={pedido.id}
                className="bg-white rounded-xl shadow p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-sm">
                      Pedido #{pedido.id} ·{" "}
                      <span className="uppercase text-xs bg-slate-100 px-2 py-1 rounded">
                        {pedido.estado}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Fecha:{" "}
                      {new Date(pedido.fecha_creacion).toLocaleString()}
                    </p>
                  </div>
                  <p className="font-semibold">
                    Total: ${pedido.total.toLocaleString()}
                  </p>
                </div>

                <p className="text-sm mb-2">
                  Cliente: <span className="font-medium">{nombreCliente}</span>
                </p>

                <ul className="text-sm space-y-1 border-t pt-2 mt-2">
                  {pedido.items.map((it) => (
                    <li
                      key={it.id}
                      className="flex justify-between"
                    >
                      <span>
                        {it.product.emoji} {it.product.nombre} x{" "}
                        {it.cantidad}
                      </span>
                      <span>
                        $
                        {(
                          Number(it.precio_unitario) * it.cantidad
                        ).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
