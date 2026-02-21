# 🎮 GameStore Admin - Sistema de Gestión de Videojuegos

Aplicación Web de alto rendimiento desarrollada con **React 18** y **TypeScript**. El proyecto implementa una arquitectura escalable basada en servicios, gestión de estado global y un sistema de autenticación robusto mediante JWT.

**Autor:** [Juan Jesus Lopez Solano]

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para poner en marcha el entorno de desarrollo:

### 1. Requisitos previos
- Node.js (v18 o superior)
- npm o yarn

### 2. Clonar y preparar

# Clonar el repositorio
git clone https://github.com/WaShIsTyLee/ReacTiendaJuegos.git

# Entrar en la carpeta
cd 

# Instalar dependencias
npm install

### 3. Servidor de Datos (Mock API)
La aplicacion usa Json per se levanta mediante un Docker Compose asi que docker-compose up --build

### 4. Ejecutar la Aplicación
npm run dev


👤 Credenciales de Acceso

Admin:
Usuario -- prueba@gmail.com
Contraseña -- 123

Usuario:
Usuario -- pepe@gmail.com
Contraseña -- 123

🚀 Detalles Técnicos y Arquitectura

Arquitectura Modular: Uso de Nested Routes (Rutas Anidadas) mediante <Outlet /> y ReactRouter, permitiendo un layout persistente (Sidebar/Header) y una navegación  fluida.

Comunicación Asíncrona: Implementación de servicios con Axios, utilizando interceptores para la inyección automática del JWT en las cabeceras Authorization.

Gestión de Estado y Ciclo de Vida:

useState: Control de formularios y estados de carga.

useEffect: Sincronización con la API y protección de rutas.

useRef: Optimización de peticiones para evitar duplicidad en el renderizado.

useContext: Sistema global de notificaciones (Toasts).

Seguridad: Persistencia de sesión en localStorage y manejo de errores HTTP (401 Unauthorized) para redirección automática al Login.

### ✅ Checklist de Requisitos Cumplidos
[x] CRUD Completo: Operaciones funcionales de creación, lectura, edición y borrado.

[x] Async/Await: Gestión de promesas con manejo de estados loading.

[x] Protección de Rutas: Acceso restringido según el rol y la existencia de token.

[x] Interfaz Adaptativa: Uso de componentes reutilizables y CSS optimizado.

[x] Validación y Errores: Control de excepciones mediante bloques try/catch y feedback visual al usuario.

Endpoints:                         


<img width="639" height="371" alt="image" src="https://github.com/user-attachments/assets/df8511bf-54c4-45ba-b19f-208072586c2b" />


