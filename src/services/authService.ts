import { http } from "./http";
import type { AuthResponse, User } from "../types/Auth";

const AUTH_URL = "/auth";
const USERS_URL = "/users";

export const authService = {
 
  login: (email: string, password: string): Promise<AuthResponse> => {

    return http.post<AuthResponse>(`${AUTH_URL}/login`, { email, password })
      .then(res => res.data);
  },


  register: (userData: Omit<User, 'id' | 'role'> & { password: string, role?: string }): Promise<AuthResponse> => {
    const payload = {
      ...userData,
      role: userData.role || 'customer'
    };
    return http.post<AuthResponse>(`${AUTH_URL}/register`, payload)
      .then(res => res.data);
  },


  deleteUser: (id: number | string): Promise<void> => {
    return http.delete(`${USERS_URL}/${id}`)
      .then(() => {});
  },


  getAllUsers: (): Promise<User[]> => {
    return http.get<User[]>(USERS_URL)
      .then(res => res.data);
  }
};