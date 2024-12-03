
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CardPublications.module.css';
const obtenerEmprendimiento = async (setEmprendimiento, id_emprendimiento) => {
    try {
        // Realizar la solicitud GET
        const response = await axios.get(`http://localhost:5000/api/emprendimiento/${id_emprendimiento}`);
        
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

const CardPublications = ({ nombre, precioActual,precioOriginal, descuento, imagen, id_emprendimiento}) => {
    const formatPrice = (price) => `$ ${price.toLocaleString()}`
    const [emprendimiento, setEmprendimiento] = useState(null)
    useEffect(() => {
        obtenerEmprendimiento(setEmprendimiento, id_emprendimiento);
            
    }, []);
    const [hoverCard, setHoverCard] = useState(false);
    const [hoverLink, setHoverLink] = useState(false);
    return (
        <div className={styles.postCardContainer} 
        onMouseEnter={() => setHoverCard(true)}
        onMouseLeave={() => setHoverCard(false)}>
            <a href="" className={styles.cardLink}><div className={styles.postCard}>
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
                    href=""
                    className={`${styles.profileLink} ${
                        hoverLink ? styles.greenText : styles.blackText
                    }`}
                >
                    <p className={styles.profileName}>{emprendimiento.nombre}</p>
                </a>
            )}
        </div>
                    <div className={styles.postPriceContainer}>
                        {precioActual > 0 && <p className={styles.postCurrentPrice}>{formatPrice(precioActual)}</p>}
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