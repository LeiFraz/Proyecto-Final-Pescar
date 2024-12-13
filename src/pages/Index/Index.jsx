import { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';
import './index.css'


const obtenerCategorias = async (setCategorias) => {
    try {
        // Realizar la solicitud GET
        const response = await axios.get('https://grow-backend.up.railway.app/api/categoria/limit/12');
        console.log(response)
        // Desestructurar y obtener solo los campos "id" y "nombre" de cada publicación
        const categoriasData = response.data.map(categoria => ({
            id: categoria._id,
            nombre: categoria.nombre,
            imagen: categoria.imagen
        }));

        // Actualizar el estado con los datos filtrados
        setCategorias(categoriasData);
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
    }
};
const obtenerProductos = async (setProductos) => {
    try {
        // Realizar la solicitud GET
        const response = await axios.get('https://grow-backend.up.railway.app/api/publicacion/limit', {
            params: {
                limit: 16,
                tipo: "producto",
            }
        })
        console.log(response.data)
        const productsData = response.data

        setProductos(productsData);
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
    }
};

const obtenerServicios= async (setServicios) => {
    try {
        // Realizar la solicitud GET
        const response = await axios.get('https://grow-backend.up.railway.app/api/publicacion/limit', {
            params: {
                limit: 16,
                tipo: "servicio",
            }
        })
        console.log(response.data)
        const servicesData = response.data

        setServicios(servicesData);
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
    }
};

const obtenerOfertas= async (setOfertas) => {
    try {
        const response = await axios.get('https://grow-backend.up.railway.app/api/publicacion/limit', {
            params: {
                limit: 16,
                descuento:1,
            }
        })
        console.log(response.data)
        const offersData = response.data

        setOfertas(offersData);
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
    }
};

const obtenerEmprendimientos= async (setEmprendimientos) => {
    try {
        const response = await axios.get('https://grow-backend.up.railway.app/api/emprendimiento/limit/16')
        console.log(response.data)
        const entrepreneursData = response.data

        setEmprendimientos(entrepreneursData);
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
    }
};

function Index() {
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [emprendimientos, setEmprendimientos] = useState([]);

    useEffect(() => {
        obtenerCategorias(setCategorias);
        obtenerProductos(setProductos);
        obtenerServicios(setServicios);
        obtenerOfertas(setOfertas);
        obtenerEmprendimientos(setEmprendimientos);
    }, []);

    // Si estamos cargando, mostramos el indicador de carga
    return(
        <div className="montserrat-regular">
            <div className="main-container">
                <section className="banner" >
                    <a href="#products-section" className=""><div className="products">
                        <h3 className="banner-title">Productos Recomendados</h3>
                        <button className="more-info">Ver más <i className="icon-down-open"></i></button>
                    </div></a>
                    <a href="#discounts-section"><div className="discounts">
                        <h3 className="banner-title" >Ofertas Disponibles</h3>
                        <button className="more-info">Ver más <i className="icon-down-open"></i></button>
                    </div></a>
                    <a href="#services-section"><div className="services">
                        <h3 className="banner-title" >Servicios Recomendados</h3>
                        <button className="more-info">Ver más <i className="icon-down-open"></i></button>
                    </div></a>
                    <a href="#entrepreneurships-section">
                        <div className="entrepreneurship">
                            <h3 className="banner-title" >Emprendimientos Recomendados</h3>
                            <button className="more-info">Ver más <i className="icon-down-open"></i></button>
                        </div></a>
                </section>
                <section className="notes-container">
                    <div className="notes">
                        <article className="publication">
                            <div className="notes-icon"><img src="/img/laptop.png" alt=""/></div>
                            <div className="notes-p"><strong>Fácil publicación</strong><p>Publica tus productos y servicios de forma sencilla y rápida.</p></div>
                        </article>
                        <article className="support">
                            <div className="notes-icon"><img src="/img/headset.png" alt=""/></div>
                            <div className="notes-p"><strong>Soporte al emprendedor</strong><p>Ayuda personalizada para gestionar tu negocio en GROW.</p></div>
                        </article>
                        <article className="connection">
                            <div className="notes-icon"><img src="/img/chat.png" alt=""/></div>
                            <div className="notes-p"><strong>Conexión directa</strong><p>Contacto de forma directa con tus emprendedores / clientes potenciales.</p></div>
                        </article>
                        <article className="pays">
                            <div className="notes-icon"><img src="/img/introduction.png" alt=""/></div>
                            <div className="notes-p"><strong>Pautas de Pago Flexibles</strong><p>Acuerda los terminos de pago que mejor se adapten a tu bolsillo.</p></div>
                        </article>
                    </div>
                </section>
            </div>
            <div className="main-container">
                <section className="categories">
                    <div className="section-title">
                        <h2 className="section-subtitle">Categorías Populares</h2><a href="/categorias">Ver más <i className="icon-right"></i></a>
                    </div>
                    <div className="categories-container">
                    {categorias.map(categoria => (
                            <CategoryCard key={categoria.id}
                            imageUrl={categoria.imagen}
                            categoryName={categoria.nombre}
                            id={categoria.id}
                            />
                ))}
                        

                    </div>
                </section>
            </div>

            <div className="main-container">
                <section className="products-section" id="products-section">
                    <div className="section-title">
                        <h2 className="section-subtitle">Productos Recomendados</h2><a href="/publicaciones?tipo=producto">Ver más <i className="icon-right"></i></a>
                    </div>
                    <div className="products-container">
                        {/* ----------SWIPER-------------------- */}
                    <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            slidesPerGroup={1}
                            spaceBetween={10}  // Espacio entre los slides
                            slidesPerView={1}  // Siempre muestra un slide por vista
                            breakpoints={{
                              320: {
                                slidesPerView: 1,  // En pantallas pequeñas solo muestra un slide
                                slidesPerGroup: 1,
                              },
                              768: {
                                slidesPerView: 2,  // Muestra 2 slides cuando la pantalla es más grande
                                slidesPerGroup: 2,
                              },
                              1024: {
                                slidesPerView: 3,  // Muestra 3 slides cuando la pantalla es aún más grande
                                slidesPerGroup: 3,
                                },
                              1280: {
                                slidesPerView: 4,  // Muestra 3 slides cuando la pantalla es aún más grande
                                slidesPerGroup: 4,
                                },
                            }}
                        >
                        {/* <!-- Cards products --> */}
                        {productos.map(prod => (
                            <SwiperSlide>
                            <ProductCard
                                key={prod._id}
                                id_publicacion={prod._id}
                                imageUrl={prod.imagenes[0]}
                                productName={prod.nombre}
                                originalPrice={prod.precio_original || prod.precio_actual}
                                discount={prod.descuento}
                                id_emprendimiento={prod.id_emprendimiento}
                                transparentPrice={prod.calculo_precio.precio_transparente}
                            />
                            </SwiperSlide>
                        ))}
                        
                        </Swiper>
                    </div>
                </section>
            </div>
            
            
            <div className="main-container">
                <section className="services-section" id="services-section">
                    <div className="section-title">
                        <h2 className="section-subtitle">Servicios Recomendados</h2><a href="/publicaciones?tipo=servicio">Ver más <i className="icon-right"></i></a>
                    </div>
                    <div className="products-container">
                        {/* ----------SWIPER-------------------- */}
                    <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            slidesPerGroup={1}
                            spaceBetween={10}  // Espacio entre los slides
                            slidesPerView={1}  // Siempre muestra un slide por vista
                            breakpoints={{
                              320: {
                                slidesPerView: 1,  // En pantallas pequeñas solo muestra un slide
                                slidesPerGroup: 1,
                              },
                              768: {
                                slidesPerView: 2,  // Muestra 2 slides cuando la pantalla es más grande
                                slidesPerGroup: 2,
                              },
                              1024: {
                                slidesPerView: 3,  // Muestra 3 slides cuando la pantalla es aún más grande
                                slidesPerGroup: 3,
                                },
                              1280: {
                                slidesPerView: 4,  // Muestra 3 slides cuando la pantalla es aún más grande
                                slidesPerGroup: 4,
                                },
                            }}
                        >
                        {/* <!-- Cards products --> */}
                        {servicios.map(prod => (
                            <SwiperSlide>
                            <ProductCard
                                key={prod._id}
                                id_publicacion={prod._id}
                                imageUrl={prod.imagenes[0]}
                                productName={prod.nombre}
                                originalPrice={prod.precio_original || prod.precio_actual}
                                discount={prod.descuento}
                                id_emprendimiento={prod.id_emprendimiento}
                                transparentPrice={prod.calculo_precio.precio_transparente}
                            />
                            </SwiperSlide>
                        ))}
                        
                        </Swiper>
                    </div>
                </section>
            </div>

            <div className="main-container">
                <section className="discounts-section" id="discounts-section">
                    <div className="section-title">
                        <h2 className="section-subtitle">Ofertas Disponibles</h2><a href="/publicaciones?descuento=5&orden=MasDescuento">Ver más <i className="icon-right"></i></a>
                    </div>
                    <div className="products-container">
                        {/* ----------SWIPER-------------------- */}
                    <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            slidesPerGroup={1}
                            spaceBetween={10}  // Espacio entre los slides
                            slidesPerView={1}  // Siempre muestra un slide por vista
                            breakpoints={{
                              320: {
                                slidesPerView: 1,  // En pantallas pequeñas solo muestra un slide
                                slidesPerGroup: 1,
                              },
                              768: {
                                slidesPerView: 2,  // Muestra 2 slides cuando la pantalla es más grande
                                slidesPerGroup: 2,
                              },
                              1024: {
                                slidesPerView: 3,  // Muestra 3 slides cuando la pantalla es aún más grande
                                slidesPerGroup: 3,
                                },
                              1280: {
                                slidesPerView: 4,  // Muestra 3 slides cuando la pantalla es aún más grande
                                slidesPerGroup: 4,
                                },
                            }}
                        >
                        {/* <!-- Cards products --> */}
                        {ofertas.map(prod => (
                            <SwiperSlide>
                            <ProductCard
                                key={prod._id}
                                id_publicacion={prod._id}
                                imageUrl={prod.imagenes[0]}
                                productName={prod.nombre}
                                originalPrice={prod.precio_original || prod.precio_actual}
                                discount={prod.descuento}
                                id_emprendimiento={prod.id_emprendimiento}
                                transparentPrice={prod.calculo_precio.precio_transparente}
                            />
                            </SwiperSlide>
                        ))}
                        
                        </Swiper>
                    </div>
                </section>
            </div>

            <div className="main-container">
                <section className="entrepreneurships-section" id="entrepreneurships-section">
                    <div className="section-title">
                        <h2 className="section-subtitle">Emprendimientos Recomendados</h2><a href="/emprendimientos">Ver más <i className="icon-right"></i></a>
                    </div>
                    <div className="profiles-container">
                    <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            slidesPerGroup={1}
                            spaceBetween={10}  // Espacio entre los slides
                            slidesPerView={1}  // Siempre muestra un slide por vista
                            breakpoints={{
                              320: {
                                slidesPerView: 1,  // En pantallas pequeñas solo muestra un slide
                                slidesPerGroup: 1,
                              },
                              768: {
                                slidesPerView: 2,  // Muestra 2 slides cuando la pantalla es más grande
                                slidesPerGroup: 2,
                              },
                              1024: {
                                slidesPerView: 3,  // Muestra 3 slides cuando la pantalla es aún más grande
                                slidesPerGroup: 3,
                                },
                              1280: {
                                slidesPerView: 4,  // Muestra 3 slides cuando la pantalla es aún más grande
                                slidesPerGroup: 4,
                                },
                            }}
                        >
                        {/* <!-- Cards profiles --> */}
                        {emprendimientos.map(emp => (
                            <SwiperSlide>
                            <ProfileCard
                                id_emprendimiento={emp._id}
                                imageUrl={emp.foto_perfil}
                                profileName={emp.nombre_emprendimiento}
                                description={emp.descripcion}
                            />
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
                </section>
            </div>
        </div>

        
    );
};


export default Index;
{/* <ProductCard
        imageUrl="https://placehold.co/1000x1000"
        productName="Peluche personalizado"
        profileName="PeluchitosGod"
        originalPrice={50000}
        discount={50}
        />

        <CategoryCard
        imageUrl="https://placehold.co/400x400"
        categoryName="Hecho a Mano"
        />

        <ProfileCard
        imageUrl={"https://placehold.co/1000x1000"}
        profileName={"PeluchitosGod"}
        description={"Peluches hechos a mano, a tejido, de tela y de lana personalizados a gusto del consumidor."}
        /> */}