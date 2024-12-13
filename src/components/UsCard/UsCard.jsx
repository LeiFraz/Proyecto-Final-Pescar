// Importa React
import React from "react";
import styles from "./UsCard.module.css";

const CardUs = ({ image, name, role, position, link }) => {
    const handleClick = () => {
        window.open(link, "_blank");
      };
    return (
        <div className={`${styles.card} ${styles[position]}`} onClick={handleClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleClick()}>
          <div className={styles.imageWrapper}>
            <img src={image} alt={`${name}'s profile`} className={styles.cardImage} />
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardName}>{name}</h3>
            <p className={styles.cardRole}>{role}</p>
          </div>
        </div>
    );
};

// Componente principal para las cards escalonadas
const UsCard = ({ people }) => {
  return (
    <div className={styles.staggeredCardsContainer}>
      {people.map((person, index) => (
        <CardUs
          key={index}
          image={person.image}
          name={person.name}
          role={person.role}
          link={person.link}
          position={index % 2 === 0 ? "left" : "right"}
        />
      ))}
    </div>
  );
};

export default UsCard;
