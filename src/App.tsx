import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Páginas de Autenticación y Presentación
import { LandingPage } from "./pages/Landing/LandingPage";
import AuthPage from "./pages/Auth/AuthPage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";

// Páginas de la Tienda
import TiendaPage from "./pages/Tienda/TiendaPage";
import { ProductDetailPage } from "./pages/Tienda/ProductDetailPage";

// Páginas de Administración
import { Dashboard } from "./pages/Tienda/Dashboard";
import { AdminTablePage } from "./pages/Tienda/AdminTablePage";
import { AddProductPage } from "./pages/Tienda/AddProductPage";
import { EditProductPage } from "./pages/Tienda/EditProductPage";
import { Usuarios } from "./pages/Tienda/Usuarios";

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. PRESENTACIÓN: Pantalla previa antes del login */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. AUTENTICACIÓN */}
        <Route path="/login" element={<AuthPage />} />

        {/* 3. RUTAS DE ADMINISTRACIÓN (Anidadas en TiendaPage) */}
        <Route path="/admin" element={<TiendaPage />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventario" element={<AdminTablePage />} />
          <Route path="editar/:id" element={<EditProductPage />} /> 
          <Route path="nuevo-juego" element={<AddProductPage />} />
          <Route path="usuarios" element={<Usuarios />} />
        </Route>

        {/* 4. RUTAS DE CLIENTE / TIENDA */}
        <Route path="/tienda" element={<TiendaPage />}>
          {/* Al entrar a /tienda/producto/p1 se cargará el detalle */}
          <Route path="producto/:id" element={<ProductDetailPage />} />
        </Route>
        
        {/* 5. MANEJO DE ERROR 404: "Game Over" si la ruta no existe */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;