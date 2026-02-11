import "./LoadingScreen.css";

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({ message = "Sincronizando con el servidor..." }: LoadingScreenProps) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
};