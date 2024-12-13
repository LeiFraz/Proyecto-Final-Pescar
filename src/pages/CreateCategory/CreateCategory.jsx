// Importamos el CSS y otros recursos
import axios from 'axios';
import ModalLoading from '../../components/Modals/ModalLoading';
import { useState } from 'react';
import OneFileDropzone from '../../components/OneFileDropzone/OneFileDropzone';
import { useNavigate } from 'react-router-dom';
import styles from './CreateCategory.module.css'

function CreateCategory() {
    const [nombre, setNombre] = useState('');
    const [foto_perfil, setFotoPerfil] = useState(null);
    const [nombreError, setNombreError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navega a la página anterior
    };
    
    const handleProfileChange = (file) => {
        setFotoPerfil(file);
    };


    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Categories'); // Reemplaza con tu preset
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

        let hasError = false;
        if (!nombre) {
            setNombreError('Este campo es obligatorio');
            hasError=true;
        } else {
            setNombreError('');
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
    
            // Esperamos que ambas subidas de imágenes terminen
            await Promise.all(imageUploadPromises);
        }catch (error) {
            console.error('Error al crear categoria:', error);
        }
            // Verificamos si las URLs de las imágenes se generaron correctamente
            if (!perfilImageUrl) {
                alert('Hubo un error al subir las imágenes');
                return;
            }
        const formData = {
        nombre:nombre,
        imagen: perfilImageUrl,
        };
        console.log(formData)
    
        try {
        await axios.post('https://grow-backend.up.railway.app/api/categoria/crear', formData);
        setIsLoading(false);
        openModal();
        } catch (error) {
        console.error('Error al crear categoria:', error);
        }
    };

    return (
        <div>
            {/* Modal */}
            <ModalLoading isOpen={isOpen} isLoading={isLoading} text={'Se creó la categoria exitosamente'} loadingText={"Creando categoria..."}>
                {!isLoading && <button className='btn btn-success' onClick={closeModal}>Aceptar</button>}
            </ModalLoading>

            {/* Sección Principal */}
            <main className={styles['main-container']}>
                <section className={styles['info-general']}>
                    <h2>Información General</h2>
                    <label>Nombre de la categoría</label>
                    <input type="text" placeholder="Introducir nombre" onChange={(e) => setNombre(e.target.value)}/>
                    {nombreError && <p className={styles['error-message']}>{nombreError}</p>}
                </section>

                <section className={styles['imagen']}>
                    <h2>Imagen</h2>
                    <label>Foto</label>
                    <OneFileDropzone setFile={handleProfileChange}/>
                </section>

                <div className={styles['buttons']}>
                    <button className={styles['cancel-btn']} onClick={handleGoBack}>Cancelar</button>
                    <button className={styles['publish-btn']} onClick={handleSubmit}>Crear categoria</button>
                </div>
            </main>
        </div>
    );
}

export default CreateCategory;
