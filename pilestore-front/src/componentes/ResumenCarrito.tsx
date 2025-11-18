import { FC } from "react";
import { usarCarrito } from "../contexto/Carrito";
import { useNavigate } from "react-router-dom";

const ResumenCarrito: FC = () => {
  const {
    items,
    total,
    cantidadTotal,
    eliminarProducto,
    vaciarCarrito,
  } = usarCarrito();

  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <section className="mt-8 bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Carrito</h2>
        <p className="text-sm text-gray-600">
          Aún no has agregado productos al carrito.
        </p>
      </section>
    );
  }

  const irAlCheckout = () => {
    navigate("/checkout");
  };

  return (
    <section className="mt-8 bg-white rounded-xl shadow p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Carrito</h2>
        <button
          onClick={vaciarCarrito}
          className="text-xs text-red-600 underline"
        >
          Vaciar carrito
        </button>
      </div>

      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <li
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
          </li>
        ))}
      </ul>

      <div className="mt-3 flex justify-between items-center">
        <p className="text-sm">
          Productos: <b>{cantidadTotal}</b>
        </p>
        <p className="text-sm">
          Total: <b>${total.toLocaleString()}</b>
        </p>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={irAlCheckout}
          className="bg-slate-900 text-white px-4 py-2 rounded text-sm"
        >
          Ir al checkout
        </button>
      </div>
    </section>
  );
};

export default ResumenCarrito;
