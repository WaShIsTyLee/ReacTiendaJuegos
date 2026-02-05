import { useNavigate } from "react-router-dom"; // 1. Importamos el hook
import type { Product } from "../../types/Product";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate(); // 2. Inicializamos el navegador

  // Función para manejar el clic en la tarjeta
  const handleViewDetail = () => {
    // Esto nos lleva a /tienda/producto/p2, p3, etc.
    navigate(`/tienda/producto/${product.id}`);
  };

  return (
    /* 3. Añadimos el onClick a la tarjeta completa o a un elemento específico */
    <div className="product-card" onClick={handleViewDetail} style={{ cursor: 'pointer' }}>
      <div className="product-image-container">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'}
          alt={product.name}
          loading="lazy"
        />
      </div>
      
      <div className="product-card-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        
        <div className="card-footer">
          <span className="price">
            {Number(product.price).toLocaleString('es-ES', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}€
          </span>
          {/* También podemos disparar la navegación desde el botón */}
          <button 
            className="add-to-cart-btn"
            onClick={(e) => {
              e.stopPropagation(); // Evita que se dispare el onClick del div padre
              handleViewDetail();
            }}
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};