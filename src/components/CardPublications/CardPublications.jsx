
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CardPublications.module.css';
const obtenerEmprendimiento = async (setEmprendimiento, id_emprendimiento) => {
    try {
        // Realizar la solicitud GET
        const response = await axios.get(`https://grow-backend.up.railway.app/api/emprendimiento/${id_emprendimiento}`);
        
        console.log(response)
        const emprendimientoData = {
            id: response.data._id,
            nombre: response.data.nombre_emprendimiento
        };
        console.log(emprendimientoData)
        setEmprendimiento(emprendimientoData);
    } catch (error) {
        console.error('Error al obtener el emprendimiento:', error);
    }
};

const CardPublications = ({ nombre, precioActual,precioOriginal, descuento, imagen, id_emprendimiento, id_publicacion, transparentPrice}) => {
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
    const [emprendimiento, setEmprendimiento] = useState(null)
    const color = transparentPrice ? '#1D7A66' : '#000';
    useEffect(() => {
        obtenerEmprendimiento(setEmprendimiento, id_emprendimiento);
            
    }, []);
    const [hoverCard, setHoverCard] = useState(false);
    const [hoverLink, setHoverLink] = useState(false);
    return (
        <div className={styles.postCardContainer} 
        onMouseEnter={() => setHoverCard(true)}
        onMouseLeave={() => setHoverCard(false)}>
            <a href={`/publicacion?publicacion=${id_publicacion}`} className={styles.cardLink}><div className={styles.postCard}>
                <img src={imagen} alt="Product" className={styles.postProductImage}/>
                <div className={styles.postInfo}>
                <h2
        className={`${styles.postTitle} ${
            hoverCard && !hoverLink ? styles.greenText : styles.blackText
        }`}
    >
            {nombre}
        </h2>
        <div
            className={styles.entrepreneurName}
            onMouseEnter={() => {
                console.log("Mouse entered link");
                setHoverLink(true);
            }}
            onMouseLeave={() => {
                console.log("Mouse left link");
                setHoverLink(false);
            }}
        >
            {emprendimiento && (
                <a
                    href={`/emprendimiento?emprendimiento=${id_emprendimiento}`}
                    className={`${styles.profileLink} ${
                        hoverLink ? styles.greenText : styles.blackText
                    }`}
                >
                    <p className={styles.profileName}>{emprendimiento.nombre}</p>
                </a>
            )}
        </div>
                    <div className={styles.postPriceContainer}>
                        {precioActual > 0 && <p style={{color}} className={styles.postCurrentPrice}>{formatPrice(precioActual)}</p>}{transparentPrice && <img className={styles.verifiedPrice} src="/img/transparentprice.png" alt="" />}
                        {precioActual == 0 && <p className={styles.noPrice}>{formatPrice("A convenir")}</p>}
                        {precioOriginal && <p className={styles.postOriginalPrice}>{formatPrice(precioOriginal)}</p>}
                        {descuento>0 && <p className={styles.postDiscount}>{descuento}% OFF</p>}
                    </div>
                </div>
            </div></a>
        </div>
    )
}

export default CardPublications;