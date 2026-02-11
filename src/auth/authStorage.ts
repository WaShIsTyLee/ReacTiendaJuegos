import type { AuthSession } from "../types/Auth";

const STORAGE_KEY = "user";

export const authStorage = {
  set: (session: AuthSession): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  },

  get: (): AuthSession | null => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    try {
      return JSON.parse(saved) as AuthSession;
    } catch (error) {
      return null;
    }
  },

  clear: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  }
};