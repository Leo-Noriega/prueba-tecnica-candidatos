'use client';

import { useState, useEffect } from 'react';
import { Property, PropertyRecommendation } from '@/types/property';
import { propertyService } from '@/services/propertyService';
import PropertyCard from '@/components/PropertyCard';
import SearchAndFilters from '@/components/SearchAndFilters';
import Pagination from '@/components/Pagination';

interface Filters {
  ciudad?: string;
  tipo?: string;
  minPrice?: number;
  maxPrice?: number;
  minAmbientes?: number;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [recommendations, setRecommendations] = useState<PropertyRecommendation[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentFilters, setCurrentFilters] = useState<Filters>({});
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const allProperties = propertyService.getAllProperties();
    setProperties(allProperties);
    setFilteredProperties(allProperties);
    
    const uniqueCities = [...new Set(allProperties.map(prop => prop.ciudad))].sort();
    setCities(uniqueCities);
    setLoading(false);
  }, []);

  useEffect(() => {
    let results = properties;

    if (currentSearch.trim()) {
      results = propertyService.searchProperties(currentSearch);
    }

    if (currentFilters.ciudad || currentFilters.tipo || currentFilters.minPrice !== undefined || currentFilters.maxPrice !== undefined) {
      results = results.filter(property => {
        if (currentFilters.ciudad && property.ciudad !== currentFilters.ciudad) return false;
        if (currentFilters.tipo && property.tipo !== currentFilters.tipo) return false;
        if (currentFilters.minPrice !== undefined && property.precio < currentFilters.minPrice) return false;
        if (currentFilters.maxPrice !== undefined && property.precio > currentFilters.maxPrice) return false;
        return true;
      });
    }

    setFilteredProperties(results);
  }, [properties, currentSearch, currentFilters]);

  // Handle page adjustment when filtered results change
  useEffect(() => {
    const newTotalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    } else if (newTotalPages === 0) {
      setCurrentPage(1);
    }
  }, [filteredProperties.length, itemsPerPage, currentPage]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    if (selectedProperty) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProperty]);

  const handleSearch = (query: string) => {
    setCurrentSearch(query);
  };

  const handleFilter = (filters: Filters) => {
    setCurrentFilters(filters);
  };

  const clearAll = () => {
    setCurrentSearch('');
    setCurrentFilters({});
    setFilteredProperties(properties);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    // Obtener recomendaciones para la propiedad seleccionada
    const propertyRecommendations = propertyService.getRecommendations(property, 3);
    setRecommendations(propertyRecommendations);
  };

  const handleCloseModal = () => {
    setIsModalClosing(true);
    
    setTimeout(() => {
      setSelectedProperty(null);
      setIsModalClosing(false);
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-800 rounded-full animate-spin mx-auto" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <p className="text-lg text-gray-600 font-medium">Cargando propiedades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
              🏠 Sistema de Recomendación de Propiedades
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-medium px-2">
              Encuentra tu próxima propiedad con recomendaciones inteligentes
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <SearchAndFilters 
          onSearch={handleSearch}
          onFilter={handleFilter}
          onClearAll={clearAll}
          cities={cities}
        />

        <div className="mb-6 sm:mb-8 animate-fade-in-up">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg">
            <p className="text-gray-700 text-base sm:text-lg text-center sm:text-left">
              Mostrando <span className="font-bold text-blue-700 text-lg sm:text-xl">{startIndex + 1}-{Math.min(endIndex, filteredProperties.length)}</span> de{' '}
              <span className="font-bold text-gray-800 text-lg sm:text-xl">{filteredProperties.length}</span> propiedades
              {totalPages > 1 && (
                <span className="text-gray-600 text-sm sm:text-base ml-2">
                  (Página {currentPage} de {totalPages})
                </span>
              )}
            </p>
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {currentProperties.map((property, index) => (
                <div 
                  key={property.id} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PropertyCard
                    property={property}
                    onClick={handlePropertyClick}
                    showRecommendations={false}
                  />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 sm:mt-12 animate-fade-in-up">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                  onNextPage={goToNextPage}
                  onPreviousPage={goToPreviousPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 sm:py-16 animate-fade-in-up">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-lg max-w-md mx-auto">
              <div className="text-gray-400 mb-4 sm:mb-6">
                <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">No se encontraron propiedades</h3>
              <p className="text-gray-600 text-sm sm:text-base">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          </div>
        )}
      </main>

      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div 
            className={`absolute inset-0 modal-backdrop transition-opacity duration-300 ${
              isModalClosing ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={handleCloseModal}
          />
          
          <div className={`relative bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl transition-all duration-300 ${
            isModalClosing 
              ? 'opacity-0 scale-95 translate-y-4' 
              : 'opacity-100 scale-100 translate-y-0'
          }`}>
            <div className="h-full flex flex-col">
              {/* Close button */}
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={handleCloseModal}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto">
                <PropertyCard
                  property={selectedProperty}
                  onClick={() => {}}
                  showRecommendations={true}
                  recommendationsData={recommendations}
                  isModal={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
