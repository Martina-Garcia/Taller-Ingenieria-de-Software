import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/Autenticacion";
import { SearchProvider } from "./context/Buscador";
import { CartProvider } from "./context/Carrito";
import Inicio from "./pages/Inicio";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProductForm from "./pages/ProductForm";

import ProtectedRoute from "./components/ProtectedRoute";
import SimpleToast from "./components/Notificacion";

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
            <CartProvider>
              <Routes>
                {/* públicas */}
                <Route path="/" element={<Inicio />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<Login />} />

                {/* admin protegidas */}
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
            </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
