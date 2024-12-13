import React, { useState } from 'react';
import styles from './HamburgerMenu.module.css';
import { useCart } from "../../common/CartContext";
import { useNavigate } from 'react-router-dom';
const HamburgerMenu = ({userId, typeUser, logout, id_emprendimiento}) => {
    const navigate = useNavigate();
    const paginaLogin = () => navigate('/login') 
    const [isOpen, setIsOpen] = useState(false); // Controla el estado del menú
    const [searchTerm, setSearchTerm] = useState("");
    const { cart, openCart, isCartOpen } = useCart();
    const handleSearch = () => {
        if (searchTerm.trim()) {
          navigate(`/publicaciones?query=${encodeURIComponent(searchTerm)}`);
          setSearchTerm("");
        }
      };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };
    return (
        <nav className={styles.hamburgerMenu}>
            <div className={styles.mainHeader}>
            <button
                className={styles.menuToggle}
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>
            <a href='/inicio' className={styles.logoHamburguesa}>
                <img className={styles.logoHamburguesaImg} src="\img\logo_negro.png" alt="" />
            </a>
            <div className={styles.carrito}>
                        <div>
                            <img src="/img/bag2.png" alt="Carrito" onClick={() => openCart()} />
                            <p className={styles.contador}>{cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
                        </div>
            </div>
            
            </div>
            {isOpen && (
                <div className={styles.menuContent}>
                    {/* Barra de búsqueda */}
                    <div className={styles.searchBar}>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleSearch} className={styles.searchButton}>
                            <i className="icon-search"></i>
                        </button>
                    </div>

                    {/* Carrito */}
                    

                    {/* Enlaces del menú */}
                    <ul className={styles.menuLinks}>
                        <li><a href="/inicio">Inicio</a></li>
                        <li>
                            <a href="#">Tienda <i className="icon-down-open"></i></a>
                            <ul className={styles.dropdown}>
                                <li><a href="/publicaciones?tipo=producto">Productos</a></li>
                                <li><a href="/publicaciones?tipo=servicio">Servicios</a></li>
                                <li><a href="/emprendimientos">Emprendimientos</a></li>
                            </ul>
                        </li>
                        <li><a href="/nosotros">Sobre nosotros</a></li>
                        
                        {!userId ?
                        (<li><a href="#" onClick={paginaLogin}>Iniciar Sesión</a></li>
                        ):(
                        <li>
                            <a href="#">{localStorage.getItem('userName')}<i className="icon-down-open"></i></a>
                            <ul className={styles.dropdown}>
                                <li><a href={`/perfil?usuario=${userId}`}>Perfil</a></li>
                                {typeUser!="emprendedor" && <li><a href="/crearEmprendimiento">Emprender</a></li>}
                                {typeUser==="emprendedor" && id_emprendimiento===localStorage.getItem('entrepreneurId') && <li><a href={`/emprendimiento?emprendimiento=${localStorage.getItem('entrepreneurId')}`}>{localStorage.getItem('entrepreneurName')}</a></li>}
                                <li><a href="#">Ajustes</a></li>
                                <li><a href="#" className={styles.logout} onClick={logout}><i className="icon-logout"></i>Cerrar Sesión</a></li>
                            </ul>
                        </li>
                        )}
                        
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default HamburgerMenu;
