import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth/AuthPage";
import TiendaPage from "./pages/Tienda/TiendaPage";
import { Dashboard } from "./pages/Tienda/Dashboard";
import { AdminTablePage } from "./pages/Tienda/AdminTablePage";
import { AddProductPage } from "./pages/Tienda/AddProductPage";
import { Usuarios } from "./pages/Tienda/Usuarios";
import { EditProductPage } from "./pages/Tienda/EditProductPage"; 

// 1. Importa las nuevas páginas (asegúrate de que las rutas de archivo existan)
import { ProductDetailPage } from "./pages/Tienda/ProductDetailPage"; 
// import { NotFoundPage } from "./pages/NotFoundPage"; // La crearemos luego

function App() {
  return (
    <Router>
      <Routes>
        {/* RUTA PÚBLICA / LOGIN */}
        <Route path="/login" element={<AuthPage />} />

        {/* RUTAS DE ADMINISTRACIÓN (Privadas) */}
        <Route path="/admin" element={<TiendaPage />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventario" element={<AdminTablePage />} />
          <Route path="editar/:id" element={<EditProductPage />} /> 
          <Route path="nuevo-juego" element={<AddProductPage />} />
          <Route path="usuarios" element={<Usuarios />} />
        </Route>

        {/* RUTAS DE TIENDA / CLIENTE (Privadas o Semiprivadas) */}
        <Route path="/tienda" element={<TiendaPage />}>
          {/* Ruta para ver el detalle de un producto específico */}
          {/* Esto permite entrar a /tienda/producto/p2 */}
          <Route path="producto/:id" element={<ProductDetailPage />} />
        </Route>
        
        {/* REDIRECCIÓN INICIAL */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 2. MANEJO DE ERROR 404 (En lugar de redirigir, mostramos una página) */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;