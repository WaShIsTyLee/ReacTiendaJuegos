import { useOutletContext } from "react-router-dom";
import type { TiendaContextType } from "../Tienda/TiendaPage";

export const Dashboard = () => {
  const { products } = useOutletContext<TiendaContextType>();
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <div className="admin-view">
      <h2 className="section-title">📊 Resumen del Sistema</h2>
      <div className="overview-cards">
        <div className="card">
          <h4>Total Juegos</h4>
          <p>{products.length}</p>
        </div>
        <div className="card">
          <h4>Stock Total</h4>
          <p>{totalStock}</p>
        </div>
        <div className="card">
          <h4>Valor de Inventario</h4>
          <p>{totalValue.toLocaleString()}€</p>
        </div>
      </div>
    </div>
  );
};