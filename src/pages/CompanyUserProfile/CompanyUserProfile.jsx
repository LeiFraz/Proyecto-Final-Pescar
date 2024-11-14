import NavBar from "../../common/NavBar/NavBar";
import "../CompanyUserProfile/CompanyUserProfile.css";

function CompanyUserProfile() {
  const sidebarButtons = ["Name Marca", "Descripción de Marca", "Ubicación", "Contacto", "Editar Perfil"];
  const products = Array(9).fill({ name: "Nombre Producto", description: "Descripción / Precio", image: "/path-to-image/placeholder-image.png" });

  return (
    <>
      <NavBar />
      <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="profile-pic">
            <img src="/path-to-image/profile-pic-placeholder.png" alt="Perfil" />
          </div>
          {sidebarButtons.map((text, index) => (
            <button key={index} className="sidebar-btn">{text}</button>
          ))}
        </div>

        {/* Main Content */}
        <div className="main-content">
          <button className="add-product-btn">Agregar Nuevo Producto</button>
          <div className="product-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <img src={product.image} alt="Producto" />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyUserProfile;