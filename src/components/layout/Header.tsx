import "./Header.css";
interface HeaderProps {
  title: string;
  userName?: string;
  onLogout: () => void;
}

export const Header = ({ title, userName, onLogout }: HeaderProps) => (
  <header className="admin-header">
    <h1>{title}</h1>
    <div className="header-actions">
      {userName && <span style={{ marginRight: "10px" }}>Hola, {userName}</span>}
      <button className="logout-btn" onClick={onLogout}>Cerrar Sesión</button>
    </div>
  </header>
);