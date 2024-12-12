import { Outlet as Page } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Lottie from 'lottie-react';
import logofooter from '../../assets/Img-componentes/logo_slogan_white.png';
import animationData from "../../assets/Img-componentes/growlogo.json"; // Reemplaza con la ruta a tu archivo Lottie
import NavBarLayout from "./NavBarLayout";
import CartSidebar from "../../components/CartSidebar/CartSidebar";
import HamburgerMenu from "../../components/HamburgerMenu/HamburgerMenu";
import { useCart } from "../../common/CartContext";
// import UserProfile from "../UserProfile/UserProfile";

function Layout() {
    const { cart, openCart, isCartOpen } = useCart();
    const[id,setId] = useState(localStorage.getItem('userId')? localStorage.getItem('userId') : null)
    const[tipo,setTipo] = useState(localStorage.getItem('tipoPerfil')? localStorage.getItem('tipoPerfil') : null)
    const lottieRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    

    const navigate = useNavigate();
    // const paginaLogin = () => navigate('/login') 
    const volverArriba = () => navigate('/#')
    const paginaInicio = () => navigate('/') 

const handleMouseEnter = () => {
    if (lottieRef.current) {
        setIsPlaying(true);
        lottieRef.current.setSpeed(1.5); // Aseguramos velocidad positiva al entrar
        const currentFrame = lottieRef.current.currentFrame;
        lottieRef.current.goToAndPlay(currentFrame, true);
    }
};

  const handleMouseLeave = () => {
    if (lottieRef.current) {
      setIsPlaying(false);
      lottieRef.current.setSpeed(-1.5);
      const currentFrame = lottieRef.current.currentFrame;
      lottieRef.current.goToAndPlay(currentFrame, true);
    }
  };

  const handleComplete = () => {
    if (!isPlaying && lottieRef.current) {
      lottieRef.current.setSpeed(1.5); // Reseteamos la velocidad cuando termina la reversa
      lottieRef.current.goToAndStop(0); // Nos aseguramos que se detenga en el frame 0
    }
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Maneja el cambio de tamaño de pantalla
  useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    localStorage.removeItem('tipoPerfil')
    localStorage.removeItem('userName')
    setId(null)
    setTipo(null)
    paginaInicio()
  }

  //USAR REDUX O CONTEXT PARA RENDERIZAR EL LOGIN
  useEffect(() => {
    // Verifica si el archivo CSS ya está en el he
    const recargar = () => {
        if (localStorage.getItem('userId') && localStorage.getItem('tipoPerfil')){
            setId(localStorage.getItem("userId"));
            setTipo(localStorage.getItem("tipoPerfil"))
        }
    }

    recargar()

    }, [id]);
    return(

        <>
        {isMobile ? (
                <HamburgerMenu 
                userId={id}
                typeUser={tipo}
                />
            ) : (
            <div className="main-search" id="#">
            <div className="nav mycontainer">
                <div className="logo-wrapper" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <a href="/inicio" className="logo-link">
                <Lottie
                    lottieRef={lottieRef}
                    animationData={animationData}
                    autoplay={false}
                    loop={false}
                    speed={isPlaying ? 1 : -1}
                    onComplete={handleComplete}
                />
                </a>
                </div>
                
                <div className="search">
                    <input type="text" placeholder="Buscar..." className="montserrat-regular"/>
                    <button className="montserrat-regular"><i className="icon-search"></i></button>
                </div>
                <div className="carrito">
                        <div>
                            <img src="/img/bag2.png" alt="Carrito" onClick={() => openCart()} />
                            <p className="contador">{cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
                        </div>
                </div>
            </div>
            </div>
            <NavBarLayout id={id} tipo={tipo} logout={logout}/>
            )}
            <Page/>
            {isCartOpen && (
                <CartSidebar
                />
            )}
            <footer className="footer">
        <section className="footer-sections">
            <div className="footer-sections-container mycontainer">
                <article className="footer-section">
                <div role="link" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} tabIndex={0} onClick={volverArriba} style={{ cursor: 'pointer' }}>
                    <img src={logofooter} alt="Grow" className="footer-logo"/>
                </div>
                </article>
                <article className="footer-section">
                    <h3 className="footer-section-title">Mi Cuenta</h3>
                    <ul className="footer-section-table">
                        <li className="footer-section-links">
                            <a href="#" className="footer-section-link">Perfil</a>
                        </li>
                        <li className="footer-section-links">
                            <a href="#" className="footer-section-link">Compras</a>
                        </li>
                        <li className="footer-section-links">
                            <a href="#" className="footer-section-link">Carrito</a>
                        </li>
                        <li className="footer-section-links">
                            <a href="#" className="footer-section-link">Favoritos</a>
                        </li>
                    </ul>
                </article>
                <article className="footer-section">
                    <h3 className="footer-section-title">Ayuda</h3>
                    <ul className="footer-section-table">
                        <li className="footer-section-links">
                            <a href="#" className="footer-section-link">Contacto</a>
                        </li>
                        <li className="footer-section-links">
                            <a href="#" className="footer-section-link">FAQ</a>
                        </li>
                        <li className="footer-section-links">
                            <a href="#" className="footer-section-link">Terminos & Condiciones</a>
                        </li>
                        <li className="footer-section-links">
                            <a href="#" className="footer-section-link">Política de privacidad</a>
                        </li>
                    </ul>
                </article>
                <article className="footer-section">
                    <h3 className="footer-section-title">Redes sociales</h3>
                    <div className="social-container">
                        <a href="#" className="social-icon"><img src="/img/facebook.svg" alt="Facebook" className="socials"/></a>
                        <a href="#" className="social-icon"><img src="/img/instagram.svg" alt="Instagram" className="socials"/></a>
                        <a href="#" className="social-icon"><img src="/img/twitter-x.svg" alt="Twitter" className="socials"/></a>
                        <a href="#" className="social-icon"><img src="/img/linkedin.svg" alt="Linkedin" className="socials"/></a>
                    </div>
                </article>
            </div>
        </section>
        <div className="footer-copy-main">
            <section className="footer-copy mycontainer">
                <p className="footer-copy-text" id="copyright">
                    Copyright &#169;
                    <span id="current-year">{new Date().getFullYear()} </span> 
                    Todos los derechos reservados
                </p>
                <div className="affiliates">
                    <div className="image-wrapper">
                        <a href="#" className="social-icon image" target="_blank"><img src="/img/pescar.png" alt="Pescar" className="affiliate"/></a>
                        <a href="https://www.pescar.org.ar" className="social-icon image-hover" target="_blank"><img src="/img/pescar2.png" alt="Pescar" className="affiliate"/></a>
                    </div>
                    
                    <div className="image-wrapper">
                        <a href="#" className="social-icon image"><img src="/img/karuna.png" alt="Karuna" className="affiliate"/></a>
                        <a href="#" className="social-icon image-hover"><img src="/img/karuna2.png" alt="Karuna" className="affiliate"/></a>
                    </div>
                    <div className="image-wrapper">
                        <a href="" className="social-icon image" ><img src="/img/valtech.png" alt="Valtech" className="affiliate"/></a>
                        <a href="https://www.valtech.com/es-ar/" className="social-icon image-hover" target="_blank"><img src="/img/valtech2.png" alt="Valtech" className="affiliate"/></a>
                    </div>
                </div>
            </section>
            
        </div>
        
    </footer>
        </>
    )
}

export default Layout;