import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import jsonServer from "json-server";

const PORT = process.env.PORT ?? 3000;
const JWT_SECRET = process.env.JWT_SECRET ?? "tu-secreto-seguro";

const app = express();
app.use(cors());
app.use(express.json());

const router = jsonServer.router("db.json");
const db = router.db;

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

// --- REGISTRO ---
app.post("/auth/register", async (req, res) => {
  const { email, password, name, telefono, domicilio } = req.body ?? {};

  if (!email || !password || !name || !telefono || !domicilio) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  const exists = db.get("users").find({ email }).value();
  if (exists)
    return res.status(409).json({ message: "El email ya está registrado" });

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
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      telefono: newUser.telefono,
      domicilio: newUser.domicilio,
    },
  });
});

// --- LOGIN (Cambiado a GET) ---
app.get("/auth/login", async (req, res) => {
  // Los datos en GET no vienen en el cuerpo, vienen en la URL (query string)
  const { email, password } = req.query;

  // Validación básica para evitar errores de búsqueda
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan email o password en los parámetros de la URL" });
  }

  const user = db.get("users").find({ email }).value();
  if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

  const token = signToken(user);
  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      telefono: user.telefono,
      domicilio: user.domicilio,
    },
  });
});

// --- PRODUCTOS (Aquí estaba el fallo del 404) ---
app.get("/products", (req, res) => {
  // Accedemos directamente a la base de datos de lodash que usa el router
  const products = router.db.get("products").value();
  console.log(products);
  res.json(products || []);
});

app.post("/products", (req, res) => {
  const { name, price, stock, description } = req.body;
  if (!name || price === undefined)
    return res.status(400).json({ message: "Faltan datos" });

  const products = db.get("products");
  const newProduct = {
    id: "p" + (products.size().value() + 1),
    name,
    price,
    stock,
    description: description || "",
  };

  products.push(newProduct).write();
  res.status(201).json(newProduct);
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.get("products").remove({ id }).write();
  res.status(204).send();
});

app.use(jsonServer.defaults());
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});
