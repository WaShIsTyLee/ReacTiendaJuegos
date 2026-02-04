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
      {userName && <span>Hola, {userName}</span>}
     </div>
  </header>
);