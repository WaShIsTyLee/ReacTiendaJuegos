import { useState } from "react";
import type { Product } from "../../types/Product";
import "./AddProductForm.css"; 

interface AddProductFormProps {
  onProductAdded: (newProduct: Product) => void;
}

export const AddProductForm = ({ onProductAdded }: AddProductFormProps) => {
  // Inicializamos el formulario con todos los campos necesarios
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: ""
  });

  const handleSubmit = async () => {
    // Validación básica: Nombre, Precio e Imagen son importantes
    if (!form.name || !form.price || !form.imageUrl) {
      return alert("Por favor, rellena los campos obligatorios (Nombre, Precio e Imagen)");
    }

    const newProductData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock) || 0, // Evitamos que el stock sea NaN
    };

    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProductData),
      });

      if (res.ok) {
        const created = await res.json();
        onProductAdded(created);
        // Limpiamos el formulario con los nuevos campos
        setForm({ name: "", description: "", price: "", stock: "", imageUrl: "" });
        alert("¡Producto creado con éxito!");
      }
    } catch (error) {
      console.error("Error al crear producto:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <section className="admin-form-section">
      <h2 className="section-title">🚀 Registrar Nuevo Juego</h2>
      <div className="form-grid">
        <div className="input-group">
          <label>Nombre del Juego *</label>
          <input 
            type="text" 
            placeholder="Ej: Elden Ring" 
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
          />
        </div>

        <div className="input-group">
          <label>URL de la Carátula *</label>
          <input 
            type="text" 
            placeholder="https://upload.wikimedia.org/..." 
            value={form.imageUrl} 
            onChange={e => setForm({...form, imageUrl: e.target.value})} 
          />
        </div>

        <div className="input-group full-width">
          <label>Descripción</label>
          <textarea 
            placeholder="Describe brevemente el juego..." 
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})}
          />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>Precio (€)</label>
            <input 
              type="number" 
              placeholder="0.00" 
              value={form.price} 
              onChange={e => setForm({...form, price: e.target.value})} 
            />
          </div>

          <div className="input-group">
            <label>Stock Inicial</label>
            <input 
              type="number" 
              placeholder="0" 
              value={form.stock} 
              onChange={e => setForm({...form, stock: e.target.value})} 
            />
          </div>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Añadir al Catálogo
        </button>
      </div>
    </section>
  );
};