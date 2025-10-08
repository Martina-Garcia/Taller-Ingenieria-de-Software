import React from 'react';
import { ShoppingCart, Search, Heart, User, Star } from 'lucide-react';

const PileStore = () => {

  const products = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      price: 2499000,
      color: '#667eea',
      rating: 0,
      reviews: 0
    },
    {
      id: 2,
      name: 'iPhone 15 Pro Max',
      price: 1299000,
      color: '#f093fb',
      rating: 0,
      reviews: 0
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5',
      price: 399000,
      color: '#4facfe',
      rating: 0,
      reviews: 0
    },
    {
      id: 4,
      name: 'iPad Pro 12.9"',
      price: 1099000,
      color: '#43e97b',
      rating: 0,
      reviews: 0
    },
    {
      id: 5,
      name: 'Apple Watch Ultra',
      price: 799000,
      color: '#fa709a',
      rating: 0,
      reviews: 0
    },
    {
      id: 6,
      name: 'Canon EOS R6',
      price: 2499000,
      color: '#30cfd0',
      rating: 0,
      reviews: 0
    },
    {
      id: 7,
      name: 'Samsung Galaxy S24',
      price: 999000,
      color: '#a8edea',
      rating: 0,
      reviews: 0
    },
    {
      id: 8,
      name: 'AirPods Pro 2',
      price: 249000,
      color: '#fbc2eb',
      rating: 0,
      reviews: 0
    },
    {
      id: 9,
      name: 'Dell XPS 15',
      price: 1899000,
      color: '#ffecd2',
      rating: 0,
      reviews: 0
    }
  ];

  const categories = ['Todos', 'Laptops', 'Smartphones', 'Audio', 'Tablets', 'Wearables', 'Cámaras'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PileStore
              </h1>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <User size={24} className="text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Heart size={24} className="text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
                <ShoppingCart size={24} className="text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Lo Último en Tecnología
            </h2>
            <p className="text-xl md:text-2xl text-blue-100">
              Descubre los productos más innovadores del mercado
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex space-x-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-6 py-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition whitespace-nowrap"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Productos Destacados
        </h3>
        
        <div className="flex items-center justify-start mb-6">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Más Populares</option>
            <option>Menor Precio</option>
            <option>Mayor Precio</option>
            <option>Mejor Valorados</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="relative">
                <div 
                  className="w-full h-64"
                  style={{ backgroundColor: product.color }}
                >
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition">
                  <Heart size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="p-5">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h4>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-gray-300"
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    (0)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price.toLocaleString()}
                  </span>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Ayuda</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Seguimiento de Pedido</li>
                <li>Envíos</li>
                <li>Devoluciones</li>
                <li>Garantías</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre Nosotros</li>
                <li>Contacto</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>X</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PileStore. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PileStore;