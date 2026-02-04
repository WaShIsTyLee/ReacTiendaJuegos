import type { Product } from "../../types/Product";
import "./AdminTable.css";

interface AdminTableProps {
  products: Product[];
  onDelete: (id: string | number) => void;
}

export const AdminTable = ({ products, onDelete }: AdminTableProps) => (
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
            {/* ID con estilo tenue */}
            <td className="td-id">#{p.id}</td>

            {/* Nombre principal */}
            <td className="td-name">
              <strong>{p.name}</strong>
            </td>

            {/* Precio con formato de moneda */}
            <td className="td-price">
              {p.price.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€
            </td>

            {/* Stock con aviso visual si es bajo */}
            <td className={`td-stock ${p.stock < 5 ? 'low-stock' : ''}`}>
              {p.stock} uds
            </td>

            {/* Botones de control */}
            <td className="td-actions">
              <button className="edit-btn">Editar</button>
              <button 
                className="delete-btn" 
                onClick={() => onDelete(p.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);