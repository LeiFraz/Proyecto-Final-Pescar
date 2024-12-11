import React, { useState } from "react";
import "../CompanyUserProfile/CompanyUserProfile.css";

function CompanyUserProfile() {
  const initialSidebarTexts = ["Name Marca", "Descripción de Marca", "Ubicación", "Contacto"];
  
  // Estado para los textos del sidebar
  const [sidebarTexts, setSidebarTexts] = useState(initialSidebarTexts);
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado para la foto de perfil
  const [profilePic, setProfilePic] = useState("/path-to-image/profile-pic-placeholder.png");
  
  // Estado para los productos
  const [products, setProducts] = useState(Array(0).fill({
    name: "Nombre Producto",
    description: "Descripción / Precio",
    image: "/path-to-image/placeholder-image.png",
  }));
  
  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);
  
  // Número máximo de productos por página
  const productsPerPage = 6;

  // Calcular el índice de los productos que se mostrarán
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const handlePageChange = (direction) => {
    if (direction === "next" && indexOfLastProduct < products.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Agregar un nuevo producto
  const handleAddProduct = () => {
    const newProduct = {
      name: "Nuevo Producto",
      description: "Nueva Descripción / Precio",
      image: "/path-to-image/placeholder-image.png",
    };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Eliminar un producto
  const handleDeleteProduct = (indexToDelete) => {
    setProducts((prevProducts) => prevProducts.filter((_, index) => index !== indexToDelete));
  };

  // Manejar cambios en los textos del sidebar
  const handleSidebarTextChange = (index, newValue) => {
    setSidebarTexts((prevTexts) => prevTexts.map((text, i) => (i === index ? newValue : text)));
  };

  // Alternar entre modo de edición y visualización
  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  //subir foto perfil
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="profile-pic">
          <img src={profilePic} alt="Perfil" className="profile-pic" />
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="profile-pic-input"
            />
          </div>
          {sidebarTexts.map((text, index) => (
            <div key={index} className="sidebar-item">
              {isEditing ? (
                <input
                  type="text"
                  value={text}
                  onChange={(e) => handleSidebarTextChange(index, e.target.value)}
                  className="sidebar-input"
                />
              ) : (
                <button className="sidebar-btn">{text}</button>
              )}
            </div>
          ))}
          <button className="edit-profile-btn" onClick={toggleEditing}>
            {isEditing ? "Guardar Cambios" : "Editar Perfil"}
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <button className="add-product-btn" onClick={handleAddProduct}>
            Agregar Nuevo Producto
          </button>
          <div className="product-grid">
            {currentProducts.map((product, index) => (
              <div key={index} className="product-card">
                <img src={product.image} alt="Producto" />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <button
                  className="delete-product-btn"
                  onClick={() => handleDeleteProduct(index + indexOfFirstProduct)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="pagination-info">
              Página {currentPage} de {Math.ceil(products.length / productsPerPage)}
            </span>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange("next")}
              disabled={indexOfLastProduct >= products.length}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyUserProfile;
