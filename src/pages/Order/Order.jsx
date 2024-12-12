import style from "./Order.module.css"
import OrderCard from "../../components/OrderCard/OrderCard";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
const obtenerPublicacion = async (orden, setOrderData) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/orden/${orden}`);
        const ordenData = response.data;
        setOrderData(ordenData); // Guarda todo el resultado de la API
    } catch (error) {
        console.error('Error al obtener la orden:', error);
    }
};
const Order = () => {
    const location = useLocation(); // Usa el hook en la raíz del componente
    const [orderData, setOrderData] = useState(null); // Cambia a un estado genérico
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
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const orden = params.get('orden');
        if (orden) {
            obtenerPublicacion(orden, setOrderData);
        }
    }, [location]);
    return (
        <div className={style.mainContainer}>
            <div className={style.containerOrder}>
                {orderData && <h2 className={style.orderNumber}>Nro de orden: {orderData._id}</h2>}
                <div className={style.postList}>
                {orderData && orderData.publicaciones.map((pub) => (
                        <OrderCard
                        id_publicacion={pub.id_publicacion}
                        cantidad={pub.cantidad}
                        precio={pub.precio}
                        />
                ))}
                </div>
                {orderData  && <h2 className={style.totalPrice}>Precio total: {formatPrice(orderData.precio_total)}</h2>}
            </div>
        </div>
    );
};

export default Order;