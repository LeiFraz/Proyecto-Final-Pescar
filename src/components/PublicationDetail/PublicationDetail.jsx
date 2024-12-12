import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';
import { Link } from 'react-router-dom';
import styles from './PublicationDetail.module.css';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import { useCart } from "../../common/CartContext";
import ModalLoading from '../Modals/ModalLoading';
const obtenerMateriales = async (setMateriales, id_publicacion) => {
  try {
    // Obtener los materiales usados
    const response = await axios.get(`http://localhost:5000/api/materialusado/${id_publicacion}`);
    const materialesData = response.data;

    // Para cada material, obtener el nombre desde la API
    const materialesConNombre = await Promise.all(
      materialesData.map(async (material) => {
        try {
          // Hacer una solicitud para obtener el material por id_material
          const materialResponse = await axios.get(`http://localhost:5000/api/material/${material.id_material}`);
          return { ...material, nombre: materialResponse.data.nombre }; // Agregar el nombre
        } catch (error) {
          console.error(`Error al obtener el material con ID ${material.id_material}:`, error);
          return { ...material, nombre: 'Desconocido' }; // En caso de error, asignar un nombre por defecto
        }
      })
    );

    // Establecer los materiales con nombre en el estado
    setMateriales(materialesConNombre);
  } catch (error) {
    console.error('Error al obtener los materiales usados:', error);
  }
};
const obtenerEmprendimiento = async (setEmprendimiento, id_emprendimiento) => {
  
  try {
      // Realizar la solicitud GET
      const response = await axios.get(`http://localhost:5000/api/emprendimiento/${id_emprendimiento}`);
      
      const empData = response.data
      console.log(empData)
      setEmprendimiento(empData.nombre_emprendimiento);
  } catch (error) {
      console.error('Error al obtener el emprendimiento:', error);
  }
};
const PublicationDetail = ({ images, productName, originalPrice, discount, description, transparentPrice, id_publicacion, profit, id_emprendimiento }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [orderId, setOrderId] = useState("")
  const [nombreEmprendimiento, setEmprendimiento] = useState();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    price: 0,
    quantity: 1,
    image: '',
    id: '',
  });
  const [sentProduct, setSentProduct] = useState([])
  const { addToCart } = useCart();
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
  const openModal = () => setIsOpened(true);
  const closeModal = () => setIsOpened(false);
  const calculateCurrentPrice = (originalPrice, discount) => {
    if (discount && discount > 0 && discount < 100) {
      return originalPrice - (discount / 100 * originalPrice);
    }
    return originalPrice;
  };

  const currentPrice = calculateCurrentPrice(originalPrice, discount);
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    setProduct({
      title: productName,
      price: currentPrice,
      quantity: 1,
      image: images[0],
      id: id_publicacion,
    });
  }, [productName, currentPrice, images, id_publicacion]);
  useEffect(() => {
    console.log("Product updated:", product);
    setSentProduct({
      id_publicacion: product.id,
      cantidad: product.quantity,
      precio: product.price,
    });
  }, [product]);
  
  const color = transparentPrice ? '#1D7A66' : '#000';

  // Manejar el clic en el título
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const obtenerCantidad = (cantidad, unidad) => {
    if (unidad) {
        switch(unidad) {
            case 'kg':
                cantidad = cantidad / 1000;
                break;
            case 'l':
                cantidad = cantidad / 1000;
                break;
            case 'm':
                cantidad = cantidad / 100;
                break;
            default:
                cantidad = cantidad;
        }   
    }
    return `${cantidad} ${unidad}`;
};

  const totalPrice = materiales.reduce((acc, material) => acc + material.precio, 0);
  useEffect(() => {
    obtenerMateriales(setMateriales,id_publicacion);
    obtenerEmprendimiento(setEmprendimiento,id_emprendimiento);
}, []);


