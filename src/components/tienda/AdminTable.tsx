import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/Product";
import "./AdminTable.css";

interface AdminTableProps {
  products: Product[];
  onDelete: (id: string | number) => void;
}

export const AdminTable = ({ products, onDelete }: AdminTableProps) => {
  const navigate = useNavigate();
  
  // ESTADOS PARA EL MODAL
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Funciones de control
  const openModal = (product: Product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete.id);
      closeModal();
    }
  };

  return (
    <div className="table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Juego</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="td-id">#{p.id}</td>
              <td className="td-name"><strong>{p.name}</strong></td>
              <td className="td-price">{p.price}€</td>
              <td className="td-stock">{p.stock} uds</td>
              <td className="td-actions">
                <button onClick={() => navigate(`/admin/editar/${p.id}`)}>Editar</button>
                <button 
                  className="delete-btn" 
                  onClick={() => openModal(p)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- EL MODAL --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¿Confirmar borrado?</h3>
            <p>Estás a punto de eliminar <strong>{productToDelete?.name}</strong>.</p>
            <p>¿Estás seguro de continuar?</p>
            
            <div className="modal-actions">
              <button className="btn-secondary" onClick={closeModal}>
                Cancelar
              </button>
              <button className="btn-danger" onClick={handleConfirmDelete}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};