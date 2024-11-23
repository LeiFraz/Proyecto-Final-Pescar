import { useState } from "react";
import axios from "axios";

const CrearPublicacion = () => {
    const [formData, setFormData] = useState({
        id_emprendimiento: '',
        nombre: '',
        tipo: '',
        estado: false,
        precio: 0,
        descuento: 0,
    });

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Si el campo es precio o descuento, convertir a número
        if (name === 'precio' || name === 'descuento') {
            const numericValue = value === '' ? 0 : parseInt(value, 10); // Default to 0 if empty
            setFormData((prev) => ({
                ...prev,
                [name]: numericValue,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Convertir valores numéricos explícitamente
            const dataToSend = {
                ...formData,
                precio: parseInt(formData.precio, 10),
                descuento: parseInt(formData.descuento, 10),
            };
            if (dataToSend.descuento === 0) {
                delete dataToSend.descuento;
            }

            const response = await axios.post('http://localhost:5000/api/publicacion/crear', dataToSend);

            if (response.status === 201) {
                alert('Publicación creada con éxito');
                console.log('Respuesta del servidor:', response.data);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Hubo un error al crear la publicación.');
        }
    };

    return (
        <div>
            <h1>Crear Publicación</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID Emprendimiento:</label>
                    <input
                        type="text"
                        name="id_emprendimiento"
                        value={formData.id_emprendimiento}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Tipo:</label>
                    <input
                        type="text"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Estado:</label>
                    <input
                        type="checkbox"
                        name="estado"
                        checked={formData.estado}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descuento:</label>
                    <input
                        type="number"
                        name="descuento"
                        value={formData.descuento}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Crear Publicación</button>
            </form>
        </div>
    );
};

export default CrearPublicacion;