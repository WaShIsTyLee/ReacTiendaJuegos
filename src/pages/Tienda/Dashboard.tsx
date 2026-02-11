import { useOutletContext } from "react-router-dom";
import type { TiendaContextType } from "../Tienda/TiendaPage";
import { StatCard } from "../../components/misc/StatCard";
export const Dashboard = () => {
  const { products } = useOutletContext<TiendaContextType>();

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
        <StatCard 
          icon="🎮" 
          title="Total Juegos" 
          value={totalProducts} 
        />

        <StatCard 
          icon="📦" 
          title="Stock Total" 
          value={totalStock} 
          suffix=" uds"
        />

        <StatCard 
          icon="💰" 
          title="Valor de Inventario" 
          value={totalValue.toLocaleString('es-ES', { minimumFractionDigits: 2 })} 
          suffix="€"
        />
      </div>
    </div>
  );
};