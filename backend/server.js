import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import jsonServer from "json-server";

const PORT = process.env.PORT ?? 3000;
const JWT_SECRET = process.env.JWT_SECRET ?? "tu-secreto-seguro";

const app = express();

// MIDDLEWARES: Capas de software por las que pasa la petición antes de llegar a las rutas
app.use(cors()); // Permite peticiones desde otros dominios (como tu React en el puerto 5173)
app.use(express.json()); // Permite que el servidor entienda datos en formato JSON que vienen en el body

// CONFIGURACIÓN DE BASE DE DATOS (JSON SERVER)
const router = jsonServer.router("db.json"); // Conectamos con nuestro archivo de persistencia
const db = router.db; // Obtenemos acceso directo a la base de datos para operaciones manuales

/**
 * FUNCIÓN AUXILIAR: Crea un "Pase VIP" (Token JWT) para el usuario.
 * Guarda dentro del código datos no sensibles como ID, nombre y rol.
 */
function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "8h" }, 
  );
}

// ==========================================
// SECCIÓN DE AUTENTICACIÓN
// ==========================================

/**
 * POST /auth/register: Crea un nuevo usuario
 */
app.post("/auth/register", async (req, res) => {
  const { email, password, name, telefono, domicilio } = req.body ?? {};

  if (!email || !password || !name || !telefono || !domicilio) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const exists = db.get("users").find({ email }).value();
  if (exists) return res.status(409).json({ message: "El email ya está registrado" });

  const passwordHash = await bcrypt.hash(password, 10);
  
  const users = db.get("users");
  const nextId = (users.maxBy("id").value()?.id ?? 0) + 1;

  const newUser = {
    id: nextId,
    email,
    name,
    telefono,
    domicilio,
    passwordHash,
    role: "customer", 
    products: [],
  };

  users.push(newUser).write();
  const token = signToken(newUser);

  return res.status(201).json({
    token,
    user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
  });
});

/**
 * POST /auth/login: Verifica credenciales y entrega un Token de forma segura
 */
app.post("/auth/login", async (req, res) => {
  // Ahora los datos vienen en el CUERPO de la petición, no en la URL
  const { email, password } = req.body; 

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan credenciales" });
  }

  // 1. Buscar al usuario por su email
  const user = db.get("users").find({ email }).value();
  if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

  // 2. Comparar la contraseña (hash)
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

  // 3. Generar el Token JWT
  const token = signToken(user);

  // 4. Responder con el token y datos del usuario
  return res.json({
    token,
    user: { 
      id: user.id, 
      email: user.email, 
      name: user.name, 
      role: user.role,
      telefono: user.telefono,
      domicilio: user.domicilio
    },
  });
});
// ==========================================
// SECCIÓN DE PRODUCTOS (CRUD)
// ==========================================

/**
 * GET /products: Obtiene la lista completa de juegos
 */
app.get("/products", (req, res) => {
  const products = db.get("products").value();
  res.json(products || []);
});

/**
 * GET /products/:id: Obtiene los detalles de un solo juego por su ID
 */
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = db.get("products").find({ id }).value();
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

/**
 * POST /products: Crea un nuevo juego (Solo accesible por Admin en el Frontend)
 */
app.post("/products", (req, res) => {
  const { name, price, stock, description, imageUrl } = req.body;
  if (!name || price === undefined) return res.status(400).json({ message: "Faltan datos" });

  const products = db.get("products");
  const newProduct = {
    id: "p" + (Date.now()), 
    name,
    price: Number(price), 
    stock: Number(stock),
    description: description || "",
    imageUrl: imageUrl || ""
  };

  products.push(newProduct).write();
  res.status(201).json(newProduct);
});

/**
 * PUT /products/:id: Actualiza los datos de un juego existente
 */
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  
  db.get("products")
    .find({ id })
    .assign(productData) 
    .write();
    
  res.json({ id, ...productData });
});

/**
 * DELETE /products/:id: Elimina un juego de la base de datos
 */
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.get("products").remove({ id }).write();
  res.status(204).send();  
});

// ==========================================
// SECCIÓN DE USUARIOS
// ==========================================

/**
 * DELETE /users/:id: Elimina un usuario (Gestión de admin)
 */
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.get("users").remove({ id: Number(id) }).write();
  res.status(204).send();
});

// MIDDLEWARES DE CIERRE
app.use(jsonServer.defaults()); // Registra logs de peticiones y sirve archivos estáticos
app.use(router); // Si ninguna ruta de arriba coincidió, JSON Server intenta resolverlo solo

// ARRANCAR SERVIDOR
app.listen(PORT, () => {
  console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});