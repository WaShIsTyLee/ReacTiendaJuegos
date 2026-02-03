import { useState } from "react";
import type { Product } from "../../types/Product";
import "./AddProductForm.css"; 
interface AddProductFormProps {
  onProductAdded: (newProduct: Product) => void;
}

export const AddProductForm = ({ onProductAdded }: AddProductFormProps) => {
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  const handleSubmit = async () => {
    if (!form.name || !form.price) return alert("Rellena los campos");

    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock) }),
    });

    if (res.ok) {
      const created = await res.json();
      onProductAdded(created);
      setForm({ name: "", price: "", stock: "" }); // Limpiar
    }
  };

  return (
    <section className="admin-form-section">
      <h2>Añadir Nuevo Producto</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input type="text" placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input type="number" placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
        <input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
        <button onClick={handleSubmit} style={{ background: "#28a745", color: "white", border: "none", padding: "10px", borderRadius: "4px" }}>
          Crear Producto
        </button>
      </div>
    </section>
  );
};