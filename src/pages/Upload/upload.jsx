// Importamos el CSS y otros recursos
import './upload.css';
import logo from '../../assets/img-upload/logo_reducido_negro.png';
import carrito from '../../assets/img-upload/carrito.png';
import ModalSuccess from '../../components/Modals/ModalSuccess';
import { useState } from 'react';

function Upload() {

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            {/* Modal */}
            <ModalSuccess isOpen={isOpen} text={'Se creó la publicación exitosamente'}>
                <button className='btn btn-success' onClick={closeModal}>Aceptar</button>
            </ModalSuccess>

            {/* Sección Principal */}
            <main className="main-container">
                <section className="info-general">
                    <h2>Información General</h2>
                    <label>Nombre del producto/servicio</label>
                    <input type="text" placeholder="Introducir nombre" />
                    <label>Descripción</label>
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
                    <button className="publish-btn" onClick={openModal}>Publicar ahora</button>
                </div>
            </main>
        </div>
    );
}

export default Upload;
