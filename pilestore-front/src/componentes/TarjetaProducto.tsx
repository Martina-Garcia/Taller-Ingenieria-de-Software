import { FC } from "react";
import type { Producto } from "../api/api";
import { usarCarrito } from "../contexto/Carrito";

interface Props {
  producto: Producto;
}

const TarjetaProducto: FC<Props> = ({ producto }) => {
  const { agregarProducto } = usarCarrito();

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center gap-2">
      <div className="text-6xl">{producto.emoji}</div>
      <h3 className="font-semibold text-center">{producto.nombre}</h3>
      <p className="text-gray-700">
        ${Number(producto.precio).toLocaleString()}
      </p>
      <p className="text-xs text-gray-500 text-center">
        {producto.descripcion || "Producto PileStore"}
      </p>
      <button
        onClick={() => agregarProducto(producto)}
        className="mt-3 w-full bg-slate-900 text-white py-2 rounded-lg text-sm"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default TarjetaProducto;
