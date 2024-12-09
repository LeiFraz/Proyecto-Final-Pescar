// UserProfile.js
import React from "react";
import CardSection from "./CardSection";
import "./UserProfile.css";

const UserProfile = () => {
  const recentViews = [
    { id: 1, title: "Producto 1", image: "https://via.placeholder.com/100" },
    { id: 2, title: "Producto 2", image: "https://via.placeholder.com/100" },
    { id: 3, title: "Producto 3", image: "https://via.placeholder.com/100" },
  ];

  const favorites = [
    { id: 4, title: "Publicación Favorita 1", image: "https://via.placeholder.com/100" },
    { id: 5, title: "Publicación Favorita 2", image: "https://via.placeholder.com/100" },
  ];

  return (
    <div className="profile-container">
      {/* Perfil del usuario */}
      <div className="user-profile-container">
        <div className="profile-picture-wrapper">
          <img
            src="https://via.placeholder.com/150"
            alt="Foto de perfil"
            className="profile-picture"
          />
          <div className="profile-picture-overlay">
            <span>Agregar foto de perfil</span>
          </div>
        </div>
        <div className="user-info">
          <h2>Federico Zapata</h2>
          <p>DNI: 12345678</p>
          <p>Email: federico@example.com</p>
          <p>Telefono: 1234567890</p>
        </div>
        <div className="user-actions">
          <button className="btn edit-btn">Cambiar datos</button>
          <button className="btn upgrade-btn">Actualizar a cuenta de emprendedor</button>
        </div>
      </div>

      {/* Secciones de cards */}
      <div className="extra-section">
        <CardSection title="Vistos Recientemente" items={recentViews} />
        <CardSection title="Favoritos" items={favorites} />
      </div>
    </div>
  );
};

export default UserProfile;
