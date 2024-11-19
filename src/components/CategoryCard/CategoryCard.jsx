
import { Link } from 'react-router-dom';
import './CategoryCard.css';
const CategoryCard = ({ imageUrl, categoryName}) => {

    return (
        <Link href="">
            <div className="card-category">
                <img src={imageUrl} alt="Imagen" className="card-image"/>
                <p className="card-text">{categoryName}</p>
            </div>
        </Link>
    )
}

export default CategoryCard;