import type { Product } from "../types/Product";

const API_URL = "http://localhost:3000/products";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  });
  return response.json();
};