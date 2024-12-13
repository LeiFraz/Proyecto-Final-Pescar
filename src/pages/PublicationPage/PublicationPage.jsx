import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PublicationDetail from '../../components/PublicationDetail/PublicationDetail';

const obtenerPublicacion = async (publicacion, setPublicationData) => {
    try {
        const response = await axios.get(`https://grow-backend.up.railway.app/api/publicacion/${publicacion}`);
        const publicacionData = response.data;
        setPublicationData(publicacionData); // Guarda todo el resultado de la API
    } catch (error) {
        console.error('Error al obtener la publicación:', error);
    }
};

function PublicationPage() {
    const location = useLocation(); // Usa el hook en la raíz del componente
    const [publicationData, setPublicationData] = useState(null); // Cambia a un estado genérico

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const publicacion = params.get('publicacion');
        if (publicacion) {
            obtenerPublicacion(publicacion, setPublicationData);
        }
    }, [location]);

    if (!publicationData) {
        return <p>Cargando...</p>; // Muestra un indicador de carga mientras llega la información
    }

    return (
        <PublicationDetail
            images={publicationData.imagenes}
            productName={publicationData.nombre}
            profileName={"test"}
            originalPrice={publicationData.precio_original || publicationData.precio_actual} 
            discount={publicationData.descuento}
            description={publicationData.descripcion}
            transparentPrice={publicationData.calculo_precio.precio_transparente}
            profit={publicationData.calculo_precio.ganancia}
            id_publicacion={publicationData._id}
            id_emprendimiento={publicationData.id_emprendimiento}
        />
    );
}

export default PublicationPage;
