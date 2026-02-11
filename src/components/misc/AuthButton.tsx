import "./AuthButton.css";

interface AuthButtonProps {
  label: string;
  type?: "button" | "submit"; // Por defecto será button
  onClick?: () => void;       // Opcional para la navegación
  className?: string;  
  disabled?: boolean; // <--- Faltaba esta línea       // Por si quieres añadir estilos extra
}

export const AuthButton = ({ 
  label, 
  type = "button", 
  onClick, 
  className = "" 
}: AuthButtonProps) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`custom-auth-btn ${className}`}
    >
      {label}
    </button>
  );
};