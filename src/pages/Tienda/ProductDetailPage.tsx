import { useEffect, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { productService } from "../../services/productService";
import { LoadingScreen } from "../../components/misc/LoadingScreen";
import type { Product } from "../../types/Product";
import "./ProductDetailPage.css";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const context = useOutletContext<{ products: Product[] }>();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);

        if (context?.products) {
          const found = context.products.find(p => p.id == id);
          if (found) {
            setProduct(found);
            setLoading(false);
            return;
          }
        }

        if (id) {
          const data = await productService.getById(id);
          setProduct(data);
        }
      } catch (error) {
        console.error("Error al obtener el detalle:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id, context]);

  if (loading) return <LoadingScreen message="Cargando detalles del juego..." />;

  if (!product) {
    return (
      <div className="error-container">
        <h2>🎮 ¡Game Over!</h2>
        <p>No se ha encontrado el producto con ID: {id}</p>
        <button className="back-btn" onClick={() => navigate("/tienda")}>
          Volver al Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button className="back-link" onClick={() => navigate(-1)}>
        ← Volver atrás
      </button>

      <div className="detail-layout">
        <div className="image-wrapper">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="info-wrapper">
          <span className="category-badge">Videojuego</span>
          <h1>{product.name}</h1>
          
          <div className="price-box">
            <span className="price-value">{product.price.toFixed(2)}€</span>
            <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? `En stock (${product.stock} uds)` : 'Agotado'}
            </span>
          </div>

          <p className="description">{product.description || "Sin descripción disponible."}</p>

          <div className="actions">
            <button className="buy-button" disabled={product.stock <= 0}>
              {product.stock > 0 ? "AÑADIR AL CARRITO" : "SIN STOCK"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};