import { http } from "./http";
import type { Product } from "../types/Product";

const API_URL = "/products";

export const productService = {
  getAll: () =>
    http.get<Product[]>(API_URL).then(res => res.data),

  getById: (id: string | number) => 
    http.get<Product>(`${API_URL}/${id}`).then(res => res.data),

  create: (product: Omit<Product, "id">) =>
    http.post<Product>(API_URL, product).then(res => res.data),

  update: (id: string | number, product: Product) =>
    http.put<Product>(`${API_URL}/${id}`, product).then(res => res.data),

  delete: (id: string | number) =>
    http.delete(`${API_URL}/${id}`).then(res => res.data)
};