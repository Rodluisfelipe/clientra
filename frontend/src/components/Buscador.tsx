import React, { useState, useRef } from 'react';

interface BuscadorProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const Buscador: React.FC<BuscadorProps> = ({ 
  onSearch, 
  placeholder = "Buscar clientes..." 
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleSearch = (value: string) => {
    setQuery(value);
    
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  return (
    <div className={`relative group w-full transition-all duration-300
      ${isFocused ? 'scale-105' : 'scale-100'}`}>
      {/* Gradient Border */}
      <div className={`absolute -inset-[0.5px] rounded-lg bg-gradient-to-r from-primary/50 to-accent/50 
        transition-opacity duration-300
        ${isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />

      {/* Search Container */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-transparent
            bg-white/50 backdrop-blur-sm dark:bg-gray-800/50
            placeholder-gray-400 dark:placeholder-gray-500
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:border-primary/20 dark:focus:border-primary/40
            transition-all duration-300"
        />

        {/* Search Icon */}
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 
          transition-all duration-300
          ${isFocused ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400'}`}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Clear Button */}
        {query && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1
              text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400
              rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
              transition-all duration-200"
          >
            <span className="sr-only">Limpiar búsqueda</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Buscador; 