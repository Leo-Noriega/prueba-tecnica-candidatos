'use client';

import { Property } from '@/types/property';

interface PropertyCardProps {
  property: Property;
  onClick?: (property: Property) => void;
  showRecommendations?: boolean;
  recommendations?: Property[];
}

export default function PropertyCard({ 
  property, 
  onClick, 
  showRecommendations = false,
  recommendations = []
}: PropertyCardProps) {
  const formatPrice = (price: number) => {
    const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `$ ${formatted}`;
  };

  return (
    <div 
      className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl card-hover overflow-hidden cursor-pointer animate-fade-in-up"
      onClick={() => onClick?.(property)}
    >
      <div className="relative overflow-hidden">
        <img
          src={property.imagen}
          alt={property.titulo}
          className="w-full h-40 sm:h-52 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <span className="px-3 sm:px-4 py-1 sm:py-2 bg-white/95 backdrop-blur-sm text-xs sm:text-sm font-semibold text-gray-800 rounded-2xl shadow-lg">
            {property.tipo}
          </span>
        </div>

        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
          <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-600/95 backdrop-blur-sm text-xs sm:text-sm font-bold text-white rounded-2xl shadow-lg">
            {formatPrice(property.precio)}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 overflow-hidden text-ellipsis whitespace-nowrap">
          {property.titulo}
        </h3>

        <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 sm:mr-3 group-hover:bg-blue-200 transition-colors duration-300">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xs sm:text-sm font-medium">{property.ciudad}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          <div className="flex items-center group/item">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-2xl flex items-center justify-center mr-2 sm:mr-3 group-hover/item:bg-blue-100 transition-colors duration-300">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover/item:text-blue-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">{property.ambientes}</p>
              <p className="text-xs text-gray-500">ambientes</p>
            </div>
          </div>
          <div className="flex items-center group/item">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-2xl flex items-center justify-center mr-2 sm:mr-3 group-hover/item:bg-blue-100 transition-colors duration-300">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover/item:text-blue-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">{property.metros_cuadrados}m²</p>
              <p className="text-xs text-gray-500">metros</p>
            </div>
          </div>
        </div>

        <div className="pt-2 sm:pt-4">
          <div className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-2xl font-semibold text-center group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-300 transform group-hover:scale-105 shadow-lg group-hover:shadow-xl text-sm sm:text-base">
            Ver detalles
          </div>
        </div>
      </div>

      {showRecommendations && recommendations.length > 0 && (
        <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
          <div className="pt-4 sm:pt-6 border-t border-gray-100">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4">Propiedades similares:</h4>
            <div className="space-y-2 sm:space-y-3">
              {recommendations.slice(0, 2).map((rec) => (
                <div key={rec.id} className="flex items-center space-x-3 sm:space-x-4 p-2 sm:p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                  <img 
                    src={rec.imagen} 
                    alt={rec.titulo}
                    className="w-10 h-8 sm:w-14 sm:h-10 object-cover rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{rec.titulo}</p>
                    <p className="text-xs text-gray-600">{formatPrice(rec.precio)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
    </div>
  );
} 