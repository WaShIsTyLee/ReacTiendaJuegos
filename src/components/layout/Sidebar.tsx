import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  LogOut, 
  Gamepad2,
  PackageSearch,
  Plus 
} from "lucide-react";
import { SidebarItem } from "./SidebarItem"; // Asegúrate de que la ruta sea correcta

interface SidebarProps {
  role: "admin" | "user" | string | undefined;
  onLogout: () => void;
}

export const Sidebar = ({ role, onLogout }: SidebarProps) => {
  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="sidebar-logo">
        <Gamepad2 size={32} className="logo-icon" color="#a855f7" />
        <span>WASHI<span className="logo-accent">STORE</span></span>
      </div>

      {/* NAVEGACIÓN DINÁMICA */}
      <nav className="sidebar-nav">
        <ul>
          {role === "admin" ? (
            <>
              <p className="menu-label">ADMINISTRACIÓN</p>
              <SidebarItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
              <SidebarItem to="/admin/inventario" icon={PackageSearch} label="Inventario" />
              <SidebarItem to="/admin/usuarios" icon={Users} label="Usuarios" />
              
              {/* Acción destacada para crear juego */}
              <SidebarItem 
                to="/admin/nuevo-juego" 
                icon={Plus} 
                label="Nuevo Juego" 
                className="sidebar-action-item" 
              />
            </>
          ) : (
            <>
              <p className="menu-label">TIENDA</p>
              <SidebarItem to="/tienda" icon={ShoppingBag} label="Catálogo" />
            </>
          )}
        </ul>
      </nav>

      {/* BOTÓN DE SALIDA */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};