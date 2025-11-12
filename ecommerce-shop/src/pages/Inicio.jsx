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
  const [categories, setCategories] = useState(["Todos"]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let alive = true;

  fetchProductos()
    .then((data) => {
      if (!alive) return;

      // Asegura array
      const arr = Array.isArray(data) ? data : [];

      // Normaliza cada producto al shape que la UI usa
      const normalized = arr
        .filter(Boolean)
        .map((p) => ({
          id: p.id,
          name: p.name ?? p.nombre ?? "",
          price: Number(p.price ?? p.precio ?? 0),
          image: p.image ?? p.imagen ?? "💻",
          rating: Number(p.rating ?? p.calificacion ?? 0),
          reviews: Number(p.reviews ?? p.total_reviews ?? 0),
          category:
            p.category ?? p.categoria ?? (p.categoria_id ? "Otros" : "Otros"),
          stock: Number(p.stock ?? 0),
          description: p.description ?? p.descripcion ?? "",
        }));

      setProducts(normalized);

      // Categorías únicas desde los normalizados
      const uniqueCats = Array.from(
        new Set(normalized.map((p) => p.category || "Otros"))
      );
      setCategories(["Todos", ...uniqueCats]);
    })
    .catch((err) => {
      console.error("Error al cargar productos:", err);
    })
    .finally(() => alive && setLoading(false));

  return () => {
    alive = false;
  };
}, []);

  const filteredProducts = products
    .filter(Boolean)
    .filter((product) => {
      const categoryField = (product.category ?? product.categoria ?? "").toString();
      const nameField = (product.name ?? product.nombre ?? "").toString();

      const matchesCategory =
        selectedCategory === "Todos" || categoryField === selectedCategory;

      const term = (searchTerm ?? "").toLowerCase();
      const matchesSearch =
        nameField.toLowerCase().includes(term) ||
        categoryField.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });

  const handleProductClick = (product) => {
    if (!product) return;
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // pequeño delay para animación si corresponde
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
        {/* categorías */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Categorías
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* resultados */}
        {searchTerm && (
          <p className="mb-4 text-gray-600 text-sm">
            {filteredProducts.length} resultado(s) para <strong>"{searchTerm}"</strong>
          </p>
        )}

        {/* grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) =>
              product ? (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                />
              ) : null
            )}
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
