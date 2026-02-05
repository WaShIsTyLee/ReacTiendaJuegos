import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  LogOut, 
  Gamepad2,
  PackageSearch,
  User,
  Plus
} from "lucide-react";

interface SidebarProps {
  role: "admin" | "user" | string | undefined; // Añade undefined aquí
  onLogout: () => void;
}

export const Sidebar = ({ role, onLogout }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Gamepad2 size={32} className="logo-icon" color="#a855f7" />
        <span>WASHI<span className="logo-accent">STORE</span></span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {role === "admin" ? (
            <>
              <p className="menu-label">ADMINISTRACIÓN</p>
              <li>
                <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <LayoutDashboard size={20} /> <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/inventario" className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <PackageSearch size={20} /> <span>Inventario</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/usuarios" className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <Users size={20} /> <span>Usuarios</span>
                </NavLink>
              </li>

              {/* Botón Nuevo Juego: Ahora es un Link que sustituye el centro */}
              <li className="sidebar-action">
                <NavLink to="/admin/nuevo-juego" className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <div className="add-game-btn">
                    <Plus size={20} />
                    <span>Nuevo Juego</span>
                  </div>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <p className="menu-label">TIENDA</p>
              <li>
                <NavLink to="/tienda" className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <ShoppingBag size={20} /> <span>Catálogo</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/perfil" className={({ isActive }) => (isActive ? "active-link" : "")}>
                  <User size={20} /> <span>Mi Perfil</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      <button className="logout-btn" onClick={onLogout}>
        <LogOut size={20} />
        <span>Cerrar Sesión</span>
      </button>
    </aside>
  );
};