useEffect(() => {
  if (contentRef.current) {
    if (isOpen) {
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`; // Ajusta la altura al contenido
    } else {
      contentRef.current.style.height = "0px"; // Oculta el contenido
    }
  }
}, [isOpen]);
  const handleSubmitOrder = async () => {
    const userId = localStorage.getItem("userId");
    console.log(sentProduct)
    const formData = {
      id_usuario: userId,
      publicaciones: [sentProduct],
      precio_total: sentProduct.precio * sentProduct.cantidad
    };
    setIsLoading(true);
    setIsOpened(true);
    try {
      const response = await axios.post('http://localhost:5000/api/orden/crear', formData);
      console.log('Orden creada exitosamente.');
      console.log(response)
      setOrderId(response.data._id);
      setIsLoading(false);
      openModal();
    } catch (error) {
      console.error('Error al crear la orden:', error);
      alert('Hubo un error al crear la orden.');
    }
  };
  const handleAccept = () => {
    closeModal();
    navigate(`/orden?orden=${orderId}`);
};

  return (
    <div className={styles.mainContainer}>
      <ModalLoading isOpen={isOpened} isLoading={isLoading} text={'Se realizó el pago'} loadingText={"Procesando pago..."}>
                {!isLoading && <button className='btn btn-success' onClick={handleAccept}>Aceptar</button>}
      </ModalLoading>
    <div className={styles.detailContainer}>
      {/* Slider de Imágenes */}
      <div className={styles.imageSlider}>
        <Swiper className={styles.swiperContainer}
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Product image ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <section className={styles.descriptionContainer}>
            <h2 className={styles.description}>Descripción</h2>
            <hr />
            <p className={styles.productDescription}>
            {description}
            </p>
        </section>
      </div>

      {/* Información del Producto */}
      <div className={styles.productInfo}>
        <h1 className={styles.productName}>{productName}</h1>
        <p>Vendido por: <Link to={`/emprendimiento?emprendimiento=${id_emprendimiento}`}>{nombreEmprendimiento}</Link></p>
        <div className={styles.priceContainer}>
        {discount > 0 && (
            <div className={styles.discountContainer}>
              <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>
              <span className={styles.discount}>{discount}% OFF</span>
            </div>
          )}
          <div className={styles.currentPriceContainer}>
            <span style={{ color }} className={styles.currentPrice}>{formatPrice(currentPrice)}</span> 
            {transparentPrice && <div
            className={styles.tooltipContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img 
            className={styles.verifiedPrice} 
            src="/img/transparentprice.png" alt="" 
            />
            {isHovered && <div className={styles.tooltipText}>Este precio está verificado por <strong className={styles.strongColor}>precios transparentes</strong></div>}
            </div>}
          </div>
          
          
        </div>
        {transparentPrice && <div className={styles.transparentContainer}>
      {/* Título del contenedor */}
      <div 
        className={styles.transparentHeader} 
        onClick={toggleOpen}
      >
        Precio transparente
        {/* Icono o indicador */}
        <span className={styles.transparentIcon}>{isOpen ? '▲' : '▼'}</span>
      </div>
      
      {/* Contenido que se despliega */}
      {isOpen && (
        <ul className={styles.transparentContent}>
          {materiales.map((material) => (
            <li key={material.id}>
              {obtenerCantidad(material.cantidad_usada, material.unidad_original)} de {material.nombre}: ${material.precio}
            </li>
          ))}
          <hr />
          <li key="total">Precio de fabricación: {formatPrice(totalPrice)}</li>
          <hr />
          <li key="ganancia">Ganancia: {formatPrice(profit)}</li>
          <hr />
          {!originalPrice && <li key="final">Precio final: {formatPrice(currentPrice)}</li>}
          {originalPrice && <li key="final">Precio final: {formatPrice(originalPrice)}</li>}
          {originalPrice && discount>0 && <hr/>}
          {originalPrice && discount>0 && <li key="final">Precio final con descuento: {formatPrice(currentPrice)}</li>}
        </ul>
      )}
    </div>}
        {currentPrice > 0 && <div className={styles.quantityContainer}>
          <label htmlFor="quantity">Cantidad</label>
          <QuantitySelector
            initialQuantity={1}
            min={1}
            max={10}
            onChange={(newQuantity) => {
              setProduct((prevProduct) => ({
                ...prevProduct,
                quantity: newQuantity,
              }));
            }}
          />
        </div>}
        {currentPrice > 0 && <button onClick={handleSubmitOrder} className={styles.buyButton}>Comprar ahora</button>}
        {currentPrice > 0 && <button onClick={() => addToCart(product)} className={styles.cartButton}>Agregar al carrito</button>}
        {currentPrice === 0 && <button className={styles.cartButton}>Contactar al vendedor</button>}
      </div>
      
    </div>
    </div>
  );
};

export default PublicationDetail;

