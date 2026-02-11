import React, { useState, useEffect } from "react";
import { productService } from "../../services/productService";
import { AuthButton } from "../misc/AuthButton"; 
import { useToast } from "../../components/misc/ToastContext";
import type { Product } from "../../types/Product";
import "./AddProductForm.css";

interface AddProductFormProps {
  onProductAdded: (newProduct: Product) => void;
  initialData?: Product; 
  isEditing?: boolean;
}

export const AddProductForm = ({ onProductAdded, initialData, isEditing }: AddProductFormProps) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false); // Gestión de estado de carga
  
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: ""
  });

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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Validación básica antes de enviar
    if (!form.name || !form.price || !form.imageUrl) {
      return showToast("Por favor, rellena los campos obligatorios.", "error");
    }

    setLoading(true); // Iniciamos carga

    try {
      const productPayload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        imageUrl: form.imageUrl
      };

      let savedProduct: Product;

      if (isEditing && initialData) {
        // Operación de Update
        savedProduct = await productService.update(initialData.id, {
          ...productPayload,
          id: initialData.id
        } as Product);
        showToast("¡Videojuego actualizado correctamente!", "success");
      } else {
        // Operación de Create
        savedProduct = await productService.create(productPayload);
        showToast("¡Nuevo videojuego añadido al catálogo!", "success");
      }

      onProductAdded(savedProduct);
      
      if(!isEditing) {
        setForm({ name: "", description: "", price: "", stock: "", imageUrl: "" });
      }
      
    } catch (error) {
      console.error("Error:", error);
      showToast("Hubo un fallo en la conexión con el servidor.", "error");
    } finally {
      setLoading(false); // Finalizamos carga
    }
  };

  return (
    <section className="admin-form-section">
      <h2 className="section-title">{isEditing ? "🔧 Editar Juego" : "🚀 Nuevo Juego"}</h2>
      <div className="form-grid">
        <div className="input-group">
          <label>Nombre *</label>
          <input 
            type="text" 
            placeholder="Ej: Elden Ring"
            value={form.name} 
            onChange={e => setForm({...form, name: e.target.value})} 
            disabled={loading}
          />
        </div>
        <div className="input-group">
          <label>URL Imagen *</label>
          <input 
            type="text" 
            placeholder="https://..."
            value={form.imageUrl} 
            onChange={e => setForm({...form, imageUrl: e.target.value})} 
            disabled={loading}
          />
        </div>
        <div className="input-group full-width">
          <label>Descripción</label>
          <textarea 
            placeholder="Breve resumen del juego..."
            value={form.description} 
            onChange={e => setForm({...form, description: e.target.value})} 
            disabled={loading}
          />
        </div>
        <div className="input-row">
          <div className="input-group">
            <label>Precio (€) *</label>
            <input 
              type="number" 
              value={form.price} 
              onChange={e => setForm({...form, price: e.target.value})} 
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <label>Stock *</label>
            <input 
              type="number" 
              value={form.stock} 
              onChange={e => setForm({...form, stock: e.target.value})} 
              disabled={loading}
            />
          </div>
        </div>

        <AuthButton 
          label={loading ? "PROCESANDO..." : (isEditing ? "GUARDAR CAMBIOS" : "CREAR PRODUCTO")} 
          onClick={handleSubmit}
          className="auth-btn-full"
          disabled={loading}
        />
      </div>
    </section>
  );
};