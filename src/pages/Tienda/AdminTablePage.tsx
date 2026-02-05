import { useOutletContext } from "react-router-dom";
import type { TiendaContextType } from "../Tienda/TiendaPage";
import { AdminTable } from "../../components/tienda/AdminTable";

export const AdminTablePage = () => {
  // Extraemos products y handleDelete del contexto del Outlet
  const { products, handleDelete } = useOutletContext<TiendaContextType>();

  return (
    <div className="admin-page-container">
      <h1 className="admin-title">Gestión de Inventario</h1>
      <AdminTable 
        products={products} 
        onDelete={handleDelete} 
      />
    </div>
  );
};