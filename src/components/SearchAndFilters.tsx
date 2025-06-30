'use client';

import { useState } from 'react';

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
  cities: string[];
}

export default function SearchAndFilters({ onSearch, onFilter, cities }: SearchAndFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilter = () => {
    const filters: Filters = {};
    if (selectedCity) filters.ciudad = selectedCity;
    if (selectedType) filters.tipo = selectedType;
    if (priceRange.min) filters.minPrice = parseInt(priceRange.min);
    if (priceRange.max) filters.maxPrice = parseInt(priceRange.max);
    
    onFilter(filters);
  };

  const clearFilters = () => {
    setSelectedCity('');
    setSelectedType('');
    setPriceRange({ min: '', max: '' });
    onFilter({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="space-y-6">
        {/* Search Bar */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Buscar propiedades
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Buscar por título, ciudad o tipo..."
            />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* City Filter */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              Ciudad
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="">Todas las ciudades</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Tipo
            </label>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="">Todos los tipos</option>
              <option value="Casa">Casa</option>
              <option value="Departamento">Departamento</option>
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-2">
              Precio mínimo
            </label>
            <input
              type="number"
              id="minPrice"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="$0"
            />
          </div>

          {/* Max Price */}
          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-2">
              Precio máximo
            </label>
            <input
              type="number"
              id="maxPrice"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="$∞"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleFilter}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
          >
            Aplicar filtros
          </button>
          <button
            onClick={clearFilters}
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
} 