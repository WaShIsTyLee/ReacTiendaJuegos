import { useState } from "react";
import { AuthForm } from "../../components/auth/AuthForm";
import "./AuthPage.css"; // Importamos el nuevo CSS

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="auth-container">
      <h1 className="auth-title">
        {isRegister ? 'Crea tu cuenta' : '¡Hola de nuevo!'}
      </h1>
      <p className="auth-subtitle">
        {isRegister 
          ? 'Regístrate para empezar a comprar' 
          : 'Introduce tus credenciales para continuar'}
      </p>

      <div className="auth-card">
        <AuthForm isRegister={isRegister} />

        <div className="auth-footer">
          <button 
            className="auth-switch-btn"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister 
              ? '¿Ya tienes cuenta? Inicia sesión' 
              : '¿No tienes cuenta? Regístrate aquí'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;