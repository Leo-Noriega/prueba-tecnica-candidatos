'use client';

import { useState, useEffect } from 'react';

interface Filters {
  ciudad?: string;
  tipo?: string;
  minPrice?: number;
  maxPrice?: number;
  minAmbientes?: number;
}

interface SearchAndFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: Filters) => void;
  onClearAll: () => void;
  cities: string[];
}

export default function SearchAndFilters({ onSearch, onFilter, onClearAll, cities }: SearchAndFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    const timer = setTimeout(() => {
      const filters: Filters = {};
      if (selectedCity) filters.ciudad = selectedCity;
      if (selectedType) filters.tipo = selectedType;
      
      if (priceRange.min && priceRange.min.trim() !== '') {
        const minPrice = parseInt(priceRange.min);
        if (!isNaN(minPrice)) {
          filters.minPrice = minPrice;
        }
      }
      
      if (priceRange.max && priceRange.max.trim() !== '') {
        const maxPrice = parseInt(priceRange.max);
        if (!isNaN(maxPrice)) {
          filters.maxPrice = maxPrice;
        }
      }
      
      onSearch(searchQuery);
      onFilter(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCity, selectedType, priceRange.min, priceRange.max, onSearch, onFilter]);

  const clearFilters = () => {
    setSelectedCity('');
    setSelectedType('');
    setPriceRange({ min: '', max: '' });
    setSearchQuery('');
    onClearAll();
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value === '') {
      target.select();
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value === '') {
      target.select();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 mb-8 sm:mb-12 animate-fade-in-up">
      <div className="space-y-6 sm:space-y-8">
        <div>
          <label htmlFor="search" className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
            🔍 Buscar propiedades
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 group-focus-within:text-blue-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={handleInputClick}
              onFocus={handleInputFocus}
              className="block w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-base sm:text-lg placeholder-gray-500 text-gray-900 bg-white"
              placeholder="Buscar por título, ciudad o tipo..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="group">
            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              🏙️ Ciudad
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="block w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 text-sm sm:text-base"
            >
              <option value="" className="text-gray-500">Todas las ciudades</option>
              {cities.map((city) => (
                <option key={city} value={city} className="text-gray-900">{city}</option>
              ))}
            </select>
          </div>

          <div className="group">
            <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              🏠 Tipo
            </label>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white text-gray-900 text-sm sm:text-base"
            >
              <option value="" className="text-gray-500">Todos los tipos</option>
              <option value="Casa" className="text-gray-900">Casa</option>
              <option value="Departamento" className="text-gray-900">Departamento</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="minPrice" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              💰 Precio mínimo
            </label>
            <input
              type="number"
              id="minPrice"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              onClick={handleInputClick}
              onFocus={handleInputFocus}
              className="block w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 bg-white placeholder-gray-500 text-sm sm:text-base"
              placeholder="$0"
            />
          </div>

          <div className="group">
            <label htmlFor="maxPrice" className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              💰 Precio máximo
            </label>
            <input
              type="number"
              id="maxPrice"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              onClick={handleInputClick}
              onFocus={handleInputFocus}
              className="block w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 bg-white placeholder-gray-500 text-sm sm:text-base"
              placeholder="$∞"
            />
          </div>
        </div>

        <div className="flex justify-center pt-2 sm:pt-4">
          <button
            onClick={clearFilters}
            className="bg-gray-100 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-500/20 transition-all duration-300 transform hover:scale-105"
          >
            🗑️ Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
} 