// Importamos el CSS y otros recursos
import './upload.css';
import logo from '../../assets/img-upload/logo_reducido_negro.png';
import carrito from '../../assets/img-upload/carrito.png';

function Upload() {
    return (
    <div>
      {/* Header Superior */}
    <header className="header">
        <div className="header-container">
        <div className="header-left">
            <img src={logo} alt="Logo Grow" className="logo" />
        </div>

        <div className="search-container">
            <input type="text" placeholder="⌕ Search" className="search-bar" />
            <button className="search-btn">Search</button>
        </div>

        <div className="header-right">
            <div className="shopping-cart">
            Shopping cart: <span>$57.00</span>
            </div>
            <button className="cart-btn">
            <img src={carrito} alt="Carrito" className="cart-icon" />
            </button>
        </div>
        </div>
    </header>

      {/* Barra de Navegación Inferior */}
    <nav className="nav-bar">
        <a href="#">Home 🡣</a>
        <a href="#">Shop 🡣</a>
        <a href="#">Pages 🡣</a>
        <a href="#">Blog 🡣</a>
        <a href="#">About Us 🡣</a>
        <a href="#">Contact Us 🡣</a>
        <button className="login-btn">Iniciar Sesión</button>
    </nav>

      {/* Sección Principal */}
    <main className="main-container">
        <section className="info-general">
        <h2>Información General</h2>
        <a>Nombre del producto/servicio</a>
        <br />
        <input type="text" placeholder="Introducir nombre" />
        <br />
        <a>Descripción</a>
        <textarea placeholder="..." />
        </section>

        <section className="imagen">
        <h2>Imagen</h2>
        <div className="image-upload">
            <input type="file" id="imageInput" style={{ display: 'none' }} />
            <label htmlFor="imageInput">Añadir una imagen</label>
        </div>
        </section>

        <section className="precios">
        <h2>Precios</h2>
        <input type="number" placeholder="Precio base" />
        <input type="number" placeholder="Porcentaje de descuento (%)" />
        <select>
            <option>Selecciona un tipo de descuento</option>
        </select>
        </section>

        <section className="categoria">
        <h2>Categoría</h2>
        <select>
            <option>Selecciona una Categoría</option>
        </select>
        <input type="text" placeholder="Agregar Tags" />
        </section>

        <section className="inventario">
        <h2>Inventario/Disponibilidad</h2>
        <input type="number" placeholder="Cantidad" />
        <input type="date" />
        </section>

        <div className="buttons">
        <button className="save-btn">Guardar como borrador</button>
        <button className="publish-btn">Publicar ahora</button>
        </div>
    </main>
    </div>
);
}

export default Upload;
