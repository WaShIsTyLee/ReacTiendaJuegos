import React, { useState } from "react";
import { loginUser, registerUser } from "../../services/authService"; // Importación limpia
import { useNavigate } from "react-router-dom";
import type { AuthResponse } from "../../types/Auth";

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
    console.log("1. Intentando login con:", email); // Ver si el botón funciona

    try {
      let data: AuthResponse;

      if (isRegister) {
        data = await registerUser({
          email,
          password,
          name,
          telefono,
          domicilio,
          role: "customer",
        });
      } else {
        data = await loginUser(email, password);
      }

      console.log("2. Respuesta recibida:", data); // Ver si el servidor respondió

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("3. Navegando a /tienda...");
      navigate("/tienda");
    } catch (error: any) {
      console.error("ERROR EN EL PROCESO:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-content">
      <h2>{isRegister ? "Crear Cuenta" : "Iniciar Sesión"}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      {isRegister && (
        <>
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
        </>
      )}

      <button type="submit">{isRegister ? "Registrarse" : "Entrar"}</button>
    </form>
  );
};
