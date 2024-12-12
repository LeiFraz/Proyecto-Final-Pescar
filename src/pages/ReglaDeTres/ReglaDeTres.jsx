import React, { useState } from "react";

const ReglaDeTres = () => {
  const [baseCantidad, setBaseCantidad] = useState("");
  const [basePrecio, setBasePrecio] = useState("");
  const [nuevaCantidad, setNuevaCantidad] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcularReglaDeTres = () => {
    // Convertimos los valores a números
    const baseCantidadNum = parseFloat(baseCantidad);
    const basePrecioNum = parseFloat(basePrecio);
    const nuevaCantidadNum = parseFloat(nuevaCantidad);

    // Validamos los datos
    if (
      isNaN(baseCantidadNum) ||
      isNaN(basePrecioNum) ||
      isNaN(nuevaCantidadNum) ||
      baseCantidadNum <= 0
    ) {
      setResultado("Por favor, introduce valores válidos.");
      return;
    }

    // Aplicamos la fórmula de la regla de tres simple
    const resultadoCalculado = (nuevaCantidadNum * basePrecioNum) / baseCantidadNum;

    setResultado(`El costo es: ${resultadoCalculado.toFixed(2)} unidades monetarias.`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Calculadora de Regla de Tres Simple</h2>
      <div>
        <label>
          Cantidad base (ej: 4000 gramos):
          <input
            type="number"
            value={baseCantidad}
            onChange={(e) => setBaseCantidad(e.target.value)}
            placeholder="Cantidad base"
          />
        </label>
      </div>
      <div>
        <label>
          Precio base (ej: 5000):
          <input
            type="number"
            value={basePrecio}
            onChange={(e) => setBasePrecio(e.target.value)}
            placeholder="Precio base"
          />
        </label>
      </div>
      <div>
        <label>
          Nueva cantidad (ej: 300 gramos):
          <input
            type="number"
            value={nuevaCantidad}
            onChange={(e) => setNuevaCantidad(e.target.value)}
            placeholder="Nueva cantidad"
          />
        </label>
      </div>
      <button onClick={calcularReglaDeTres}>Calcular</button>
      {resultado && <p>{resultado}</p>}
    </div>
  );
};

export default ReglaDeTres;