import { http } from "./http";
import type { AuthResponse, User } from "../types/Auth";

// Endpoints (Rutas relativas porque 'http' ya tiene la baseURL)
const AUTH_URL = "/auth";
const USERS_URL = "/users";

export const authService = {
  /**
   * Login de usuario (GET con Query Params)
   */
  login: (email: string, password: string): Promise<AuthResponse> => {
    const params = `?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    return http.get<AuthResponse>(`${AUTH_URL}/login${params}`)
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
   * Gracias al interceptor en http.ts, el Token se envía solo
   */
  deleteUser: (id: number | string): Promise<void> => {
    return http.delete(`${USERS_URL}/${id}`)
      .then(() => {});
  },

  /**
   * Obtener lista de usuarios (Opcional, útil para el Admin)
   */
  getAllUsers: (): Promise<User[]> => {
    return http.get<User[]>(USERS_URL)
      .then(res => res.data);
  }
};