import { Property, PropertyRecommendation } from '@/types/property';
import propertiesData from '../../db/properties_mock_100_clean.json';

export class PropertyService {
  private properties: Property[] = propertiesData as Property[];

  getAllProperties(): Property[] {
    return this.properties;
  }

  getPropertyById(id: number): Property | undefined {
    return this.properties.find(prop => prop.id === id);
  }

  getRecommendations(property: Property, limit: number = 2): PropertyRecommendation[] {
    const recommendations: PropertyRecommendation[] = [];

    for (const otherProperty of this.properties) {
      if (otherProperty.id === property.id) continue;

      const similarityScore = this.calculateSimilarity(property, otherProperty);
      const reasons = this.getSimilarityReasons(property, otherProperty);

      if (similarityScore > 0.3) {
        recommendations.push({
          property: otherProperty,
          similarityScore,
          reasons
        });
      }
    }

    return recommendations
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, limit);
  }

  private calculateSimilarity(prop1: Property, prop2: Property): number {
    let score = 0;
    let totalFactors = 0;

    if (prop1.ciudad === prop2.ciudad) {
      score += 0.4;
    }
    totalFactors += 0.4;

    if (prop1.tipo === prop2.tipo) {
      score += 0.3;
    }
    totalFactors += 0.3;

    const priceDiff = Math.abs(prop1.precio - prop2.precio) / Math.max(prop1.precio, prop2.precio);
    if (priceDiff <= 0.2) {
      score += 0.2 * (1 - priceDiff);
    }
    totalFactors += 0.2;

    const roomDiff = Math.abs(prop1.ambientes - prop2.ambientes);
    if (roomDiff <= 1) {
      score += 0.1 * (1 - roomDiff);
    }
    totalFactors += 0.1;

    return score / totalFactors;
  }

  private getSimilarityReasons(prop1: Property, prop2: Property): string[] {
    const reasons: string[] = [];

    if (prop1.ciudad === prop2.ciudad) {
      reasons.push('Misma ciudad');
    }

    if (prop1.tipo === prop2.tipo) {
      reasons.push('Mismo tipo de propiedad');
    }

    const priceDiff = Math.abs(prop1.precio - prop2.precio) / Math.max(prop1.precio, prop2.precio);
    if (priceDiff <= 0.2) {
      reasons.push('Precio similar');
    }

    const roomDiff = Math.abs(prop1.ambientes - prop2.ambientes);
    if (roomDiff <= 1) {
      reasons.push('Misma cantidad de ambientes');
    }

    return reasons;
  }

  searchProperties(query: string): Property[] {
    const searchTerm = query.toLowerCase();
    return this.properties.filter(property =>
      property.titulo.toLowerCase().includes(searchTerm) ||
      property.ciudad.toLowerCase().includes(searchTerm) ||
      property.tipo.toLowerCase().includes(searchTerm)
    );
  }

  filterProperties(filters: {
    ciudad?: string;
    tipo?: string;
    minPrice?: number;
    maxPrice?: number;
    minAmbientes?: number;
  }): Property[] {
    return this.properties.filter(property => {
      if (filters.ciudad && property.ciudad !== filters.ciudad) return false;
      if (filters.tipo && property.tipo !== filters.tipo) return false;
      if (filters.minPrice && property.precio < filters.minPrice) return false;
      if (filters.maxPrice && property.precio > filters.maxPrice) return false;
      if (filters.minAmbientes && property.ambientes < filters.minAmbientes) return false;
      return true;
    });
  }
}

export const propertyService = new PropertyService(); 