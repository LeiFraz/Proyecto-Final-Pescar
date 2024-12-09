// components/Card.js
import React from "react";
import "./Card.css";

const Card = ({ title, image, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default Card;
