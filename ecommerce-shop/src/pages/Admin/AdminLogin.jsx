import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertCircle, ShoppingBag } from 'lucide-react';
import { useAdmin } from '../../context/Autenticacion';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShoppingBag className="text-blue-600" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Panel de Administración
          </h1>
          <p className="text-blue-100">
            Ingresa tu contraseña para continuar
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña de administrador
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              Ingresar al Panel
            </button>
          </form>

          {/* Ayuda */}
          <div className="mt-6 pt-6 border-t text-center">
            <p className="text-sm text-gray-500 mb-2">
              ℹ️ Contraseña de prueba:
            </p>
            <code className="text-sm bg-gray-100 px-3 py-1 rounded font-mono">
              admin123
            </code>
          </div>

          {/* Volver */}
          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 text-gray-600 hover:text-gray-900 text-sm font-semibold"
          >
            ← Volver a la tienda
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;