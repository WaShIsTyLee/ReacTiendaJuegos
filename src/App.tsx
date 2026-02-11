import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./components/misc/ToastContext"; 
import { LandingPage } from "./pages/Landing/LandingPage";
import AuthPage from "./pages/Auth/AuthPage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import TiendaPage from "./pages/Tienda/TiendaPage";
import { ProductDetailPage } from "./pages/Tienda/ProductDetailPage";
import { Dashboard } from "./pages/Tienda/Dashboard";
import { AdminTablePage } from "./pages/Tienda/AdminTablePage";
import { AddProductPage } from "./pages/Tienda/AddProductPage";
import { EditProductPage } from "./pages/Tienda/EditProductPage";
import { Usuarios } from "./pages/Tienda/Usuarios";

function App() {
  return (
    <ToastProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />


          <Route path="/login" element={<AuthPage />} />

        
          <Route path="/admin" element={<TiendaPage />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventario" element={<AdminTablePage />} />
            <Route path="editar/:id" element={<EditProductPage />} /> 
            <Route path="nuevo-juego" element={<AddProductPage />} />
            <Route path="usuarios" element={<Usuarios />} />
          </Route>

          <Route path="/tienda" element={<TiendaPage />}>
            <Route path="producto/:id" element={<ProductDetailPage />} />
          </Route>
          
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;