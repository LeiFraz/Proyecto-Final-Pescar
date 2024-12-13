// UserProfile.js
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import axios from "axios";
import ProfileOrderCard from "../../components/ProfileOrderCard/ProfileOrderCard";
const obtenerUsuario = async (id_usuario, setUsuario) => {
  
  try {
      // Realizar la solicitud GET
      const response = await axios.get(`https://grow-backend.up.railway.app/api/usuario/${id_usuario}`);
      
      const usData = response.data
      console.log(usData)
      setUsuario(usData);
  } catch (error) {
      console.error('Error al obtener el publicacion:', error);
  }
};
const obtenerCompras = async (id_usuario, setCompras) => {
  try{
  const response = await axios.get(`https://grow-backend.up.railway.app/api/orden/usuario/${id_usuario}`);
  const orderData = response.data;
  console.log(orderData)
  setCompras(orderData);
  }
  catch(error){
    console.error('Error al obtener compras:', error);
  }
}
const UserProfile = () => {
  const location = useLocation(); // Usa el hook en la raíz del componente
  const [usuario, setUsuario] = useState(null);
  const [compras, setCompras] = useState(null)
  const id_emprendimiento=localStorage.getItem("entrepreneurId");
  console.log(id_emprendimiento)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const user = params.get('usuario');
    if (user) {
      obtenerUsuario(user, setUsuario);
    }
}, [location]);
useEffect(() => {
  if(usuario && usuario._id === localStorage.getItem("userId")){
    obtenerCompras(usuario._id, setCompras)
  }
}, [usuario]);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/emprendimientos/crearEmprendimiento");
  };
  const paginaEmprendimiento = () =>{
    navigate(`/emprendimiento?emprendimiento=${id_emprendimiento}`);
  }
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
            {usuario && usuario._id === localStorage.getItem("userId") && <span>Agregar foto de perfil</span>}
          </div>
        </div>
        <div className="user-info">
          {usuario && <h2>{usuario.nombre} {usuario.apellido}</h2>}
          {usuario && usuario._id === localStorage.getItem("userId") && <p>Email: {usuario.email}</p>}
          {usuario && usuario._id === localStorage.getItem("userId") && <p>Telefono: {usuario.telefono}</p>}
        </div>
        <div className="user-actions">
          {usuario && usuario._id === localStorage.getItem("userId") && <button className="btn edit-btn">Cambiar datos</button>}
          {usuario && usuario.rol=="consumidor" && usuario._id === localStorage.getItem("userId") && id_emprendimiento==="" && <button onClick={handleNavigation} className="btn upgrade-btn">Emprender</button>}
          {usuario && usuario.rol=="emprendedor" && usuario._id === localStorage.getItem("userId") && id_emprendimiento!=="" && <button onClick={paginaEmprendimiento} className="btn upgrade-btn">{localStorage.getItem('entrepreneurName')}</button>}
        </div>
      </div>

      {/* Secciones de cards */}
      {usuario && usuario._id === localStorage.getItem("userId") && <div className="extra-section">
        <div className="card-section">
          <h2>Historial de Compras</h2>
          <div className="card-container">
          {compras && compras.map((com) => (
                        <ProfileOrderCard
                        id_orden={com._id}
                        />
          ))}
          </div>
        </div>
      </div>}
    </div>
  );
};

export default UserProfile;
