import { http } from "./http";
import type { Product } from "../types/Product";

const API_URL = "/products";

export const productService = {
  // Obtener todos los juegos
  getAll: () =>
    http.get<Product[]>(API_URL).then(res => res.data),

  // Crear un juego nuevo
  create: (product: Omit<Product, "id">) =>
    http.post<Product>(API_URL, product).then(res => res.data),

  // Actualizar un juego existente
  update: (id: string | number, product: Product) =>
    http.put<Product>(`${API_URL}/${id}`, product).then(res => res.data),
  getById: async (id: string | number): Promise<Product> => {
    const response = await http.get(`/products/${id}`);
    return response.data;
  },
  // Eliminar un juego
  delete: (id: string | number) =>
    http.delete(`${API_URL}/${id}`).then(() => { })
};