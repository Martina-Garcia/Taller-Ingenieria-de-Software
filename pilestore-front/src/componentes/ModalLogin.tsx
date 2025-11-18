import { FC, useState, FormEvent } from "react";
import { X } from "lucide-react";
import { usarAuth } from "../contexto/Auth";
import { iniciarSesionApi } from "../api/api";

interface Props {
  abierto: boolean;
  cerrar: () => void;
}

const ModalLogin: FC<Props> = ({ abierto, cerrar }) => {
  const { iniciarSesion } = usarAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!abierto) return null;

  const manejarSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    try {
      const usuario = await iniciarSesionApi(email, password);
      iniciarSesion(usuario);
      setEmail("");
      setPassword("");
      cerrar();
    } catch (err) {
      setError("Credenciales inválidas o error en el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-5 relative">
        <button
          className="absolute right-3 top-3 text-gray-500"
          onClick={cerrar}
          type="button"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Iniciar sesión</h2>

        <form onSubmit={manejarSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Correo electrónico</label>
            <input
              type="email"
              className="w-full border rounded px-2 py-1 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@pilestore.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full border rounded px-2 py-1 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••"
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-slate-900 text-white py-2 rounded text-sm mt-2 disabled:opacity-60"
          >
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
