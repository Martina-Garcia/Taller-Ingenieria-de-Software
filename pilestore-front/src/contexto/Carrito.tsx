import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import type { Producto } from "../api/api";

export interface ItemCarrito extends Producto {
  cantidad: number;
}

interface CarritoContextoTipo {
  items: ItemCarrito[];
  agregarProducto: (producto: Producto) => void;
  eliminarProducto: (id: number) => void;
  vaciarCarrito: () => void;
  total: number;
  cantidadTotal: number;
}

const CarritoContexto = createContext<CarritoContextoTipo | undefined>(
  undefined
);

export const ProveedorCarrito = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  const agregarProducto = (producto: Producto) => {
    setItems((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarProducto = (id: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const vaciarCarrito = () => setItems([]);

  const total = items.reduce(
    (acc, item) => acc + Number(item.precio) * item.cantidad,
    0
  );

  const cantidadTotal = items.reduce(
    (acc, item) => acc + item.cantidad,
    0
  );

  return (
    <CarritoContexto.Provider
      value={{
        items,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
        total,
        cantidadTotal,
      }}
    >
      {children}
    </CarritoContexto.Provider>
  );
};

export const usarCarrito = (): CarritoContextoTipo => {
  const ctx = useContext(CarritoContexto);
  if (!ctx) {
    throw new Error("usarCarrito debe usarse dentro de un ProveedorCarrito");
  }
  return ctx;
};
