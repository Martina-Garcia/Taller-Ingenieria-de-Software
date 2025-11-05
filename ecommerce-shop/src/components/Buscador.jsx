import { Search, X } from 'lucide-react';
import { useSearch } from '../context/Buscador';

const SearchBar = () => {
  const { searchTerm, setSearchTerm, clearSearch } = useSearch();

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;