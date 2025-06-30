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
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden cursor-pointer"
      onClick={() => onClick?.(property)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={property.imagen}
          alt={property.titulo}
          className="w-full h-48 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Property Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-800 rounded-full">
            {property.tipo}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 overflow-hidden text-ellipsis whitespace-nowrap">
          {property.titulo}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">{property.ciudad}</span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span>{property.ambientes} ambientes</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <span>{property.metros_cuadrados}m²</span>
          </div>
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-2xl font-bold text-blue-600">
            {formatPrice(property.precio)}
          </p>
        </div>
      </div>

      {/* Recommendations Section */}
      {showRecommendations && recommendations.length > 0 && (
        <div className="px-6 pb-6">
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Propiedades similares:</h4>
            <div className="space-y-2">
              {recommendations.slice(0, 2).map((rec) => (
                <div key={rec.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <img 
                    src={rec.imagen} 
                    alt={rec.titulo}
                    className="w-12 h-8 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{rec.titulo}</p>
                    <p className="text-xs text-gray-600">{formatPrice(rec.precio)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hover Effect Overlay */}
      <div className={`absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
    </div>
  );
} 