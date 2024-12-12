
import './ProfileCard.css';
import { useNavigate } from 'react-router-dom';
const ProfileCard = ({ imageUrl, profileName, description, id_emprendimiento}) => {
    const navigate = useNavigate();
    const perfilEmprendedor = () => navigate(`/emprendimiento?emprendimiento=${id_emprendimiento}`) 
    return (
        <div className="card-profile">
        <div className="card-profile-image">
            <img src={imageUrl} alt="Foto de perfil"/>
        </div>
        <div className="card-profile-content">
            <h3 className="card-profile-title">{profileName}</h3>
            <p className="card-profile-description">
            {description}
            </p>
            <button onClick={perfilEmprendedor} className="card-profile-button">Visitar Perfil</button>
        </div>
    </div>
    )
}

export default ProfileCard;