import { useEffect, useState, useRef } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { productService } from "../../services/productService";
import { authStorage } from "../../auth/authStorage"; 
import { useToast } from "../../components/misc/ToastContext";
import type { Product } from "../../types/Product";

import { Header } from "../../components/layout/Header";
import { Sidebar } from "../../components/layout/Sidebar";
import { ProductCard } from "../../components/tienda/ProductCard";
import { LoadingScreen } from "../../components/misc/LoadingScreen";

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
  const { showToast } = useToast(); 
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
        } else if (data && (data as any).products) {
          setProducts((data as any).products);
        }
      } catch (error) {
        showToast("Error de conexión con el catálogo", "error");
        hasFetched.current = false; 
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate, session, user, location.pathname, showToast]);

  const handleLogout = () => {
    authStorage.clear();
    showToast("Sesión cerrada correctamente", "success");
    navigate("/login");
  };

  const handleDelete = async (id: string | number) => {
    try {
      await productService.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      showToast("Juego eliminado del inventario", "success");
    } catch (e) { 
      showToast("No se pudo eliminar el producto", "error");
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

  if (loading) return <LoadingScreen message="Sincronizando inventario..." />;

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isBaseTienda = location.pathname === "/tienda";

  const contextValue: TiendaContextType = {
    products,
    setProducts,
    handleDelete,
    handleProductAdded
  };

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
            <Outlet context={contextValue} />
          ) : isBaseTienda ? (
            <div className="products-grid">
              {products.length > 0 ? (
                products.map((p) => <ProductCard key={p.id} product={p} />)
              ) : (
                <div className="no-products-msg">
                  <p>No hay productos disponibles actualmente.</p>
                </div>
              )}
            </div>
          ) : (
            <Outlet context={{ products }} />
          )}
        </div>
      </main>
    </div>
  );
};

export default TiendaPage;