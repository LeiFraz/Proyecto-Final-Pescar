// Importamos el CSS y otros recursos
import axios from 'axios';
import ModalLoading from '../../components/Modals/ModalLoading';
import { useEffect, useState } from 'react';
import OneFileDropzone from '../../components/OneFileDropzone/OneFileDropzone';
import { useNavigate } from 'react-router-dom';
import styles from './CreateEntrepreneur.module.css'

function CreateEntrepreneur() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipo_emprendimiento, setTipo] = useState('');
    const [foto_perfil, setFotoPerfil] = useState(null);
    const [foto_banner, setFotoBanner] = useState(null);
    const id_usuario=localStorage.getItem("userId") || null;
    console.log(id_usuario)
    const [nombreError, setNombreError] = useState('');
    const [tipoError, setTipoError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navega a la página anterior
    };
    
    const handleProfileChange = (file) => {
        setFotoPerfil(file);
    };
    const handleBannerChange = (file) => {
        setFotoBanner(file);
    };
    
    useEffect(() => {
        if(id_usuario == null){
            navigate("/inicio");
        }
    }, []);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Entrepreneurs'); // Reemplaza con tu preset
        formData.append('cloud_name', 'dgchowyad'); // Reemplaza con tu nombre de cloud
    
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dgchowyad/image/upload', formData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            return null;
        }
    };

    const handleSubmit = async () => {
        let perfilImageUrl = "https://placehold.co/400x400";
        let bannerImageUrl = "https://placehold.co/800x400";

        let hasError = false;
        if (!nombre) {
            setNombreError('Este campo es obligatorio');
            hasError=true;
        } else {
            setNombreError('');
        }

        if (!tipo_emprendimiento) {
            setTipoError('Este campo es obligatorio');
            hasError=true;
        } else {
            setTipoError('');
        }

        if (hasError) {
            return;
        }
        setIsLoading(true);
        setIsOpen(true);
        try {
            const imageUploadPromises = [];
    
            if (foto_perfil !== null) {
                imageUploadPromises.push(handleImageUpload(foto_perfil).then(url => perfilImageUrl = url));
            }
    
            if (foto_banner !== null) {
                imageUploadPromises.push(handleImageUpload(foto_banner).then(url => bannerImageUrl = url));
            }
    
            // Esperamos que ambas subidas de imágenes terminen
            await Promise.all(imageUploadPromises);
        }catch (error) {
            console.error('Error al crear emprendimiento:', error);
        }
            // Verificamos si las URLs de las imágenes se generaron correctamente
            if (!perfilImageUrl || !bannerImageUrl) {
                alert('Hubo un error al subir las imágenes');
                return;
            }
        console.log(id_usuario,nombre,descripcion,tipo_emprendimiento,perfilImageUrl,bannerImageUrl)
        const formData = {
        id_usuario,
        nombre_emprendimiento:nombre,
        descripcion,
        tipo_emprendimiento,
        foto_perfil: perfilImageUrl,
        foto_banner: bannerImageUrl
        };
        console.log(formData)
    
        try {
        const entrepreneurResponse = await axios.post('http://localhost:5000/api/emprendimiento/crear', formData);
        console.log(entrepreneurResponse)
        localStorage.setItem('entrepreneurId', entrepreneurResponse.data._id)
        localStorage.setItem('entrepreneurName', entrepreneurResponse.data.nombre_emprendimiento)
        await axios.put(`http://localhost:5000/api/usuario/${id_usuario}`, {
            rol: "emprendedor",
        });
        localStorage.setItem('tipoPerfil',"emprendedor")
        setIsLoading(false);
        openModal();
        } catch (error) {
        console.error('Error al crear emprendimiento:', error);
        }
    };

    return (
        <div>
            {/* Modal */}
            <ModalLoading isOpen={isOpen} isLoading={isLoading} text={'Se creó el emprendimiento exitosamente'} loadingText={"Creando emprendimiento..."}>
                {!isLoading && <button className='btn btn-success' onClick={closeModal}>Aceptar</button>}
            </ModalLoading>

            {/* Sección Principal */}
            <main className={styles['main-container']}>
                <section className={styles['info-general']}>
                    <h2>Información General</h2>
                    <label>Nombre del emprendimiento</label>
                    <input type="text" placeholder="Introducir nombre" onChange={(e) => setNombre(e.target.value)}/>
                    {nombreError && <p className={styles['error-message']}>{nombreError}</p>}
                    <label>¿Qué ofrece?</label>
                    <select defaultValue="" onChange={(e) => setTipo(e.target.value)}>
                        <option value="" disabled hidden>Seleccione una opción</option>
                        <option value="Productos">Productos</option>
                        <option value="Servicios">Servicios</option>
                        <option value="Ambos">Ambos</option>
                    </select>
                    {tipoError && <p className={styles['error-message']}>{tipoError}</p>}
                    <label>Descripción</label>
                    <textarea placeholder="..."  onChange={(e) => setDescripcion(e.target.value)}/>
                </section>

                <section className={styles['imagen']}>
                    <h2>Imagenes</h2>
                    <label>Foto de perfil</label>
                    <OneFileDropzone setFile={handleProfileChange}/>
                    <label>Foto de portada</label>
                    <OneFileDropzone setFile={handleBannerChange}/>
                </section>

                <div className={styles['buttons']}>
                    <button className={styles['cancel-btn']} onClick={handleGoBack}>Cancelar</button>
                    <button className={styles['publish-btn']} onClick={handleSubmit}>Crear emprendimiento</button>
                </div>
            </main>
        </div>
    );
}

export default CreateEntrepreneur;
