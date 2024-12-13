// Importamos el CSS y otros recursos
import axios from 'axios';
import styles from './upload.module.css'
import logo from '../../assets/img-upload/logo_reducido_negro.png';
import carrito from '../../assets/img-upload/carrito.png';
import ModalLoading from '../../components/Modals/ModalLoading';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilesDropzone from '../../components/FilesDropzone/FilesDropzone';
import FormularioPrecio from '../../components/FormularioPrecio/FormularioPrecio';
const obtenerCategorias = async (setCategorias) => {
    try {
        // Realizar la solicitud GET
        const response = await axios.get('https://grow-backend.up.railway.app/api/categoria');
        
        // Desestructurar y obtener solo los campos "id" y "nombre" de cada publicación
        const categoriasData = response.data.map(categoria => ({
            id: categoria._id,
            nombre: categoria.nombre
        }));

        // Actualizar el estado con los datos filtrados
        setCategorias(categoriasData);
    } catch (error) {
        console.error('Error al obtener las categorias:', error);
    }
};

function Upload() {
    const [isPrecioVisible, setIsPrecioVisible] = useState(false);
    const [isUploadVisible, setIsUploadVisible] = useState(true);
    const [calculoPrecio, setCalculoPrecio] = useState({});
    const [finalMaterials, setFinalMaterials] = useState([]);
    const [pubId, setPublicationId] = useState("")
    const [categorias, setCategorias] = useState([]);
    const id_emprendimiento=localStorage.getItem('entrepreneurId') || null;
    console.log(id_emprendimiento)
    const [values, setValues] = useState({
        precio: "",
        descuento: "",
    });
    const[nombre, setNombre] = useState("")
    const[tipo, setTipo] = useState("")
    const[descripcion, setDescripcion] = useState("")
    const [id_categoria, setCategoria] = useState("")
    const[imgfiles, setImgfile] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [nombreError, setNombreError] = useState('');
    const [tipoError, setTipoError] = useState('');
    const [catError, setCatError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        obtenerCategorias(setCategorias);
    }, []);
    const handleCheckboxChange = (e) => {
        setIsDisabled(e.target.checked); // Habilita o deshabilita el input según el estado del checkbox
        if(e.target.checked){
            setValues({
                precio: "",
                descuento: "",
            });
        }
    };
    const handleGoBack = () => {
        navigate(-1); // Navega a la página anterior
    };
    
    const handleImageChanges = (files) => {
        setImgfile(files)
    };
    
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Products'); // Reemplaza con tu preset
        formData.append('cloud_name', 'dgchowyad'); // Reemplaza con tu nombre de cloud
    
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dgchowyad/image/upload', formData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            return null;
        }
    };
    const togglePrecioVisibility = () => {
        setIsPrecioVisible(!isPrecioVisible);
        setIsUploadVisible(!isUploadVisible); 
    };
    const handleSubmit = async () => {
        console.log(calculoPrecio);
        let urls = [""]; // Manejo de imágenes
        let hasError = false;
    
        // Validación de campos
        if (!nombre) { setNombreError('Este campo es obligatorio'); hasError = true; }
        if (!tipo) { setTipoError('Este campo es obligatorio'); hasError = true; }
        if (!id_categoria) { setCatError('Este campo es obligatorio'); hasError = true; }
        if (hasError) return;
    
        setIsLoading(true);
        setIsOpen(true);
    
        // Subir imágenes
        if (imgfiles.length > 0) {
            try {
                const imageUploadPromises = imgfiles.map((file) =>
                    handleImageUpload(file) // Subir cada archivo
                );
                urls = await Promise.all(imageUploadPromises);
            } catch (error) {
                console.error('Error al subir imágenes:', error);
                setIsLoading(false);
                setIsOpen(false);
                return;
            }
        }
    
        // Crear el objeto de publicación
        const formData = {
            id_emprendimiento,
            nombre,
            tipo,
            precio: parseFloat(parseFloat(values.precio || 0).toFixed(2)),
            descuento: parseInt(values.descuento, 10) || 0,
            descripcion,
            id_categoria,
            imagenes: urls,
            calculo_precio: calculoPrecio, // Incluye calculoPrecio aquí
        };
    
        try {
            const response = await axios.post(
                'https://grow-backend.up.railway.app/api/publicacion/crear',
                formData
            );
    
            const publicationId = response.data._id;
            setPublicationId(publicationId)
            const updatePromises = finalMaterials.map((material) =>
                axios.put(
                    `https://grow-backend.up.railway.app/api/materialusado/${material._id}`,
                    { id_publicacion: publicationId }
                )
            );
    
            await Promise.all(updatePromises);
            console.log('Publicación creada exitosamente.');
            setIsLoading(false);
            openModal();
        } catch (error) {
            console.error('Error al crear publicación:', error);
            setIsLoading(false);
            setIsOpen(false);
            alert('Hubo un error al crear la publicación.');
        }
    };

    const comprobarNegativo = (e) => {
        const { name, value } = e.target;
    
        // Valida que el valor no sea negativo
        if (value === "" || (Number(value) >= 1 && !isNaN(value))) {
            setValues((prevValues) => ({
            ...prevValues,
            [name]: value, // Actualiza solo el input correspondiente
            }));
        }
    };
    const handleAccept = () => {
        closeModal();
        navigate(`/publicacion?publicacion=${pubId}`);
    };
    return (
        <div>
            {/* Modal */}
            <ModalLoading isOpen={isOpen} isLoading={isLoading} text={'Se creó la publicación exitosamente'} loadingText={"Creando publicación..."}>
                {!isLoading && <button className='btn btn-success' onClick={handleAccept}>Aceptar</button>}
            </ModalLoading>

            {/* Sección Principal */}
            <div style={{ display: isUploadVisible ? 'block' : 'none' }}>
            <main className={styles['main-container']} >
                <section className={styles['info-general']}>
                    <h2>Información General</h2>
                    <label>Nombre</label>
                    <input type="text" placeholder="Introducir nombre" onChange={(e) => setNombre(e.target.value)}/>
                    {nombreError && <p className={styles['error-message']}>{nombreError}</p>}
                    <label>Tipo</label>
                    <select defaultValue="" onChange={(e) => setTipo(e.target.value)}>
                        <option value="" disabled hidden>Seleccione una opción</option>
                        <option value="producto">Producto</option>
                        <option value="servicio">Servicio</option>
                    </select>
                    {tipoError && <p className={styles['error-message']}>{tipoError}</p>}
                    <label>Descripción</label>
                    <textarea placeholder="..." onChange={(e) => setDescripcion(e.target.value)}/>
                </section>

                <section className={styles.imagen}>
                    <h2>Imagen</h2>
                    <div className={styles['image-upload']}>
                        <FilesDropzone setFile={handleImageChanges}/>
                    </div>
                </section>

                <section className={styles.precios}>
                    <h2>Precios</h2>
                    <input type="number" placeholder="Precio base" name='precio' value={values.precio} onChange={comprobarNegativo} disabled={isDisabled}/>
                    <div className={styles.calcContainer}>
                        <button onClick={togglePrecioVisibility} className={styles.botonPrecio}>Calcular Precio</button>
                        <label className={styles.labelPrecio}>
                        <input type="checkbox" className={styles.inputPrecio} value={0} checked={isDisabled} onChange={handleCheckboxChange} />
                        <span className={styles.checkPrecio}></span>
                        Precio a convenir
                        </label>
                    </div>
                    <input type="number" placeholder="Porcentaje de descuento (%)" name='descuento' value={values.descuento} onChange={comprobarNegativo} disabled={isDisabled}/>
                </section>

                <section className={styles.categoria}>
                    <h2>Categoría</h2>
                    <select onChange={(e) => setCategoria(e.target.value)}>
                        <option>Selecciona una Categoría</option>
                        {categorias.map(categoria => (
                            <option value={categoria.id}>
                                {categoria.nombre}
                            </option>
                ))}
                    </select>
                    {catError && <p className={styles['error-message']}>{catError}</p>}
                </section>

                <div className={styles.buttons}>
                    <button className={styles['save-btn']}>Guardar como borrador</button>
                    <button className={styles['publish-btn']} onClick={handleSubmit}>Publicar ahora</button>
                </div>
                
            </main>
            </div>
            {isPrecioVisible && 
            <FormularioPrecio
            id_emprendimiento={id_emprendimiento}
            setIsUploadVisible={setIsUploadVisible}
            setIsPrecioVisible={setIsPrecioVisible} 
            setValues={setValues}
            setFinalMaterials={setFinalMaterials}
            setCalculoPrecio={setCalculoPrecio}
            />}
        </div>
    );
}

export default Upload;
