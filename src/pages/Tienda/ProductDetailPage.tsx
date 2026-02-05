import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../../services/productService";
import type { Product } from "../../types/Product";
import "./ProductDetailPage.css";

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (id) {
          const data = await productService.getById(id);
          setProduct(data);
        }
      } catch (error) {
        console.error("Error al cargar el detalle:", error);
        alert("No se encontró el producto");
        navigate("/tienda");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, navigate]);

  if (loading) return <div className="loading">Cargando detalles...</div>;
  if (!product) return <div className="error">Producto no encontrado</div>;

  return (
    <div className="product-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>
      
      <div className="product-detail-content">
        <div className="detail-image">
          <img src={product.imageUrl || "https://via.placeholder.com/400"} alt={product.name} />
        </div>
        
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="category-badge">Videojuego</p>
          <p className="description">{product.description}</p>
          <div className="price-tag">${product.price}</div>
          <p className="stock-info">
            Disponibilidad: <span>{product.stock > 0 ? `${product.stock} unidades` : "Agotado"}</span>
          </p>
          
          <button className="buy-btn" disabled={product.stock === 0}>
            {product.stock > 0 ? "Añadir al carrito" : "Sin Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};