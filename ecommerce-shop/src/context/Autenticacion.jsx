import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminProducts, setAdminProducts] = useState([]);

  // Cargar estado de login
  useEffect(() => {
    const loginStatus = localStorage.getItem('adminLoggedIn');
    setIsAdminLoggedIn(loginStatus === 'true');
  }, []);

  // Cargar productos del localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      setAdminProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Guardar productos en localStorage
  const saveProducts = (products) => {
    setAdminProducts(products);
    localStorage.setItem('adminProducts', JSON.stringify(products));
  };

  const login = (password) => {
    // Contraseña simple: "admin123"
    if (password === 'admin123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
  };

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    const updatedProducts = [...adminProducts, newProduct];
    saveProducts(updatedProducts);
  };

  const updateProduct = (id, updatedProduct) => {
    const updatedProducts = adminProducts.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    );
    saveProducts(updatedProducts);
  };

  const deleteProduct = (id) => {
    const updatedProducts = adminProducts.filter(product => product.id !== id);
    saveProducts(updatedProducts);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        adminProducts,
        login,
        logout,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin debe usarse dentro de AdminProvider');
  }
  return context;
};