import React, { useState } from "react";
import styles from "./QuantitySelector.module.css";

const QuantitySelector = ({ initialQuantity = 1, min = 1, max = 10, onChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity); // Llama a un callback si es necesario
    }
  };

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  const handleInputChange = (e) => {
    const value = Math.max(min, Math.min(max, Number(e.target.value) || min));
    setQuantity(value);
    onChange?.(value);
  };

  return (
    <div className={styles.quantitySelector}>
      <button className={styles.controlButton} onClick={handleDecrease} disabled={quantity <= min}>
        -
      </button>
      <input
        type="number"
        className={styles.quantityInput}
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
      />
      <button className={styles.controlButton} onClick={handleIncrease} disabled={quantity >= max}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;