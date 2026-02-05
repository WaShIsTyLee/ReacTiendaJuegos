import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { AddProductForm } from "../../components/tienda/AddProductForm";
import type { TiendaContextType } from "../Tienda/TiendaPage";
import type { Product } from "../../types/Product";

export const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, handleProductAdded } = useOutletContext<TiendaContextType>();

  // Buscamos el producto en nuestro estado global por su ID
  // Usamos String() en ambos lados para evitar fallos si uno es number y otro string
  const productToEdit = products.find(p => String(p.id) === String(id));

  const onUpdateSuccess = (updated: Product) => {
    handleProductAdded(updated); // Actualiza el array global en TiendaPage
    navigate("/admin/inventario"); // Redirige automáticamente a la tabla
  };

  if (!productToEdit) {
    return (
      <div className="admin-page-container">
        <p>⚠️ No se encontró el producto o se está cargando...</p>
        <button onClick={() => navigate("/admin/inventario")}>Volver al inventario</button>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      <div className="form-centered-container">
        <h2 className="section-title">Editar Juego: {productToEdit.name}</h2>
        <AddProductForm 
          onProductAdded={onUpdateSuccess} 
          initialData={productToEdit} 
          isEditing={true} 
        />
      </div>
    </div>
  );
};