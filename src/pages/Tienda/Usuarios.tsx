import { useState, useEffect } from "react";
// 1. Importamos el servicio de auth que usa Axios
import { authService } from "../../services/authService";
import type { User } from "../../types/Auth";

export const Usuarios = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Cargamos los usuarios usando el servicio
  useEffect(() => {
    authService.getAllUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando usuarios:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number | string, name: string) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar a ${name}?`);
    
    if (confirmDelete) {
      try {
        // 3. Usamos el método deleteUser del servicio de Axios
        await authService.deleteUser(id);
        
        // Actualizamos el estado local
        setUsers(users.filter((user) => user.id !== id));
        alert("Usuario eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("No se pudo eliminar al usuario (quizás no tienes permisos)");
      }
    }
  };

  if (loading) return <p>Cargando lista de usuarios...</p>;

  return (
    <div className="admin-page-container">
      <h2 className="section-title">👥 Gestión de Usuarios</h2>
      <p className="section-subtitle">Panel de administración para el control de cuentas.</p>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="td-id">#{user.id}</td>
                <td><strong>{user.name}</strong></td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role}`}>
                    {user.role === 'admin' ? '🛡️ Admin' : '👤 Cliente'}
                  </span>
                </td>
                <td>{user.telefono || 'N/A'}</td>
                <td className="td-actions">
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(user.id, user.name)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};