import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  telefono: string;
  domicilio: string;
}

export const Usuarios = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Cargamos los usuarios del db.json al montar el componente
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error cargando usuarios:", err));
  }, []);

  return (
    <div className="admin-view">
      <h2 className="section-title">👥 Gestión de Usuarios</h2>
      <p className="section-subtitle">Lista de clientes y administradores registrados en el sistema.</p>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Teléfono</th>
              <th>Ubicación</th>
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
                <td>{user.telefono}</td>
                <td className="td-domicilio">{user.domicilio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};