import NavBar from "../../common/navBar"
import "../components/CompanyUserProfile/CompanyUserProfile.css";

function CompanyUserProfile(){

    return (
        <>
            <NavBar/>
            <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="profile-pic">
            <img src="/path-to-image/profile-pic-placeholder.png" alt="Perfil" />
          </div>
          <button className="sidebar-btn">Name Marca</button>
          <button className="sidebar-btn">Descripción de Marca</button>
          <button className="sidebar-btn">Ubicación</button>
          <button className="sidebar-btn">Contacto</button>
          <button className="sidebar-btn">Editar Perfil</button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <button className="add-product-btn">Agregar Nuevo Producto</button>
          <div className="product-grid">
            <div className="product-card">
              <img src="/path-to-image/placeholder-image.png" alt="Producto" />
              <h3>Nombre Producto</h3>
              <p>Descripción / Precio</p>
            </div>
            <div className="product-card">
              <img src="/path-to-image/placeholder-image.png" alt="Producto" />
              <h3>Nombre Producto</h3>
              <p>Descripción / Precio</p>
            </div>
            {/* Añadir más productos si es necesario */}
          </div>
        </div>
      </div>
        </>
    )
}
export default CompanyUserProfile;