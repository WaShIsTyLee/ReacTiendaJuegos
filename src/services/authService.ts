import type { AuthResponse, User } from "../types/Auth"; 

const API_URL = "http://localhost:3000/auth";

// --- FUNCIÓN DE LOGIN (Ahora como GET) ---
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  // 1. Construimos la URL con los parámetros (?email=...&password=...)
  // Usamos encodeURIComponent para que caracteres como '@' no rompan la URL
  const queryParams = `?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
  
  const response = await fetch(`${API_URL}/login${queryParams}`, {
    method: "GET", // <--- CAMBIADO de POST a GET
    headers: { "Content-Type": "application/json" },
    // El body se ELIMINA, no se puede enviar body en un GET
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en el login");
  }

  return response.json();
};

// --- FUNCIÓN DE REGISTRO (Se queda como POST) ---
// El registro DEBE seguir siendo POST porque envía muchos datos y crea un recurso nuevo
export const registerUser = async (
  userData: Omit<User, 'id' | 'role'> & { password: string, role?: string }
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...userData,
      role: userData.role || 'customer'
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en el registro");
  }

  return response.json();
};