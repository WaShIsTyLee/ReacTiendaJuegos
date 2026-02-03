import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/productService";
import { Header } from "../../components/layout/Header";
import { AddProductForm } from "../../components/tienda/AddProductForm";
import { AdminTable } from "../../components/tienda/AdminTable";
import { ProductCard } from "../../components/tienda/ProductCard";
import type { Product } from "../../types/Product";

const TiendaPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // EL CANDADO: Esta referencia no cambia entre renderizados
  const hasFetched = useRef(false);

  // Cargamos el usuario de forma segura
  const [user] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    // 1. Verificación de seguridad
    if (!user) {
      navigate("/login");
      return;
    }

    // 2. Si ya pedimos los datos una vez, no lo hacemos de nuevo
    if (hasFetched.current) return;

    const loadData = async () => {
      try {
        console.log("🚀 EJECUTANDO PETICIÓN ÚNICA AL SERVIDOR");
        hasFetched.current = true; // Cerramos el candado antes de la petición
        
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error en la carga:", error);
        // Si falla, permitimos reintentar en el próximo renderizado quitando el candado
        hasFetched.current = false; 
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate, user]); // Dependencias mínimas

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("¿Estás seguro?")) return;
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" });
      if (res.ok) setProducts(prev => prev.filter(p => p.id !== id));
    } catch (e) { console.error(e); }
  };

  const handleProductAdded = (newP: Product) => setProducts(prev => [...prev, newP]);

  if (loading) return <div className="admin-container"><p>Cargando...</p></div>;

  return (
    <div className="admin-container">
      <Header 
        title={user?.role === "admin" ? "Panel de Control" : "Tienda de Juegos"} 
        userName={user?.name} 
        onLogout={handleLogout} 
      />

      {user?.role === "admin" ? (
        <>
          <AddProductForm onProductAdded={handleProductAdded} />
          <AdminTable products={products} onDelete={handleDelete} />
        </>
      ) : (
        <div className="products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default TiendaPage;