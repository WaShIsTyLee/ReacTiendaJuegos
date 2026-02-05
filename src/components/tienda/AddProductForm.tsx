import { useState, useEffect } from "react";
// 1. Importamos el servicio que usa Axios
import { productService } from "../../services/productService";
import type { Product } from "../../types/Product";
import "./AddProductForm.css";

interface AddProductFormProps {
  onProductAdded: (newProduct: Product) => void;
  initialData?: Product; 
  isEditing?: boolean;
}

export const AddProductForm = ({ onProductAdded, initialData, isEditing }: AddProductFormProps) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: ""
  });

  // Rellenar el formulario si estamos editando
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        description: initialData.description || "",
        price: initialData.price.toString(),
        stock: initialData.stock.toString(),
        imageUrl: initialData.imageUrl
      });
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.imageUrl) {
      return alert("Por favor, rellena los campos obligatorios.");
    }

    try {
      // Preparamos los datos convirtiendo a número
      const productData = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      };

      let savedProduct: Product;

      if (isEditing && initialData) {
        // 2. USAMOS AXIOS PARA ACTUALIZAR (PUT)
        savedProduct = await productService.update(initialData.id, {
          ...productData,
          id: initialData.id
        } as Product);
      } else {
        // 3. USAMOS AXIOS PARA CREAR (POST)
        savedProduct = await productService.create(productData as Omit<Product, "id">);
      }

      // Notificamos al padre (TiendaPage) para que actualice el estado global
      onProductAdded(savedProduct);
      
      if(!isEditing) {
        setForm({ name: "", description: "", price: "", stock: "", imageUrl: "" });
      }
      
      alert(isEditing ? "¡Producto actualizado correctamente!" : "¡Producto creado!");
      
    } catch (error) {
      console.error("Error al procesar el producto:", error);
      alert("Error al guardar los datos en el servidor.");
    }
  };

  return (
    <section className="admin-form-section">
      <h2 className="section-title">{isEditing ? "🔧 Editar Juego" : "🚀 Nuevo Juego"}</h2>
      <div className="form-grid">
        <div className="input-group">
          <label>Nombre</label>
          <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </div>
        <div className="input-group">
          <label>URL Imagen</label>
          <input type="text" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
        </div>
        <div className="input-group full-width">
          <label>Descripción</label>
          <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>Precio (€)</label>
            <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
          </div>
          <div className="input-group">
            <label>Stock</label>
            <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
          </div>
        </div>
        <button className="submit-btn" onClick={handleSubmit}>
          {isEditing ? "GUARDAR CAMBIOS" : "CREAR PRODUCTO"}
        </button>
      </div>
    </section>
  );
};