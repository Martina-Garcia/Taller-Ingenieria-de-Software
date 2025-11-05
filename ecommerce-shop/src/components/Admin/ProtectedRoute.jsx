import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../context/Autenticacion';

const ProtectedRoute = ({ children }) => {
  const { isAdminLoggedIn } = useAdmin();

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;