import axios from "axios";
import { authStorage } from "../auth/authStorage"; 
import type { AuthSession } from "../types/Auth";


const BASE_URL = "http://localhost:3000"; 

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const session: AuthSession | null = authStorage.get();
  
  if (session?.token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

http.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Sesión expirada o inválida. Redirigiendo al login...");
      authStorage.clear();
      window.location.assign("/login"); 
    }
    
    if (error.response?.status === 404) {
      console.error("Error 404: No se encontró la ruta en el servidor:", error.config.url);
    }

    return Promise.reject(error);
  }
);