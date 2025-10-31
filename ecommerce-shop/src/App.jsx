import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { SearchProvider } from './context/SearchContext';
import { AdminProvider } from './context/AdminContext';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductForm from './pages/admin/ProductForm';
import ProtectedRoute from './components/admin/ProtectedRoute';
import SimpleToast from './components/SimpleToast';

function App() {
  return (
    <Router>
      <SearchProvider>
        <FavoritesProvider>
          <CartProvider>
            <AdminProvider>
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
                
                {/* Rutas de administración */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products/new"
                  element={
                    <ProtectedRoute>
                      <ProductForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products/edit/:id"
                  element={
                    <ProtectedRoute>
                      <ProductForm />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <SimpleToast />
            </AdminProvider>
          </CartProvider>
        </FavoritesProvider>
      </SearchProvider>
    </Router>
  );
}

export default App;