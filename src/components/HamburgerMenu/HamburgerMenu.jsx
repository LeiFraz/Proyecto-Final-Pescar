import React, { useState } from 'react';
import styles from './HamburgerMenu.module.css';
import { useCart } from "../../common/CartContext";
const HamburgerMenu = ({userId, typeUser}) => {
    const [isOpen, setIsOpen] = useState(false); // Controla el estado del menú
    const { cart, openCart, isCartOpen } = useCart();
    return (
        <nav className={styles.hamburgerMenu}>
            <div className={styles.mainHeader}>
            <button
                className={styles.menuToggle}
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>
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
                        />
                        <button className={styles.searchButton}>
                            <i className="icon-search"></i>
                        </button>
                    </div>

                    {/* Carrito */}
                    

                    {/* Enlaces del menú */}
                    <ul className={styles.menuLinks}>
                        <li><a href="/inicio">Inicio</a></li>
                        <li>
                            <a href="/publicaciones">Tienda <i className="icon-down-open"></i></a>
                            <ul className={styles.dropdown}>
                                <li><a href="/publicaciones?tipo=producto">Productos</a></li>
                                <li><a href="/publicaciones?tipo=servicio">Servicios</a></li>
                                <li><a href="/emprendimientos">Emprendimientos</a></li>
                            </ul>
                        </li>
                        <li><a href="/nosotros">Sobre nosotros</a></li>
                        
                        {!userId ?
                        (<li><a href="/iniciar-sesion">Iniciar Sesión</a></li>
                        ):(
                        <li>
                            <a href="#">Nombre Usuario <i className="icon-down-open"></i></a>
                            <ul className={styles.dropdown}>
                                <li><a href="">Perfil</a></li>
                                {typeUser!="emprendedor" && <li><a href="#">Emprender</a></li>}
                                {typeUser==="emprendedor" && <li><a href="#">Tu emprendimiento</a></li>}
                                <li><a href="#">Ajustes</a></li>
                                <li><a href="#" className={styles.logout}><i className="icon-logout"></i>Cerrar Sesión</a></li>
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
