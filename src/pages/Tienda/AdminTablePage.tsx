import { useOutletContext } from "react-router-dom";
import type { TiendaContextType } from "../Tienda/TiendaPage";
import { AdminTable } from "../../components/tienda/AdminTable";

export const AdminTablePage = () => {
  const { products, handleDelete } = useOutletContext<TiendaContextType>();
  return <AdminTable products={products} onDelete={handleDelete} />;
};