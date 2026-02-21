🎮 GameStore Admin
Sistema de Gestión de Videojuegos

Aplicación web de alto rendimiento desarrollada con React 18 y TypeScript.
El proyecto implementa una arquitectura escalable basada en servicios, gestión de estado global y autenticación segura mediante JWT.

Autor: Juan Jesus Lopez Solano

🛠️ Instalación y Configuración
1️⃣ Requisitos Previos

Node.js (v18 o superior)

npm o yarn

Docker (para la API)

2️⃣ Clonar y Preparar el Proyecto

Clona el repositorio:
https://github.com/WaShIsTyLee/ReacTiendaJuegos.git

Después, accede a la carpeta del proyecto e instala las dependencias con:

npm install

3️⃣ Servidor API

La aplicación utiliza una API basada en JSON que se levanta mediante Docker Compose.

Ejecuta:

docker-compose up --build

4️⃣ Ejecutar la Aplicación

Una vez levantada la API, inicia el entorno de desarrollo con:

npm run dev

👤 Credenciales de Acceso

🔐 Administrador

Usuario → prueba@gmail.com

Contraseña → 123

👤 Usuario

Usuario → pepe@gmail.com

Contraseña → 123

🚀 Detalles Técnicos y Arquitectura
🧩 Arquitectura Modular

Uso de rutas anidadas mediante Outlet y React Router, permitiendo:

Layout persistente (Sidebar + Header)

Separación clara por módulos

🔄 Comunicación Asíncrona

Implementación de servicios con Axios, incluyendo:

Interceptores para inyección automática del JWT

Cabeceras Authorization centralizadas

Manejo global de errores HTTP

🧠 Gestión de Estado y Ciclo de Vida

useState → Control de formularios y estados de carga

useEffect → Sincronización con la API y protección de rutas

useRef → Prevención de renderizados duplicados

useContext → Sistema global de notificaciones (Toasts)

🔐 Seguridad

Persistencia de sesión en localStorage

Manejo automático de errores 401 Unauthorized

Redirección al login cuando el token expira

Protección de rutas según autenticación y rol

✅ Checklist de Requisitos Cumplidos

 CRUD completo (crear, leer, editar y eliminar)

 Uso de Async/Await con estados de loading

 Protección de rutas por autenticación y rol

 Interfaz adaptativa y componentes reutilizables

 Manejo de errores con try/catch y feedback visual

📡 Endpoints

A continuación se muestra una vista general de los endpoints disponibles en la API:

<img width="639" height="371" alt="Endpoints API" src="https://github.com/user-attachments/assets/df8511bf-54c4-45ba-b19f-208072586c2b" />
