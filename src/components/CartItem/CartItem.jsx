
import styles from './CartItem.module.css';
import { useCart } from "../../common/CartContext";

const CartItem = ({ nombre, precioActual, imagen, cantidad, id}) => {
    const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

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

    return (
        <div className={styles.postCardContainer}>
            <div className={styles.postCard}>
                <img src={imagen} alt="Product" className={styles.postProductImage}/>
                <div className={styles.postInfo}>
                    <h2 className={styles.postTitle}>
                        {nombre}
                    </h2>

                    <div className={styles.postPriceContainer}>
                        {<p className={styles.postCurrentPrice}>{formatPrice(precioActual)}</p>}
                        
                    </div>
                    <div className={styles.quantityControls}>
                        <button
                            className={styles.decrementBtn}
                            onClick={() => decrementQuantity(id)}
                        >
                            -
                        </button>
                        <span className={styles.postQuantity}>{cantidad}</span>
                        <button
                            className={styles.incrementBtn}
                            onClick={() => incrementQuantity(id)}
                        >
                            +
                        </button>
                    </div>
                </div>
                <button className={styles.removeBtn} onClick={() => removeFromCart(id)}><i className='icon-trash-empty'></i></button>
            </div>
        </div>
    )
}

export default CartItem;