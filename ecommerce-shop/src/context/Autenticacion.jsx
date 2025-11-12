import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(false);

  // restaurar sesión
  useEffect(() => {
    const saved = localStorage.getItem("usuario");
    if (saved) {
      try {
        setUsuario(JSON.parse(saved));
      } catch {
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await apiLogin(email, password);
      const user = data.user ?? data;
      setUsuario(user);
      localStorage.setItem("usuario", JSON.stringify(user));
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider
      value={{ usuario, isAuthenticated: !!usuario, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
