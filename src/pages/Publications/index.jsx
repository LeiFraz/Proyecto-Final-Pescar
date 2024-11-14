import React from 'react';
import './style.css';

const Header = () => (
  <header className="header">
    <nav className="menu">
      <a href="#grow"><img src="Grow Logo.png" alt="Grow Logo" /></a>
      <a href="#inicio">Inicio</a>
      <a href="#productos">Productos</a>
      <a href="#servicios">Servicios</a>
      <a href="#busquedas">Busquedas</a>
      <a href="#sesion">Iniciar sesión</a>
      <a href="#resgistro">Registrarse</a>
    </nav>
  </header>
);

const Filters = () => (
  <div className="filtros">
    <h4 className="espaciar-filtro">
      Filtrar <img src="filtro-icono.png" alt="Filtro" />
    </h4>
    <h4 className="espaciar-filtro">
      Mostrar
      <form>
        <input type="number" min="1" max="10" step="1" value="1" />
      </form>
    </h4>
    <h4 className="espaciar-filtro">
      de
      <form>
        <input type="text" />
      </form>
    </h4>
  </div>
);

const Product = ({ name, description, price, image }) => (
  <div className="producto">
    <img src={image} alt={name} className="producto-img" />
    <h2>{name}</h2>
    <h5 className="tenue">{description}</h5>
    <h3>${price}</h3>
  </div>
);

const Products = () => (
  <div className="contenedor-productos">
    <div className="productos">
      <Product name="Remera" description="Classic Fit Tee" price="10.000" image="remera.png" />
      <Product name="Remera" description="Classic Fit Tee" price="10.000" image="remera.png" />
      <Product name="Remera" description="Classic Fit Tee" price="10.000" image="remera.png" />
      <Product name="Remera" description="Classic Fit Tee" price="10.000" image="remera.png" />
    </div>
  </div>
);

const Service = ({ name, description, price, image }) => (
  <div className="servicio">
    <img src={image} alt={name} className="servicio-img" />
    <h2>{name}</h2>
    <h5 className="tenue">{description}</h5>
    <h3>${price}</h3>
  </div>
);

const Services = () => (
  <div className="servicios">
    <Service name="Asesorias" description="Expert Guidance" price="15.000" image="servicio.webp" />
    <Service name="Asesorias" description="Expert Guidance" price="15.000" image="servicio.webp" />
    <Service name="Asesorias" description="Expert Guidance" price="15.000" image="servicio.webp" />
    <Service name="Asesorias" description="Expert Guidance" price="15.000" image="servicio.webp" />
  </div>
);

const Footer = () => (
  <footer>
    <div className="grow">
      <h2>GROW</h2>
      <a href="#nosotros">Nosotros</a>
      <a href="#afiliados">Afiliados</a>
    </div>

    <div className="ayuda">
      <h2>Ayuda</h2>
      <a href="#preguntas">Preguntas</a>
      <a href="#ventas">Ventas</a>
      <a href="#compras">Compras</a>
    </div>

    <div className="tienda">
      <h2>Tienda</h2>
      <a href="#productos">Productos</a>
      <a href="#servicios">Servicios</a>
      <a href="#emprendimientos">Emprendimientos</a>
    </div>

    <div className="redes">
      <h2>Redes sociales</h2>
      <div className="social">
        <a className="whatsapp" href="https://web.whatsapp.com/" title="Nuestro Whatsapp" target="_blank" rel="noopener noreferrer"></a>
        <a href="https://www.facebook.com/" className="facebook" title="Nuestro Facebook" target="_blank" rel="noopener noreferrer"></a>
        <a href="https://www.instagram.com/" className="instagram" title="Nuestro Instagram" target="_blank" rel="noopener noreferrer"></a>
      </div>
    </div>
  </footer>
);

const PruebaIndex = () => (
  <div>
    <Header />
    <Filters />
    <div className="contenedor-principal">
      <Products />
      <Services />
    </div>
    <Footer />
  </div>
);

export default PruebaIndex;