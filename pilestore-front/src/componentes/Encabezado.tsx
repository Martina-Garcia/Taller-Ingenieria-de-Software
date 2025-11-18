import { FC } from "react";
import { Search, User } from "lucide-react";
import { usarAuth } from "../contexto/Auth";
import { useNavigate } from "react-router-dom";

interface Props {
  busqueda: string;
  setBusqueda: (valor: string) => void;
  abrirLogin: () => void;
}

const Encabezado: FC<Props> = ({ busqueda, setBusqueda, abrirLogin }) => {
  const { usuario, cerrarSesion, esAdmin } = usarAuth();
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-slate-900 text-white">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        PileStore
      </h1>

      <div className="relative w-1/3">
        <Search className="absolute left-2 top-2 text-gray-400" size={18} />
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full pl-8 pr-3 py-2 rounded bg-slate-800 text-sm outline-none"
        />
      </div>

      <div className="flex items-center gap-3 text-sm">
        {esAdmin && (
          <button
            onClick={() => navigate("/admin/pedidos")}
            className="bg-slate-800 px-3 py-2 rounded"
          >
            Pedidos admin
          </button>
        )}

        {usuario ? (
          <div className="flex flex-col items-end">
            <span className="flex items-center gap-1">
              <User size={16} />
              {usuario.nombre} {esAdmin && "(admin)"}
            </span>
            <button
              className="text-xs text-red-300 underline mt-1"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button
            onClick={abrirLogin}
            className="flex items-center gap-1 bg-slate-800 px-3 py-2 rounded"
          >
            <User size={16} />
            Iniciar sesión
          </button>
        )}
      </div>
    </header>
  );
};

export default Encabezado;
