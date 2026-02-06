import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '100px', backgroundColor: '#0f172a', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '10rem', margin: '0', color: '#06b6d4' }}>404</h1>
      <h2>GAME OVER</h2>
      <p>La página que buscas ha sido eliminada o no existe.</p>
      <button 
        onClick={() => navigate('/')}
        style={{ padding: '10px 20px', cursor: 'pointer', background: '#06b6d4', border: 'none', color: 'white', borderRadius: '5px', marginTop: '20px' }}
      >
        Volver al Inicio
      </button>
    </div>
  );
};