export type Product = {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl: string; // URL de la carátula del juego
};