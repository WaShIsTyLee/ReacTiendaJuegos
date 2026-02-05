import type { AuthSession } from "../types/Auth";

const STORAGE_KEY = "user";

export const authStorage = {
  // Guarda la sesión cuando haces login
  set: (session: AuthSession): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  },

  // Lee la sesión (la usa el interceptor de Axios para sacar el Token)
  get: (): AuthSession | null => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    try {
      return JSON.parse(saved) as AuthSession;
    } catch (error) {
      return null;
    }
  },

  // Borra todo cuando cierras sesión o el token caduca
  clear: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  }
};