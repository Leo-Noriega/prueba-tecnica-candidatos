'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import { propertyService } from '@/services/propertyService';
import PropertyCard from '@/components/PropertyCard';
import SearchAndFilters from '@/components/SearchAndFilters';

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
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load properties and extract unique cities
    const allProperties = propertyService.getAllProperties();
    setProperties(allProperties);
    setFilteredProperties(allProperties);
    
    const uniqueCities = [...new Set(allProperties.map(prop => prop.ciudad))].sort();
    setCities(uniqueCities);
    setLoading(false);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredProperties(properties);
      return;
    }
    
    const searchResults = propertyService.searchProperties(query);
    setFilteredProperties(searchResults);
  };

  const handleFilter = (filters: Filters) => {
    const filtered = propertyService.filterProperties(filters);
    setFilteredProperties(filtered);
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando propiedades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🏠 Sistema de Recomendación de Propiedades
            </h1>
            <p className="text-lg text-gray-600">
              Encuentra tu próxima propiedad con recomendaciones inteligentes
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <SearchAndFilters 
          onSearch={handleSearch}
          onFilter={handleFilter}
          cities={cities}
        />

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando <span className="font-semibold text-blue-600">{filteredProperties.length}</span> de{' '}
            <span className="font-semibold">{properties.length}</span> propiedades
          </p>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div key={property.id} className="transform transition-all duration-300 hover:scale-105">
                <PropertyCard
                  property={property}
                  onClick={handlePropertyClick}
                  showRecommendations={false}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron propiedades</h3>
            <p className="text-gray-600">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
      </main>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProperty.titulo}</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Property Details */}
                <div>
                  <img
                    src={selectedProperty.imagen}
                    alt={selectedProperty.titulo}
                    className="w-full h-64 object-cover rounded-xl mb-6"
                  />
                  
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{selectedProperty.ciudad}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{selectedProperty.ambientes} ambientes</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <span>{selectedProperty.metros_cuadrados}m²</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-3xl font-bold text-blue-600">
                        {new Intl.NumberFormat('es-AR', {
                          style: 'currency',
                          currency: 'ARS',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(selectedProperty.precio)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Propiedades similares</h3>
                  <div className="space-y-4">
                    {propertyService.getRecommendations(selectedProperty, 3).map((rec) => (
                      <div key={rec.property.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                        <div className="flex items-center space-x-4">
                          <img
                            src={rec.property.imagen}
                            alt={rec.property.titulo}
                            className="w-16 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 truncate">{rec.property.titulo}</h4>
                            <p className="text-sm text-gray-600">{rec.property.ciudad}</p>
                            <p className="text-sm font-semibold text-blue-600">
                              {new Intl.NumberFormat('es-AR', {
                                style: 'currency',
                                currency: 'ARS',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(rec.property.precio)}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {rec.reasons.map((reason, index) => (
                                <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {reason}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
