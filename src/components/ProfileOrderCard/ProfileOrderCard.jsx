import React from "react";
import styles from "./ProfileOrderCard.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const ProfileOrderCard = ({ id_orden }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
    const fetchImages = async () => {
        try {
        // 1. Obtener la orden usando el `id_orden`
        const orderResponse = await axios.get(`http://localhost:5000/api/orden/${id_orden}`);
        const orderData = orderResponse.data;
        console.log(orderData)
        // 2. Extraer las publicaciones (máximo 3)
        const publicaciones = orderData.publicaciones.slice(0, 3);

        // 3. Consultar las imágenes de las publicaciones
        const imageRequests = publicaciones.map((pub) =>
          axios.get(`http://localhost:5000/api/publicacion/${pub.id_publicacion}`)
        );

        const imageResponses = await Promise.all(imageRequests);

        // 4. Obtener la primera imagen de cada publicación
        const imageUrls = imageResponses.map((res) => res.data.imagenes[0]);

        // 5. Actualizar el estado con las URLs
        setImages(imageUrls);
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      }
    };

    fetchImages();
  }, [id_orden]);
  return (
    <a className={styles.cardTitle} href={`/orden?orden=${id_orden}`}>
    <div className={styles.cardContainer}>
      <div className={styles.imageStack}>
        {images.slice(0, 3).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Imagen ${index + 1}`}
            className={`${styles.stackedImage} ${styles[`stackedImage${index}`]}`}
          />
        ))}
      </div>
      <div className={styles.cardName}>Orden ID: {id_orden}</div>
    </div>
    </a>
  );
};

export default ProfileOrderCard;
