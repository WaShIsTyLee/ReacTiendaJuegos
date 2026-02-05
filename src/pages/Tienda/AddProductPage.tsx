import { useOutletContext } from "react-router-dom";
import type { TiendaContextType } from "../Tienda/TiendaPage";
import { AddProductForm } from "../../components/tienda/AddProductForm";

export const AddProductPage = () => {
  // Obtenemos la función que actualiza el estado global de productos desde el Outlet
  const { handleProductAdded } = useOutletContext<TiendaContextType>();

  return (
    <div className="admin-page-container">
      <div className="form-centered-container">
        <AddProductForm 
          onProductAdded={handleProductAdded} 
          isEditing={false} 
        />
      </div>
    </div>
  );
};