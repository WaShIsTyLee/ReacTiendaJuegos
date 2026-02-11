import { useNavigate } from "react-router-dom";
import { StatCard } from "../../components/misc/StatCard";
import { AuthButton } from "../../components/misc/AuthButton";
import "./LandingPage.css";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* NAVEGACIÓN */}
      <nav className="landing-nav">
        <div className="logo">WASHI<span>STORE</span></div>
        <AuthButton 
          label="Iniciar Sesión" 
          onClick={() => navigate("/login")} 
          className="nav-style" 
        />
      </nav>

      {/* SECCIÓN HERO */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Tu Próxima Aventura Comienza Aquí</h1>
          <p>
            Explora el catálogo más completo de videojuegos. Desde clásicos retro 
            hasta los últimos lanzamientos AAA.
          </p>
          <div className="hero-buttons">
            <AuthButton 
              label="Explorar Catálogo" 
              onClick={() => navigate("/login")} 
            />
          
          </div>
        </div>
        <div className="hero-image">
           <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" alt="Gamer setup" />
        </div>
      </header>

      {/* CARACTERÍSTICAS REUTILIZANDO STATCARD */}
      <section className="features">
        <StatCard 
          icon="🎮" 
          title="Catálogo" 
          value="+500" 
          suffix=" Juegos" 
        />
        <StatCard 
          icon="⚡" 
          title="Velocidad" 
          value="100" 
          suffix="% Digital" 
        />
        <StatCard 
          icon="🛡️" 
          title="Seguridad" 
          value="SSL" 
          suffix=" Protegido" 
        />
      </section>
    </div>
  );
};