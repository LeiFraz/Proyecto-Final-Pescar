import { useNavigate } from "react-router-dom";

const NavBarLayout = ({id, tipo, logout, id_emprendimiento}) => {

    const navigate = useNavigate();
    const paginaLogin = () => navigate('/login') 

    return (
        <>
            <div className="main-nav montserrat-regular">
                <div className="nav-container mycontainer">
                    <div className="nav-links-container">
                        <ul className="nav-links">
                            <li className="nav-link-item"><a href="/inicio">Inicio</a>
                            </li>
                            <li className="nav-link-item"><a href="/publicaciones">Tienda <i className="icon-down-open"></i></a>
                                <ul className="dropdown_menu">
                                    <li className="dropdown-menu-item"><a href="/publicaciones?tipo=producto">Productos</a></li>
                                    <li className="dropdown-menu-item"><a href="/publicaciones?tipo=servicio">Servicios</a></li>
                                    <li className="dropdown-menu-item"><a href="/emprendimientos">Emprendimientos</a></li>
                                </ul>
                            </li>
                            <li className="nav-link-item"><a href="/nosotros">Sobre nosotros</a></li>
                        </ul>
                    </div>
                    <div className="nav-links-container">
                        {!id?(
                            <ul className="nav-links">
                            <li className="nav-link-item" onClick={paginaLogin}><a href="#"><i className="icon-user"></i>Iniciar Sesión</a></li>
                            </ul>
                        ) : (
                        <ul className="nav-links">
                            <li className="nav-link-item"><a href="#"><i className="icon-user"></i>{localStorage.getItem('userName')} <i className="icon-down-open"></i></a>
                                <ul className="dropdown_menu">
                                    <li className="dropdown-menu-item profile"><a href={`/perfil?usuario=${id}`}>Perfil</a></li>
                                    {tipo != "emprendedor"&& tipo!="admin"&& <li className="dropdown-menu-item profile"><a href="/crearEmprendimiento">Emprender</a></li>}
                                    {tipo == "emprendedor"&& tipo!="admin" && id_emprendimiento===localStorage.getItem('entrepreneurId') && <li className="dropdown-menu-item profile"><a href={`/emprendimiento?emprendimiento=${localStorage.getItem('entrepreneurId')}`}>{localStorage.getItem("entrepreneurName")}</a></li>}
                                    <li className="dropdown-menu-item profile"><a href="#">Ajustes</a></li>
                                    <li className="dropdown-menu-item profile"><a href="#" className="logout" onClick={logout}><i className="icon-logout"></i>Cerrar Sesión</a></li>
                                </ul>
                                </li>
                            </ul>
                        )}
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBarLayout