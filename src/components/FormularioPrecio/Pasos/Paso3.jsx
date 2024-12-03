import React, { useState, useEffect } from 'react';
import styles from './Pasos.module.css';
import axios from 'axios';

const Paso3 = ({ usedMaterials, setPrecioFinal, prevStep, setIsUploadVisible, setIsPrecioVisible,setValues,setFinalMaterials }) => {
    const [profitType, setProfitType] = useState('percentage'); // Tipo de ganancia: 'percentage' o 'fixed'
    const [profitValue, setProfitValue] = useState(''); // Permitir estado vacío
    const [finalPrice, setFinalPrice] = useState(0); // Precio final con ganancia
    const [materialsWithNames, setMaterialsWithNames] = useState([]);

    // Calcular el precio total de los materiales usados
    const totalPrice = usedMaterials.reduce((acc, material) => acc + material.precio, 0);

    // Calcular el precio final con ganancia automáticamente al cambiar inputs
    useEffect(() => {
        const profit = parseFloat(profitValue) || 0; // Convertir el valor a número o usar 0 si está vacío
        let final = totalPrice;

        if (profitType === 'percentage') {
            final += (profit / 100) * totalPrice; // Añadir porcentaje de ganancia
        } else if (profitType === 'fixed') {
            final += profit; // Añadir ganancia fija
        }

        setFinalPrice(final); // Actualizar el precio final
        setPrecioFinal(final); // Guardar en el estado global
    }, [profitType, profitValue, totalPrice, setPrecioFinal]);

    const obtenerNombre = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/material/${id}`);
            const material = response.data; 
            return material.nombre; 
        } catch (error) {
            console.error('Error al obtener el material:', error);
            return "Error desconocido"; 
        }
    };

    const obtenerCantidad = (cantidad, unidad) => {
        if (unidad) {
            switch(unidad) {
                case 'kg':
                    cantidad = cantidad / 1000;
                    break;
                case 'l':
                    cantidad = cantidad / 1000;
                    break;
                case 'm':
                    cantidad = cantidad / 100;
                    break;
                default:
                    cantidad = cantidad;
            }   
        }
        return `${cantidad} ${unidad}`;
    };
    const handleConfirmarPrecio = () => {
        // Actualizar el precio base en el formulario principal
        setValues(prevValues => ({
            ...prevValues,
          precio: finalPrice.toFixed(2) // Convertir a string con 2 decimales
        }));
        console.log(usedMaterials);
        setFinalMaterials(usedMaterials);
        // Volver al formulario principal
        setIsUploadVisible(true);
        setIsPrecioVisible(false);
    };

    useEffect(() => {
        const fetchMaterials = async () => {
            const enrichedMaterials = await Promise.all(
                usedMaterials.map(async (material) => {
                    const name = await obtenerNombre(material.id_material);
                    return { ...material, nombre: name };
                })
            );
            setMaterialsWithNames(enrichedMaterials);
        };

        fetchMaterials();
    }, [usedMaterials]);

    return (
        <div className={styles['mainContainer']}>
            <h2 className={styles['title']}>Paso 3: Resumen de Precio</h2>
            <main className={styles['main-container']}>
                <section className={styles['info-general']}>
                    <h3>Configurar Ganancia</h3>
                    <hr />
                    <p><strong>Total Precio de Materiales:</strong> ${totalPrice.toFixed(2)}</p>
                    <div>
                        <label className={styles['label-radio']}>
                            <input className={styles['radio-btn']}
                                type="radio"
                                value="percentage"
                                checked={profitType === 'percentage'}
                                onChange={() => setProfitType('percentage')}
                            />
                            Ganancia por Porcentaje
                        </label>
                        <label className={styles['label-radio']}>
                            <input className={styles['radio-btn']}
                                type="radio"
                                value="fixed"
                                checked={profitType === 'fixed'}
                                onChange={() => setProfitType('fixed')}
                            />
                            Ganancia Fija
                        </label>
                    </div>

                    <div>
                    <label>
                        {profitType === 'percentage' ? 'Porcentaje de Ganancia (%):' : 'Ganancia Fija ($):'}
                    </label>
                    <input
                        type="number"
                        value={profitValue}
                        placeholder={profitType === 'percentage' ? 'Introduce un porcentaje' : 'Introduce una cantidad fija'}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (value >= 0 || e.target.value === '') {
                                setProfitValue(e.target.value);
                            }
                        }}
                    />
                    </div>
                </section>
                <section className={styles['info-general']}>
                    <h3>Resumen precio final</h3>
                    <hr />
                    <div className={styles['resumen']}>
                        <ul>
                            {materialsWithNames.map((material) => (
                                <li key={material.id}>
                                    {obtenerCantidad(material.cantidad_usada, material.unidad_original)} de {material.nombre}: ${material.precio.toFixed(2)}
                                </li>
                            ))}
                            <hr />
                            <li>
                                Precio Materiales: ${totalPrice.toFixed(2)}
                            </li>
                            <hr />
                            <li>
                                Ganancia: ${profitType === 'percentage' 
                                    ? ((parseFloat(profitValue) || 0) / 100 * totalPrice).toFixed(2) 
                                    : (parseFloat(profitValue) || 0).toFixed(2)}
                            </li>
                            <hr />
                            <p><strong>Precio Final: ${finalPrice.toFixed(2)}</strong></p>
                        </ul>
                    </div>
                </section>
            </main>
            <div className="buttons">
            <button onClick={prevStep} className={styles['cancel-btn']}>Volver</button>
            <button className={styles['next-btn']} onClick={handleConfirmarPrecio}>Confirmar Precio</button>
            </div>
        </div>
    );
};

export default Paso3;
