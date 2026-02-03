import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/Auth/AuthPage";
import TiendaPage from "./pages/Tienda/TiendaPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Cambiamos /auth por /login para que coincida con tus redirecciones */}
        <Route path="/login" element={<AuthPage />} />

        {/* AÑADIMOS LA RUTA DE LA TIENDA AQUÍ */}
        <Route path="/tienda" element={<TiendaPage />} />

        {/* Ruta por defecto: si entras a "/" te manda a "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Ruta 404 */}
        <Route path="*" element={<h2>404 - Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;