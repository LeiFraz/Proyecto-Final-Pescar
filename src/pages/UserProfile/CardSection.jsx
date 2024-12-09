// components/CardSection.js
import React from "react";
import Card from "./Card";
import "./CardSection.css";

const CardSection = ({ title, items }) => {
  return (
    <div className="card-section">
      <h3>{title}</h3>
      {items.length > 0 ? (
        <div className="card-container">
          {items.map((item) => (
            <Card key={item.id} title={item.title} image={item.image} />
          ))}
        </div>
      ) : (
        <p>No hay elementos para mostrar.</p>
      )}
    </div>
  );
};

export default CardSection;
