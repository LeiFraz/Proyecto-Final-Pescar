import { Outlet as Page } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Lottie from 'lottie-react';
import logofooter from '../../assets/Img-componentes/logo_slogan_white.png';
import animationData from "../../assets/Img-componentes/growlogo.json"; // Reemplaza con la ruta a tu archivo Lottie

function Layout() {
    const[id,setId] = useState()
    const[tipo,setTipo] = useState()
    const lottieRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        // Verifica si el archivo CSS ya está en el he
        localStorage.setItem("userId", "1234");
        localStorage.setItem("tipoPerfil","emprendedor")
        setId(localStorage.getItem("userId"));
        setTipo(localStorage.getItem("tipoPerfil"))
    }, [id]);

    const navigate = useNavigate();
    const paginaRegistro = () => navigate('/registro') 
    const volverArriba = () => navigate('/#')
const recargar=()=>{
    window.location.reload();
}

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
    return(

        <>
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
                        <a href="#"><img src="/img/bag2.png" alt="Carrito"/></a>
                        <p className="contador">0</p>
                    </div>
                </div>
            </div>
            </div>
            <div className="main-nav montserrat-regular">
                <div className="nav-container mycontainer">
                <div className="nav-links-container">
                    <ul className="nav-links">
                    <li className="nav-link-item"><a href="#">Inicio</a>
                    </li>
                    <li className="nav-link-item"><a href="#">Tienda <i className="icon-down-open"></i></a>
                        <ul className="dropdown_menu">
                            <li className="dropdown-menu-item"><a href="#">Productos</a></li>
                            <li className="dropdown-menu-item"><a href="#">Servicios</a></li>
                            <li className="dropdown-menu-item"><a href="#">Emprendimientos</a></li>
                        </ul>
                    </li>
                    <li className="nav-link-item"><a href="#">Sobre nosotros</a></li>
                    <li className="nav-link-item"><a href="#">Contactanos</a></li>
                </ul>
                </div>
                <div className="nav-links-container">
                    {!id?(
                        <ul className="nav-links">
                        <li className="nav-link-item"><a href="#"><i className="icon-user"></i>Iniciar Sesión</a></li>
                        </ul>
                    ) : (
                    <ul className="nav-links">
                        <li className="nav-link-item"><a href="#"><i className="icon-user"></i>Nombre Cuenta <i className="icon-down-open"></i></a>
                            <ul className="dropdown_menu">
                                <li className="dropdown-menu-item profile"><a href="#">Perfil</a></li>
                                {tipo != "emprendedor"&& tipo!="admin"&& <li className="dropdown-menu-item profile"><a href="#">Emprender</a></li>}
                                {tipo == "emprendedor"&& tipo!="admin" && <li className="dropdown-menu-item profile"><a href="#">Tu emprendimiento</a></li>}
                                <li className="dropdown-menu-item profile"><a href="#">Ajustes</a></li>
                                <li className="dropdown-menu-item profile"><a href="#" className="logout"><i className="icon-logout"></i>Cerrar Sesión</a></li>
                            </ul>
                            </li>
                        </ul>
                    )}
                    
                </div>
            </div>
            </div>
            <Page/>
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