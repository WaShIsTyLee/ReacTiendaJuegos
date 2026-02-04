import { useEffect, useState, useRef } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

// Servicios y Tipos
import { getProducts } from "../../services/productService";
import type { Product } from "../../types/Product";

// Componentes de Layout
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/layout/Sidebar";
import { ProductCard } from "../../components/tienda/ProductCard";

import "./TiendaPage.css";

// Interfaz para el contexto compartido con los hijos del Outlet
export interface TiendaContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  handleDelete: (id: string | number) => Promise<void>;
  handleProductAdded: (newP: Product) => void;
}

const TiendaPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Seguridad: Si un admin entra a /tienda, lo movemos a su panel
    if (user.role === "admin" && location.pathname === "/tienda") {
      navigate("/admin/dashboard");
      return;
    }

    if (hasFetched.current) return;

    const loadData = async () => {
      try {
        hasFetched.current = true; 
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        hasFetched.current = false; 
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate, user, location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este juego?")) return;
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch (e) { 
      console.error("Error al eliminar:", e); 
    }
  };

  const handleProductAdded = (newP: Product) => {
    setProducts(prev => [...prev, newP]);
    navigate("/admin/inventario");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Iniciando sistema...</p>
      </div>
    );
  }

  // Si la ruta comienza con /admin, renderizamos el Outlet. 
  // Si no (estamos en /tienda), renderizamos el catálogo.
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="admin-layout">
      <Sidebar role={user?.role} onLogout={handleLogout} />

      <main className="main-content">
        <Header 
          title={user?.role === "admin" ? "Panel de Gestión" : "Catálogo de Juegos"} 
          userName={user?.name} 
          onLogout={handleLogout} 
        />

        <div className="content-inner">
          {!isAdminRoute ? (
            /* VISTA PARA USUARIOS NORMALES */
            <div className="products-grid">
              {products.length > 0 ? (
                products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))
              ) : (
                <p className="no-products">No hay juegos disponibles en este momento.</p>
              )}
            </div>
          ) : (
            /* VISTA PARA ADMINISTRADORES */
            <Outlet context={{ 
              products, 
              setProducts, 
              handleDelete, 
              handleProductAdded 
            } satisfies TiendaContextType} />
          )}
        </div>
      </main>
    </div>
  );
};

export default TiendaPage;