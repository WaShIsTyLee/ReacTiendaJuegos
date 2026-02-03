import type { Product } from "../../types/Product";
import "./ProductCard.css";
export const ProductCard = ({ product }: { product: Product }) => (
  <div className="product-card">
    <h3>{product.name}</h3>
    <p>{product.price}€</p>
    <button>
      Añadir al carrito
    </button>
  </div>
);