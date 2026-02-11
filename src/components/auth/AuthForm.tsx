import React, { useState } from "react";
import { authService } from "../../services/authService"; 
import { authStorage } from "../../auth/authStorage"; 
import { useNavigate } from "react-router-dom";
import { AuthButton } from "../misc/AuthButton";
import { useToast } from "../../components/misc/ToastContext";
import type { AuthResponse } from "../../types/Auth";
import "./AuthForm.css";

interface AuthFormProps {
  isRegister?: boolean;
}

export const AuthForm = ({ isRegister = false }: AuthFormProps) => {
  const navigate = useNavigate();
  const { showToast } = useToast(); //hook de Toast para mostrar mensajes al usuario

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [telefono, setTelefono] = useState("");
  const [domicilio, setDomicilio] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); 

    try {
      let data: any;

      if (isRegister) {
        data = await authService.register({
          email, password, name, telefono, domicilio,
          role: "customer",
        });
        showToast("¡Cuenta creada con éxito! Bienvenido.", "success");
      } else {
        data = await authService.login(email, password);
        showToast(`Bienvenido de nuevo, ${data.user?.name || "Usuario"}`, "success");
      }

      const token = data?.token || data?.accessToken;
      
      if (token) {
        const sessionData: AuthResponse = {
          token: token,
          user: data.user || { 
            name: name || "Usuario", 
            email: email, 
            role: data.role || "customer" 
          }
        };

        authStorage.set(sessionData);
        navigate("/tienda");
      } else {
        throw new Error("Respuesta de servidor inválida");
      }
      
    } catch (error: any) {
      const serverMsg = error.response?.data?.message;
      const errorMsg = serverMsg || "Credenciales incorrectas o error de conexión";
      showToast(errorMsg, "error"); 
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-content">
      <h2 className="auth-title">{isRegister ? "Crear Cuenta" : "Iniciar Sesión"}</h2>

      <div className="input-group">
        <input type="email" placeholder="Email" value={email} required
          onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} />
      </div>

      <div className="input-group">
        <input type="password" placeholder="Password" value={password} required
          onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting} />
      </div>

      {isRegister && (
        <div className="register-extra-fields">
          <input type="text" placeholder="Nombre completo" required value={name}
            onChange={(e) => setName(e.target.value)} disabled={isSubmitting} />
          <input type="text" placeholder="Teléfono" required value={telefono}
            onChange={(e) => setTelefono(e.target.value)} disabled={isSubmitting} />
          <input type="text" placeholder="Domicilio" required value={domicilio}
            onChange={(e) => setDomicilio(e.target.value)} disabled={isSubmitting} />
        </div>
      )}

      <AuthButton 
        type="submit" 
        label={isSubmitting ? "Cargando..." : (isRegister ? "Registrarse" : "Entrar")} 
        className="auth-btn-full" 
        disabled={isSubmitting}
      />
    </form>
  );
};