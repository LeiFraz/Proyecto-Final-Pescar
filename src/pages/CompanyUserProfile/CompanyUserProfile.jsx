import React, { useState, useEffect } from "react";
import "../CompanyUserProfile/CompanyUserProfile.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ProductCard from "../../components/ProductCard/ProductCard";
const obtenerEmprendimiento = async (emp, setEmprendimiento, setSidebarTexts, setProfilePic) => {
  
  try {
      // Realizar la solicitud GET
      const response = await axios.get(`https://grow-backend.up.railway.app/api/emprendimiento/${emp}`);
      
      const empData = response.data
      console.log(empData)
      setEmprendimiento(empData);
      setSidebarTexts([empData.nombre_emprendimiento, empData.descripcion]);
      setProfilePic(empData.foto_perfil);
  } catch (error) {
      console.error('Error al obtener el emprendimiento:', error);
  }
};

const obtenerPublicaciones = async (emp, setPublicaciones) => {
  
  try {
      // Realizar la solicitud GET
      const response = await axios.get(`https://grow-backend.up.railway.app/api/publicacion/emprendedor/${emp}`);
      
      const pubData = response.data
      console.log(pubData)
      setPublicaciones(pubData);
  } catch (error) {
      console.error('Error al obtener el emprendimiento:', error);
  }
};
function CompanyUserProfile() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation(); // Usa el hook en la raíz del componente
  const [emprendimiento, setEmprendimiento] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const initialSidebarTexts = ["Name Marca", "Descripción de Marca",];
  const [sidebarTexts, setSidebarTexts] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  useEffect(() => {
      const params = new URLSearchParams(location.search);
      const emp = params.get('emprendimiento');
      if (emp) {
        obtenerEmprendimiento(emp, setEmprendimiento, setSidebarTexts,setProfilePic);
        obtenerPublicaciones(emp, setPublicaciones)
      }
  }, [location]);
  // Estado para los textos del sidebar
  
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado para la foto de perfil

  
  // Estado para los productos
  const [products, setProducts] = useState(Array(0).fill({
    name: "Nombre Producto",
    description: "Descripción / Precio",
    image: "/path-to-image/placeholder-image.png",
  }));
  
  // Estado para la página actual
  
  // Número máximo de productos por página
  const productsPerPage = 6;

  // Calcular el índice de los productos que se mostrarán
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página

  // Agregar un nuevo producto
  const handleAddProduct = () => {
    navigate('/publicaciones/crearPublicacion');
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

// Número máximo de publicaciones por página
const publicationsPerPage = 6;

// Calcular el índice de las publicaciones que se mostrarán
const indexOfLastPublication = currentPage * publicationsPerPage;
const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
const currentPublications = publicaciones.slice(indexOfFirstPublication, indexOfLastPublication);

// Cambiar de página
const handlePageChange = (direction) => {
  if (direction === "next" && indexOfLastPublication < publicaciones.length) {
    setCurrentPage((prevPage) => prevPage + 1);
  } else if (direction === "prev" && currentPage > 1) {
    setCurrentPage((prevPage) => prevPage - 1);
  }
};

  return (
    <>
      <div className="container-entrepreneur-profile">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="profile-pic">
          <img src={profilePic} alt="Perfil" className="profile-pic" />
          {emprendimiento && emprendimiento._id === localStorage.getItem("entrepreneurId") && (
            
          
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="profile-pic-input"
            />
          )}
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
          {emprendimiento && emprendimiento._id===localStorage.getItem('entrepreneurId') && <button className="edit-profile-btn" onClick={toggleEditing}>
            {isEditing ? "Guardar Cambios" : "Editar Perfil"}
          </button>}
        </div>



        {/* Main Content */}
        <div className="main-content">
          {emprendimiento && emprendimiento._id === localStorage.getItem("entrepreneurId") && (
            <h2>Tus publicaciones</h2>
          )}
          {emprendimiento && emprendimiento._id !== localStorage.getItem("entrepreneurId") && (
            <h2>Publicaciones</h2>
          )}
          {emprendimiento && emprendimiento._id === localStorage.getItem("entrepreneurId") && (
            <button className="add-product-btn" onClick={handleAddProduct}>
              Crear publicación
            </button>
          )}
          <div className="product-grid">
            {emprendimiento && currentPublications.map((pub) => (
              <ProductCard
                key={pub._id}
                id_publicacion={pub._id}
                imageUrl={pub.imagenes[0]}
                productName={pub.nombre}
                profileName={emprendimiento.nombre_emprendimiento}
                originalPrice={pub.precio_original || pub.precio_actual}
                discount={pub.descuento}
                id_emprendimiento={pub.id_emprendimiento}
              />
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
              Página {currentPage} de {Math.ceil(publicaciones.length / publicationsPerPage)}
            </span>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange("next")}
              disabled={indexOfLastPublication >= publicaciones.length}
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
