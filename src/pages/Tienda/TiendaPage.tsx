import { useEffect, useState, useRef } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

// Servicios y Storage
import { productService } from "../../services/productService";
import { authStorage } from "../../auth/authStorage"; 
import type { Product } from "../../types/Product";

// Componentes de Layout
import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/layout/Sidebar";
import { ProductCard } from "../../components/tienda/ProductCard";

import "./TiendaPage.css";

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

  const session = authStorage.get();
  const user = session?.user; 

  useEffect(() => {
    if (!session) {
      navigate("/login");
      return;
    }

    if (user?.role === "admin" && location.pathname === "/tienda") {
      navigate("/admin/dashboard");
      return;
    }

    if (hasFetched.current) return;

    const loadData = async () => {
      try {
        hasFetched.current = true; 
        const data = await productService.getAll(); 
        
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && typeof data === 'object' && (data as any).products) {
          setProducts((data as any).products);
        } else {
          setProducts([]); 
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setProducts([]); 
        hasFetched.current = false; 
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate, session, user, location.pathname]);

  const handleLogout = () => {
    authStorage.clear();
    navigate("/login");
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("¿Estás seguro de eliminar este juego?")) return;
    try {
      await productService.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (e) { 
      console.error("Error al eliminar:", e); 
      alert("No se pudo eliminar el producto.");
    }
  };

  const handleProductAdded = (newP: Product) => {
    setProducts(prev => {
      const exists = prev.find(p => p.id === newP.id);
      return exists 
        ? prev.map(p => p.id === newP.id ? newP : p) 
        : [...prev, newP];
    });
    navigate("/admin/inventario");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Sincronizando con el servidor...</p>
      </div>
    );
  }

  // --- LÓGICA DE RUTAS MEJORADA ---
  const isAdminRoute = location.pathname.startsWith("/admin");
  // Esta línea es la clave: detecta si estamos exactamente en la raíz de la tienda
  const isBaseTienda = location.pathname === "/tienda";

  return (
    <div className="admin-layout">
      <Sidebar role={user?.role || "customer"} onLogout={handleLogout} />
      
      <main className="main-content">
        <Header 
          title={user?.role === "admin" ? "Panel de Gestión" : "Catálogo de Juegos"} 
          userName={user?.name || "Usuario"} 
          onLogout={handleLogout} 
        />
        
        <div className="content-inner">
          {isAdminRoute ? (
            /* Rutas de Admin usan Outlet */
            <Outlet context={{ 
              products, 
              setProducts, 
              handleDelete, 
              handleProductAdded 
            } satisfies TiendaContextType} />
          ) : isBaseTienda ? (
            /* Solo mostramos el grid si la ruta es EXACTAMENTE /tienda */
            <div className="products-grid">
              {Array.isArray(products) && products.length > 0 ? (
                products.map((p) => <ProductCard key={p.id} product={p} />)
              ) : (
                <div className="no-products-msg">
                  <p>No hay productos disponibles.</p>
                </div>
              )}
            </div>
          ) : (
            /* Si es /tienda/producto/p2, mostramos el Outlet para cargar el Detalle */
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

export default TiendaPage;