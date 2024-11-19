
import { Link } from 'react-router-dom';
import './ProductCard.css';
const ProductCard = ({ imageUrl, productName, profileName, originalPrice, discount }) => {
const formatPrice = (price) => `$ ${price.toLocaleString()}`

const calculateCurrentPrice = (originalPrice, discount) => {
if (discount && discount > 0 && discount < 100) {
    return (originalPrice - (discount / 100 * originalPrice ))
}
return originalPrice;
}

const currentPrice = calculateCurrentPrice(originalPrice, discount)

return (
<div className="large-card">
    <div className="large-card-container">
    <div className="large-card-image-container">
        <img src={imageUrl} alt={productName} className="large-card-image" />
        {discount > 0 && <div className="discount-badge">-{discount}%</div>}
        <div className="hover-overlay">
        <Link href="#" className="overlay-link"></Link>
        <button className="add-to-cart">Añadir al carrito</button>
        <div className="action-buttons">
            <button className="action-button">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
            </svg>
            </button>
            <button className="action-button">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            </button>
        </div>
        </div>
    </div>
    
    <div className="product-info">
        <Link href="#" className="product-link"></Link>
        <h3 className="product-title">{productName}</h3>
        <Link href="#test" className="entrepeneur-name">
        <p>{profileName}</p>
        </Link>
        <div className="price-container">
        <span className="current-price">{formatPrice(currentPrice)}</span>
        {currentPrice && currentPrice!=originalPrice && <span className="original-price">{formatPrice(originalPrice)}</span>}
        </div>
    </div>
    </div>
</div>
)
}

export default ProductCard