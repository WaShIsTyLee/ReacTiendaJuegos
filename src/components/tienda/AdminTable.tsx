import type { Product } from "../../types/Product";
import "./AdminTable.css";
interface AdminTableProps {
  products: Product[];
  onDelete: (id: string | number) => void;
}

export const AdminTable = ({ products, onDelete }: AdminTableProps) => (
  <table className="admin-table">
    <thead>
      <tr><th>ID</th><th>Nombre</th><th>Stock</th><th>Acciones</th></tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr key={p.id}>
          <td>{p.id}</td>
          <td>{p.name}</td>
          <td>{p.stock} uds</td>
          <td>
            <button style={{ background: "#ffc107", marginRight: "8px", border: "none", padding: "5px 10px", borderRadius: "4px" }}>
              Actualizar
            </button>
            <button onClick={() => onDelete(p.id)} style={{ background: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px" }}>
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);