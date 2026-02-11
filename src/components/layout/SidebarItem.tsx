import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  className?: string; // Por si quieres pasarle estilos extra (como al botón de Plus)
}

export const SidebarItem = ({ to, icon: Icon, label, className = "" }: SidebarItemProps) => {
  return (
    <li>
      <NavLink 
        to={to} 
        className={({ isActive }) => 
          `sidebar-link ${isActive ? "active-link" : ""} ${className}`
        }
      >
        <Icon size={20} strokeWidth={2} />
        <span>{label}</span>
      </NavLink>
    </li>
  );
};