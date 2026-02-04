import type { Product } from "../../types/Product";
import "./ProductCard.css";
interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'}
          alt={product.name}
        />
      </div>
      <div className="product-card-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="card-footer">
          <span className="price">{product.price}€</span>
          <button className="add-to-cart-btn">Comprar</button>
        </div>
      </div>
    </div>
  );
};