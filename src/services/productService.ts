import { http } from "./http";
import type { Product } from "../types/Product";

const API_URL = "/products";

export const productService = {
  // 1. Obtener todos los juegos
  getAll: () =>
    http.get<Product[]>(API_URL).then(res => res.data),

  // 2. Obtener un juego por su ID
  getById: (id: string | number) => 
    http.get<Product>(`${API_URL}/${id}`).then(res => res.data),

  // 3. Crear un juego nuevo
  // Usamos Omit para asegurar que TypeScript no nos pida el ID al crear
  create: (product: Omit<Product, "id">) =>
    http.post<Product>(API_URL, product).then(res => res.data),

  // 4. Actualizar un juego existente
  update: (id: string | number, product: Product) =>
    http.put<Product>(`${API_URL}/${id}`, product).then(res => res.data),

  // 5. Eliminar un juego
  delete: (id: string | number) =>
    http.delete(`${API_URL}/${id}`).then(res => res.data)
};