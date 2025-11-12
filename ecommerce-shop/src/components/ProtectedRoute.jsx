import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Autenticacion";

const ProtectedRoute = ({ children }) => {
  const { usuario } = useAuth();

  if (!usuario) return <Navigate to="/login" replace />;

  if (usuario.rol !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
