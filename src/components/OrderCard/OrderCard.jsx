
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OrderCard.module.css';

const obtenerPublicacion = async (setPublicacion, id_publicacion) => {
    try {
        // Realizar la solicitud GET
        const response = await axios.get(`http://localhost:5000/api/publicacion/${id_publicacion}`);
        
        console.log(response)
        const pubData = {
            nombre: response.data.nombre,
            imagen: response.data.imagenes[0]
        };
        console.log(pubData)
        setPublicacion(pubData);
    } catch (error) {
        console.error('Error al obtener el publicacion:', error);
    }
};

const OrderCard = ({id_publicacion, cantidad, precio}) => {
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
      const [publicacion, setPublicacion] = useState({ nombre: '', imagen: '' });
    useEffect(() => {
        obtenerPublicacion(setPublicacion, id_publicacion)
    }, []);
    return (
        <div className={styles.postCardContainer}>
            <div className={styles.postCard}>
                {publicacion.imagen && <img src={publicacion.imagen} alt="Product" className={styles.postProductImage}/>}
                <div className={styles.orderInfo}>
                <div className={styles.postInfo}>
                    {publicacion.nombre && <h2>{publicacion.nombre}</h2>}
                    <div className={styles.postPriceContainer}>
                            {precio && <p className={styles.postCurrentPrice}>{formatPrice(precio)}</p>}
                    </div>
                </div>
                <span className={styles.cantidad}>{cantidad}</span>
                </div>
            </div>
        </div>
    )
}

export default OrderCard;