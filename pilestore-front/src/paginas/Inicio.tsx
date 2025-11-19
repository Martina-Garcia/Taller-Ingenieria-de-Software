import { useEffect, useState } from "react";
import { obtenerProductos } from "../api/api";
import type { Producto } from "../api/api";
import Encabezado from "../componentes/Encabezado";
import TarjetaProducto from "../componentes/TarjetaProducto";
import ModalLogin from "../componentes/ModalLogin";
import PanelCarrito from "../componentes/PanelCarrito";

export default function Inicio() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState<string>("");
  const [loginAbierto, setLoginAbierto] = useState(false);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const cargarProductos = async () => {
    try {
      const datos = await obtenerProductos(busqueda);
      setProductos(datos);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, [busqueda]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Encabezado
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        abrirLogin={() => setLoginAbierto(true)}
        abrirCarrito={() => setCarritoAbierto(true)}
      />

      <main className="p-6 max-w-6xl mx-auto">
        {productos.length === 0 ? (
          <p className="text-center text-gray-600">
            No hay productos para mostrar.
          </p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productos.map((p) => (
              <TarjetaProducto key={p.id} producto={p} />
            ))}
          </div>
        )}
      </main>

      <ModalLogin
        abierto={loginAbierto}
        cerrar={() => setLoginAbierto(false)}
      />

      <PanelCarrito
        abierto={carritoAbierto}
        cerrar={() => setCarritoAbierto(false)}
      />
    </div>
  );
}
