import type { Product } from "./Product";

export type UserRole = 'admin' | 'customer';

export type User = {
  id: number;
  email: string;
  name: string;
  telefono: string;
  domicilio: string;
  role: UserRole; 
  products?: Product[]; 
};

export type AuthSession = {
  token: string;
  user: User;
};

export type AuthResponse = AuthSession;