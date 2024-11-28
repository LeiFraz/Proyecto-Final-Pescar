import { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
const obtenerCategorias = async (setCategorias) => {
    try {
        // Realizar la solicitud GET
        const response = await axios.get('http://localhost:5000/api/categoria/limit/12');
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
function Index() {
    const [loading, setLoading] = useState(true); // Estado de carga
    const [categorias, setCategorias] = useState([]);
    useEffect(() => {
        obtenerCategorias(setCategorias);
        const existingLink = document.querySelector('link[href="/src/pages/Index/index.css"]');
        const userData=localStorage.setItem("userId", "1234");
        const userId=localStorage.getItem("userId");
        if (!existingLink) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/src/pages/Index/index.css'; // Ruta al archivo CSS
            document.head.appendChild(link);

            // Cuando el archivo CSS se carga correctamente, actualizamos el estado de carga
            link.onload = () => {
                setLoading(false);  // Cambiar el estado a false después de que se cargue el CSS
            };

            // Si el archivo CSS no se carga correctamente (en caso de error)
            link.onerror = (error) => {
                console.error('Error al cargar el CSS:', error);
                setLoading(false);  // Asegúrate de quitar el estado de carga si hay un error
            };
        } else {
            setLoading(false);  // Si el CSS ya está cargado, no es necesario esperar
        }

        // Cleanup: Elimina el link cuando el componente se desmonte
        return () => {
            const link = document.querySelector('link[href="/src/pages/Index/index.css"]');
            if (link) {
                document.head.removeChild(link);
            }
        };
    }, []);

    // Si estamos cargando, mostramos el indicador de carga
    if (loading) {
        return <div className="loading-spinner">Cargando...</div>;
    }
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
                            <div className="notes-icon"><img src="/src/pages/Index/img/laptop.png" alt=""/></div>
                            <div className="notes-p"><strong>Fácil publicación</strong><p>Publica tus productos y servicios de forma sencilla y rápida.</p></div>
                        </article>
                        <article className="support">
                            <div className="notes-icon"><img src="/src/pages/Index/img/headset.png" alt=""/></div>
                            <div className="notes-p"><strong>Soporte al emprendedor</strong><p>Ayuda personalizada para gestionar tu negocio en GROW.</p></div>
                        </article>
                        <article className="connection">
                            <div className="notes-icon"><img src="/src/pages/Index/img/chat.png" alt=""/></div>
                            <div className="notes-p"><strong>Conexión directa</strong><p>Contacto de forma directa con tus emprendedores / clientes potenciales.</p></div>
                        </article>
                        <article className="pays">
                            <div className="notes-icon"><img src="/src/pages/Index/img/introduction.png" alt=""/></div>
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
                        {/* <!-- Cards products --> */}
                        <ProductCard
                        imageUrl="https://i.pinimg.com/originals/1a/e7/5d/1ae75d4027c349a8a9d56714370612cf.jpg"
                        productName="Peluches a Crochet Personalizados"
                        profileName="Crochetizate"
                        originalPrice={30000}
                        discount={20}
                        />
                        <ProductCard
                        imageUrl="https://d22fxaf9t8d39k.cloudfront.net/d77b447786f2bdd7994fddc3bfd4e52d190a7c608926e912dc7d16a96500ab1d14657.png"
                        productName="Mazo de Cartas Personalizado"
                        profileName="CarteandoAndo"
                        originalPrice={25000}
                        />
                        <ProductCard
                        imageUrl="https://fbi.cults3d.com/uploaders/14619068/illustration-file/84bee593-e0c1-4a9d-ab3d-4e4846df1a12/017.jpg"
                        productName="Figura impresa 3D a elección"
                        profileName="Impresiones Xtreme"
                        originalPrice={0}
                        discount={0}
                        />
                        <ProductCard
                        imageUrl="https://i.pinimg.com/736x/f0/6c/88/f06c88e5b39d2c878be2427db5d09a1c.jpg"
                        productName="Torta personalizada"
                        profileName="Beli Pasteleria"
                        originalPrice={35500}
                        />
                    </div>
                </section>
            </div>
            
            <div className="main-container">
                <section className="services-section" id="services-section">
                    <div className="section-title">
                        <h2 className="section-subtitle">Servicios Recomendados</h2><a href="/publicaciones?tipo=servicio">Ver más <i className="icon-right"></i></a>
                    </div>
                    <div className="products-container">
                        {/* <!-- Cards services --> */}
                        <ProductCard
                        imageUrl="https://institutotecnicorivadavia.com/webfiles/rivadavia/productos/68/2_1000x1000.jpg"
                        productName="Instalación de aire acondicionado"
                        profileName="Juan Instalaciones"
                        originalPrice={70000}
                        />
                        <ProductCard
                        imageUrl="https://www.spaoneandonly.cl/wp-content/uploads/2024/09/C7AD8ED4-BA67-4775-BA6A-BFC6832F6BC7-1-1000x1000.jpg"
                        productName="Sesión de masaje por hora"
                        profileName="MAXajes"
                        originalPrice={10000}
                        />
                        <ProductCard
                        imageUrl="https://siberiasalon.com/wp-content/smush-webp/2023/09/Glitter-1000x1000.jpg.webp"
                        productName="Uñas permanentes personalizadas"
                        profileName="Marlu Nails"
                        originalPrice={8000}
                        discount={25}
                        />
                        <ProductCard
                        imageUrl="https://grupolasser.com/wp-content/uploads/2022/07/empresa-instalacion-camaras-empresas-comunidades-hogares-madrid.jpg"
                        productName="Instalación de camaras de seguridad"
                        profileName="SecurityCam"
                        originalPrice={110000}
                        discount={10}
                        />
                    </div>
                </section>
            </div>

            <div className="main-container">
                <section className="discounts-section" id="discounts-section">
                    <div className="section-title">
                        <h2 className="section-subtitle">Ofertas Disponibles</h2><a href="/publicaciones?descuento=5&orden=MasDescuento">Ver más <i className="icon-right"></i></a>
                    </div>
                    <div className="products-container">
                        {/* <!-- Cards services products discount --> */}
                        <ProductCard
                        imageUrl="http://www.mesasdepool.com.ar/images/productos/Directorio/Directorio-01.jpg"
                        productName="Mesa de pool giratoria"
                        profileName="Piramide Pool"
                        originalPrice={1000000}
                        discount={70}
                        />
                        <ProductCard
                        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi8vNpeOn4mAIBd8SIfu7BqHUlmD-Qcj0Pmw&s"
                        productName="Reparación de PC"
                        profileName="Surfear"
                        originalPrice={30000}
                        discount={60}
                        />
                        <ProductCard
                        imageUrl=""
                        productName="Soldador profesional a domicilio"
                        profileName="SPD Metales"
                        originalPrice={60000}
                        discount={30}
                        />
                        <ProductCard
                        imageUrl="https://acdn.mitiendanube.com/stores/002/897/767/products/balde-de-albanil-comun11-5b35b60800072eacfb16882243036520-1024-1024.png"
                        productName="Albañileria por dia"
                        profileName="Raul Paez"
                        originalPrice={35514}
                        discount={20}
                        />
                    </div>
                </section>
            </div>
            <div className="main-container">
                <section className="entrepreneurships-section" id="entrepreneurships-section">
                    <div className="section-title">
                        <h2 className="section-subtitle">Emprendimientos Recomendados</h2><a href="/emprendimientos">Ver más <i className="icon-right"></i></a>
                    </div>
                    <div className="profiles-container">
                        {/* <!-- Cards profiles --> */}
                        <ProfileCard
                        imageUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJQReQFArnzkZPKmQ-YbY0EPY8TObhOlbSTQ&s"}
                        profileName={"Piramide Pool"}
                        description={"Pirámide es una empresa familiar que hace 25 años se dedica a la fabricación de diseños exclusivos de juegos de salón. Contamos con una amplia variedad de diseños, que se adaptan al gusto y necesidad de cada cliente. En la web se encuentran todos los modelos disponibles y, para una atención más personalizada, tenemos abierto nuestro showroom, atendido por sus dueños, quienes les brindarán una excelente atención."}
                        />
                        <ProfileCard
                        imageUrl={"https://i.postimg.cc/hPBVg96b/logooooooooo.png"}
                        profileName={"Beli Pasteleria"}
                        description={"Pasteleria artesanal 🍪 📍José C Paz | San Miguel | Bella vista (Consulte por otras zonas)"}
                        />
                        <ProfileCard
                        imageUrl={"https://marketplace.canva.com/EAE_Xy5fMq0/1/0/1600w/canva-logo-floral-para-emprendimiento-accesorios-jxJv6i75-lc.jpg"}
                        profileName={"Alta Pinta Accesorios"}
                        description={"Accesorios de todo tipo, llaveros, pines, pulseras, collares, todo hecho al detalle."}
                        />
                        <ProfileCard
                        imageUrl={"https://creadordelogos.com.ar/_next/image/?url=%2Fimages%2Fes-AR%2Flogos%2Faurora.png&w=1920&q=75"}
                        profileName={"Aurora"}
                        description={"Productos para tu mascota, alimento balanceado, camas, cuchas, rascadores y juguetes para tu amigo peludo."}
                        />
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