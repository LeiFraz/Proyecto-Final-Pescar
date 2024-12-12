
import './ProfileCard.css';
const ProfileCard = ({ imageUrl, profileName, description}) => {

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
            <button className="card-profile-button">Visitar Perfil</button>
        </div>
    </div>
    )
}

export default ProfileCard;