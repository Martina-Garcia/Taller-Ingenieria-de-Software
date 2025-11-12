import { useEffect, useState } from "react";
import { fetchProductos } from "../api/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductos().then(setProductos).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Panel de administración</h1>
          <button
            onClick={() => navigate("/admin/products/new")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            + Nuevo producto
          </button>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-3 text-gray-800">
            Productos ({productos.length})
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} className="border-b last:border-none">
                  <td className="py-2">{p.id}</td>
                  <td>{p.name || p.nombre}</td>
                  <td>{p.price || p.precio}</td>
                  <td>{p.category || p.categoria}</td>
                  <td className="text-right">
                    <button
                      onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                      className="text-blue-600 text-xs hover:underline"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
              {productos.length === 0 && (
                <tr>
                  <td className="py-3 text-center text-gray-500" colSpan={5}>
                    No hay productos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
