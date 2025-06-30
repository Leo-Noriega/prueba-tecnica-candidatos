export interface Property {
  id: number;
  titulo: string;
  ciudad: string;
  tipo: 'Casa' | 'Departamento';
  precio: number;
  ambientes: number;
  metros_cuadrados: number;
  imagen: string;
}

export interface PropertyRecommendation {
  property: Property;
  similarityScore: number;
  reasons: string[];
} 