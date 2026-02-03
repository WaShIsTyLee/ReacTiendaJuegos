import type { Product } from "../../types/Product";
import "./ProductCard.css";
export const ProductCard = ({ product }: { product: Product }) => (
  <div className="product-card" style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", textAlign: "center" }}>
    <h3>{product.name}</h3>
    <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{product.price}€</p>
    <button style={{ background: "#007bff", color: "white", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer" }}>
      Añadir al carrito
    </button>
  </div>
);