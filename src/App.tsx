import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth/AuthPage";
import TiendaPage from "./pages/Tienda/TiendaPage";

// Importamos las nuevas páginas separadas
import { Dashboard } from "./pages/Tienda/Dashboard";
import { AdminTablePage } from "./pages/Tienda/AdminTablePage";
import { AddProductPage } from "./pages/Tienda/AddProductPage";
import { Usuarios } from "./pages/Tienda/Usuarios";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />

        {/* RUTAS DE ADMINISTRACIÓN - Ahora limpias */}
        <Route path="/admin" element={<TiendaPage />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventario" element={<AdminTablePage />} />
          <Route path="nuevo-juego" element={<AddProductPage />} />
          <Route path="usuarios" element={<Usuarios />} />
        </Route>

        <Route path="/tienda" element={<TiendaPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;