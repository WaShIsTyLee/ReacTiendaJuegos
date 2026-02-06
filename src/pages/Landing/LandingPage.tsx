import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="logo">GAME<span>STACK</span></div>
        <button className="nav-login-btn" onClick={() => navigate("/login")}>
          Iniciar Sesión
        </button>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <h1>Tu Próxima Aventura Comienza Aquí</h1>
          <p>
            Explora el catálogo más completo de videojuegos. Desde clásicos retro 
            hasta los últimos lanzamientos AAA. Gestiona tu inventario y descubre ofertas únicas.
          </p>
          <div className="hero-buttons">
            <button className="cta-primary" onClick={() => navigate("/login")}>
              Explorar Catálogo
            </button>
            <button className="cta-secondary" onClick={() => navigate("/login")}>
              Crear Cuenta
            </button>
          </div>
        </div>
        <div className="hero-image">
           {/* Aquí puedes poner una imagen de un mando o un setup gamer */}
           <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" alt="Gamer setup" />
        </div>
      </header>

      <section className="features">
        <div className="feature-card">
          <span>🎮</span>
          <h3>+500 Juegos</h3>
          <p>Variedad total en todas las plataformas.</p>
        </div>
        <div className="feature-card">
          <span>⚡</span>
          <h3>Entrega Inmediata</h3>
          <p>Recibe tus códigos en segundos.</p>
        </div>
        <div className="feature-card">
          <span>🛡️</span>
          <h3>Compra Segura</h3>
          <p>Protección total en cada transacción.</p>
        </div>
      </section>
    </div>
  );
};