
import { Link } from 'react-router-dom';
import './CategoryCard.css';
const CategoryCard = ({ imageUrl, categoryName, id}) => {

    return (
        <a href={`/publicaciones?categoria=${id}`}>
            <div className="card-category">
                <img src={imageUrl} alt="Imagen" className="card-image"/>
                <p className="card-text">{categoryName}</p>
            </div>
        </a>
    )
}

export default CategoryCard;