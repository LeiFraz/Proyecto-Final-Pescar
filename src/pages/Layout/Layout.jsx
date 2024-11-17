import { Outlet as Page } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/Img-componentes/logo_negro.png';
import logo2 from '../../assets/Img-componentes/logo_bombilla2.png';
import logofooter from '../../assets/Img-componentes/logo_slogan_white.png';

function Layout() {
    

    const navigate = useNavigate();
    const paginaRegistro = () => navigate('/registro') 
    const volverArriba = () => navigate('/#')
const recargar=()=>{
    window.location.reload();
}
    return(

        <>
            <div className="main-search" id="#">
            <div className="nav mycontainer">
                <div className="image-wrapper">
                    <div role="link" tabIndex={0} onClick={volverArriba} style={{ cursor: 'pointer' }}><img src="/img/logo_negro.png" className="image"/></div>
                    <div role="link" tabIndex={0} onClick={volverArriba} style={{ cursor: 'pointer' }}><img src="/img/logo_bombilla2.png" className="image-hover"/></div>
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
            <div className="main-nav">
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
                    <ul className="nav-links">
                        <li className="nav-link-item"><a href="#"><i className="icon-user"></i>Iniciar Sesión</a></li>
                    </ul>
                </div>
            </div>
            </div>
            <Page/>
            <footer className="footer">
        <section className="footer-sections">
            <div className="footer-sections-container mycontainer">
                <article className="footer-section">
                <div role="link" tabIndex={0} onClick={volverArriba} style={{ cursor: 'pointer' }}><img src={logofooter} alt="Grow" className="footer-logo"/></div>
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