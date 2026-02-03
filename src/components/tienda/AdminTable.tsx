import type { Product } from "../../types/Product";
import "./AdminTable.css";
interface AdminTableProps {
  products: Product[];
  onDelete: (id: string | number) => void;
}

export const AdminTable = ({ products, onDelete }: AdminTableProps) => (
  <table className="admin-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Stock</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr key={p.id}>
          <td>{p.id}</td>
          <td>{p.name}</td>
          <td>{p.stock} uds</td>
          <td>
            <button>Actualizar</button>
            <button onClick={() => onDelete(p.id)}>Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
