import React, { useState } from "react";
import { authService } from "../../services/authService"; 
import { authStorage } from "../../auth/authStorage"; 
import { useNavigate } from "react-router-dom";
import type { AuthResponse } from "../../types/Auth";
import "./AuthForm.css";

interface AuthFormProps {
  isRegister?: boolean;
}

export const AuthForm = ({ isRegister = false }: AuthFormProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [telefono, setTelefono] = useState("");
  const [domicilio, setDomicilio] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 Iniciando:", isRegister ? "Registro" : "Login");

    try {
      let data: any; // Usamos any temporalmente para debuggear la respuesta del servidor

      if (isRegister) {
        data = await authService.register({
          email,
          password,
          name,
          telefono,
          domicilio,
          role: "customer",
        });
      } else {
        data = await authService.login(email, password);
      }

      console.log("DEBUG - Datos recibidos del servidor:", data);

      // --- VALIDACIÓN FLEXIBLE ---
      // Buscamos el token en diferentes formatos comunes (token o accessToken)
      const token = data?.token || data?.accessToken;
      
      if (token) {
        // Si el servidor no envió el objeto 'user' completo, creamos uno básico
        // para que Sidebar y Header no den error.
        const userData = data.user || { 
          name: name || "Usuario", 
          email: email, 
          role: data.role || "customer" 
        };

        const sessionData: AuthResponse = {
          token: token,
          user: userData
        };

        console.log("✅ Sesión válida. Guardando...");
        authStorage.set(sessionData);
        
        navigate("/tienda");
      } else {
        // Si llegamos aquí, el servidor respondió 200 pero sin token
        throw new Error("El servidor no envió una clave de acceso válida.");
      }
      
    } catch (error: any) {
      console.error("❌ ERROR EN AUTH:", error);
      
      // Capturamos el mensaje de error de Axios o el del Error manual
      const serverMsg = error.response?.data?.message;
      const errorMsg = serverMsg || error.message || "Credenciales incorrectas";
      
      alert("Error de acceso: " + errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-content">
      <h2 className="auth-title">{isRegister ? "Crear Cuenta" : "Iniciar Sesión"}</h2>

      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {isRegister && (
        <div className="register-extra-fields">
          <input
            type="text"
            placeholder="Nombre completo"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Teléfono"
            required
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <input
            type="text"
            placeholder="Domicilio"
            required
            value={domicilio}
            onChange={(e) => setDomicilio(e.target.value)}
          />
        </div>
      )}

      <button type="submit" className="auth-btn">
        {isRegister ? "Registrarse" : "Entrar"}
      </button>
    </form>
  );
};