// Modifica el return de tu TiendaPage
return (
  <div className="admin-layout"> {/* Nuevo contenedor flex */}
    <Sidebar role={user?.role} onLogout={handleLogout} />
    
    <main className="main-content">
      <Header 
        title={user?.role === "admin" ? "Panel de Control" : "Tienda de Juegos"} 
        userName={user?.name} 
        onLogout={handleLogout} 
      />

      <div className="content-container">
        {user?.role === "admin" ? (
          <>
            <AddProductForm onProductAdded={handleProductAdded} />
            <AdminTable products={products} onDelete={handleDelete} />
          </>
        ) : (
          <div className="products-grid">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  </div>
);