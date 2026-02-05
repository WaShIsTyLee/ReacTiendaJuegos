import { useOutletContext } from "react-router-dom";
import type { TiendaContextType } from "../Tienda/TiendaPage";

export const Dashboard = () => {
  const { products } = useOutletContext<TiendaContextType>();

  // Calculamos las estadísticas
  const totalProducts = products?.length || 0;
  
  const totalStock = products?.reduce((acc, p) => acc + (Number(p.stock) || 0), 0) || 0;
  
  const totalValue = products?.reduce((acc, p) => {
    const price = Number(p.price) || 0;
    const stock = Number(p.stock) || 0;
    return acc + (price * stock);
  }, 0) || 0;

  return (
    <div className="admin-page-container">
      <h2 className="section-title">📊 Resumen del Sistema</h2>
      
      <div className="overview-cards">
        <div className="card">
          <div className="card-icon">🎮</div>
          <h4>Total Juegos</h4>
          <p className="card-value">{totalProducts}</p>
        </div>

        <div className="card">
          <div className="card-icon">📦</div>
          <h4>Stock Total</h4>
          <p className="card-value">{totalStock}</p>
        </div>

        <div className="card">
          <div className="card-icon">💰</div>
          <h4>Valor de Inventario</h4>
          <p className="card-value">{totalValue.toLocaleString('es-ES', { minimumFractionDigits: 2 })}€</p>
        </div>
      </div>
    </div>
  );
};