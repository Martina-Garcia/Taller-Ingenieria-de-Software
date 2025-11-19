import { X } from "lucide-react";
import { usarCarrito } from "../contexto/Carrito";
import { useNavigate } from "react-router-dom";

interface Props {
  abierto: boolean;
  cerrar: () => void;
}

export default function PanelCarrito({ abierto, cerrar }: Props) {
  const {
    items,
    total,
    cantidadTotal,
    eliminarProducto,
    vaciarCarrito,
  } = usarCarrito();
  const navigate = useNavigate();

  if (!abierto) return null;

  const irAlCheckout = () => {
    cerrar();
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="bg-white w-full max-w-sm h-full flex flex-col shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Carrito</h2>
          <button
            onClick={cerrar}
            className="p-1 text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-4">
            <p className="text-sm text-gray-600 text-center">
              Aún no has agregado productos al carrito.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="text-sm font-medium">{item.nombre}</p>
                      <p className="text-xs text-gray-600">
                        ${Number(item.precio).toLocaleString()} x {item.cantidad}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => eliminarProducto(item.id)}
                    className="text-xs text-red-600"
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t px-4 py-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Productos</span>
                <span>{cantidadTotal}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={vaciarCarrito}
                  className="text-xs text-red-600 underline"
                >
                  Vaciar carrito
                </button>
                <button
                  onClick={irAlCheckout}
                  className="bg-slate-900 text-white px-4 py-2 rounded text-sm"
                >
                  Ir al checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
