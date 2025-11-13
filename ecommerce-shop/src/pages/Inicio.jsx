// src/pages/Inicio.jsx
import { useState, useEffect } from "react";
import Header from "../components/Header";
import ProductCard from "../components/FichaProducto";
import CartSidebar from "../components/PanelCarrito";
import ProductModal from "../components/DetalleProducto";
import { useSearch } from "../context/Buscador";
import { fetchProductos } from "../api/api";

const Inicio = () => {
  const { searchTerm } = useSearch();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductos()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error al cargar productos:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((product) => {
    const nameField = product.name || product.nombre || "";
    const categoryField = product.category || product.categoria || "";

    const term = (searchTerm || "").toLowerCase();
    if (!term) return true;

    return (
      nameField.toLowerCase().includes(term) ||
      categoryField.toLowerCase().includes(term)
    );
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-gray-500">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resultados de búsqueda */}
        {searchTerm && (
          <p className="mb-4 text-gray-600 text-sm">
            {filteredProducts.length} resultado(s) para{" "}
            <strong>"{searchTerm}"</strong>
          </p>
        )}

        {/* Grid de productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-400">😕</p>
            <p className="text-gray-600 mt-3">No se encontraron productos</p>
          </div>
        )}
      </main>

      <CartSidebar />
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Inicio;
