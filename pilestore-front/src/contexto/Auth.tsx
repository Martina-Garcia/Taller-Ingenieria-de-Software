import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import type { Usuario } from "../api/api";

interface AuthContextoTipo {
  usuario: Usuario | null;
  iniciarSesion: (usuario: Usuario) => void;
  cerrarSesion: () => void;
  esAdmin: boolean;
}

const AuthContexto = createContext<AuthContextoTipo | undefined>(undefined);

export const ProveedorAuth = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const iniciarSesion = (u: Usuario) => {
    setUsuario(u);
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  const esAdmin = usuario?.rol === "admin";

  return (
    <AuthContexto.Provider
      value={{ usuario, iniciarSesion, cerrarSesion, esAdmin }}
    >
      {children}
    </AuthContexto.Provider>
  );
};

export const usarAuth = (): AuthContextoTipo => {
  const ctx = useContext(AuthContexto);
  if (!ctx) {
    throw new Error("usarAuth debe usarse dentro de ProveedorAuth");
  }
  return ctx;
};
