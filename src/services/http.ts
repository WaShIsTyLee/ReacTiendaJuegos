import axios from "axios";
import { authStorage } from "../auth/authStorage"; 
import type { AuthSession } from "../types/Auth";

/**
 * 1. Definimos la URL de tu API.
 * IMPORTANTE: Si tu backend corre en un puerto distinto al 3000 (ej. 4000), 
 * cámbialo aquí abajo.
 */
const BASE_URL = "http://localhost:3000"; 

// 2. Creamos la instancia personalizada de Axios
export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 3. INTERCEPTOR DE PETICIÓN (Request): Añade el Token automáticamente
http.interceptors.request.use((config) => {
  const session: AuthSession | null = authStorage.get();
  
  if (session?.token) {
    config.headers = config.headers ?? {};
    // Añade la cabecera Bearer Token para que el servidor sepa quién eres
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 4. INTERCEPTOR DE RESPUESTA (Response): Maneja errores globales
http.interceptors.response.use(
  (response) => response, // Si todo va bien, deja pasar la respuesta
  (error) => {
    // Si el servidor responde 401 (Token caducado o inválido)
    if (error.response?.status === 401) {
      console.warn("Sesión expirada o inválida. Redirigiendo al login...");
      authStorage.clear(); // Borramos la sesión local
      window.location.assign("/login"); // Redirigimos al usuario al login
    }
    
    // Si el error es 404, puede ser que la ruta en el backend no exista
    if (error.response?.status === 404) {
      console.error("Error 404: No se encontró la ruta en el servidor:", error.config.url);
    }

    return Promise.reject(error);
  }
);