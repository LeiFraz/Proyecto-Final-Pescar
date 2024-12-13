
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { useCart } from "../../common/CartContext";
import { useState, useEffect } from 'react';
import axios from 'axios';
const obtenerEmprendimiento = async (id_emprendimiento, setEmprendimiento) => {
    try {
        // Realizar la solicitud GET
        const response = await axios.get(`https://grow-backend.up.railway.app/api/emprendimiento/${id_emprendimiento}`);
        console.log(response)
        // Desestructurar y obtener solo los campos "id" y "nombre" de cada publicación
        const nombre = response.data.nombre_emprendimiento

        // Actualizar el estado con los datos filtrados
        setEmprendimiento(nombre);
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
    }
};
const ProductCard = ({ imageUrl, productName, profileName, originalPrice, discount, id_publicacion, id_emprendimiento, transparentPrice }) => {
    const color = transparentPrice ? '#1D7A66' : '#000';
    const [product, setProduct] = useState([]);
    const [emprendimiento, setEmprendimiento] = useState("")
    const formatPrice = (price) => {
        if(price>0){
          const isInteger = price % 1 === 0; // Verifica si el precio es entero
            const formatter = new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: isInteger ? 0 : 2, // Si es entero, no muestra decimales
            maximumFractionDigits: 2, // Siempre muestra hasta 2 decimales
        });
        return formatter.format(price);
        }
        else{
            return "$ A convenir"
        }
    };
    const { addToCart } = useCart();
        

const calculateCurrentPrice = (originalPrice, discount) => {
if (discount && discount > 0 && discount < 100) {
    return (originalPrice - (discount / 100 * originalPrice ))
}
return originalPrice;
}

useEffect(() => {
    if(!profileName){
        obtenerEmprendimiento(id_emprendimiento, setEmprendimiento)
    }
    }, []);
const currentPrice = calculateCurrentPrice(originalPrice, discount)
product.title=productName;
product.price=currentPrice;
product.quantity=1;
product.image=imageUrl;
product.id=id_publicacion;
return (
<div className="large-card">
    <div className="large-card-container">
    <div className="large-card-image-container">
        <img src={imageUrl} alt={productName} className="large-card-image" />
        {discount > 0 && <div className="discount-badge">-{discount}%</div>}
        <div className="hover-overlay">
        <Link to={`/publicacion?publicacion=${id_publicacion}`} className="overlay-link"></Link>
        {id_emprendimiento && id_emprendimiento!==localStorage.getItem('entrepreneurId') && currentPrice>0 && <button onClick={() => addToCart(product)} className="add-to-cart">Añadir al carrito</button>}
        {id_emprendimiento && id_emprendimiento!==localStorage.getItem('entrepreneurId') && currentPrice==0 && <button className="add-to-cart">Contactar</button>}
        {id_emprendimiento && id_emprendimiento===localStorage.getItem('entrepreneurId') && <button className="add-to-cart">Editar</button>}
        {id_emprendimiento && id_emprendimiento===localStorage.getItem('entrepreneurId') && <button className="delete-post">Eliminar</button>}
        {id_emprendimiento && id_emprendimiento!==localStorage.getItem('entrepreneurId') && <div className="action-buttons">
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
        </div>}
        </div>
    </div>
    
    <div className="product-info">
        <Link to={`/publicacion?publicacion=${id_publicacion}`} className="product-link"></Link>
        <h3 className="product-title">{productName}</h3>
        <Link to={`/emprendimiento?emprendimiento=${id_emprendimiento}`} className="entrepeneur-name">
        {profileName && <p>{profileName}</p>}
        {emprendimiento && <p>{emprendimiento}</p>}
        </Link>
        <div className="price-container">
        {currentPrice>0 && <span style={{color}} className="current-price">{formatPrice(currentPrice)}</span>}{transparentPrice && <img className={'verified-price'} src="/img/transparentprice.png" alt="" />}
        {currentPrice==0 && <span className="current-price">$ A convenir</span>}
        {currentPrice>0 && currentPrice!=originalPrice && <span className="original-price">{formatPrice(originalPrice)}</span>}
        </div>
    </div>
    </div>
</div>
)
}

export default ProductCard