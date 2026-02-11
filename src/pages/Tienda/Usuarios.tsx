import { useState, useEffect } from "react";
import { authService } from "../../services/authService";
import { useToast } from "../../components/misc/ToastContext";
import type { User } from "../../types/Auth";

export const Usuarios = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast(); // <--- Hook de Toast

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await authService.getAllUsers();
        setUsers(data);
      } catch (err) {
        showToast("Error al cargar la lista de usuarios", "error");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [showToast]);

  const handleDelete = async (id: number | string, name: string) => {
    const proceed = window.confirm(`¿Estás seguro de que quieres eliminar a ${name}?`);
    
    if (proceed) {
      try {
        await authService.deleteUser(id);
        setUsers(prevUsers => prevUsers.filter((user) => user.id !== id));
        showToast(`Usuario ${name} eliminado correctamente`, "success");
      } catch (error) {
        showToast("No se pudo eliminar al usuario", "error");
      }
    }
  };

  if (loading) return <div className="loading-msg">Cargando lista de usuarios...</div>;

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
            {users.length > 0 ? (
              users.map((user) => (
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
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-results">
                  <div className="no-results-content">
                    <span className="no-results-icon">🚫</span>
                    <p>No se han encontrado usuarios registrados.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};