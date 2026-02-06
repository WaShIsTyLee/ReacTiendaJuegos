import { http } from "./http";
import type { AuthResponse, User } from "../types/Auth";

const AUTH_URL = "/auth";
const USERS_URL = "/users";

export const authService = {
  /**
   * Login de usuario (Cambiado a POST para mayor seguridad)
   */
  login: (email: string, password: string): Promise<AuthResponse> => {
    // 1. Ya NO usamos params en la URL
    // 2. Enviamos un objeto JSON en el cuerpo (body) de la petición
    return http.post<AuthResponse>(`${AUTH_URL}/login`, { email, password })
      .then(res => res.data);
  },

  /**
   * Registro de nuevo usuario (POST)
   */
  register: (userData: Omit<User, 'id' | 'role'> & { password: string, role?: string }): Promise<AuthResponse> => {
    const payload = {
      ...userData,
      role: userData.role || 'customer'
    };
    return http.post<AuthResponse>(`${AUTH_URL}/register`, payload)
      .then(res => res.data);
  },

  /**
   * Eliminar un usuario (DELETE)
   */
  deleteUser: (id: number | string): Promise<void> => {
    return http.delete(`${USERS_URL}/${id}`)
      .then(() => {});
  },

  /**
   * Obtener lista de usuarios
   */
  getAllUsers: (): Promise<User[]> => {
    return http.get<User[]>(USERS_URL)
      .then(res => res.data);
  }
};