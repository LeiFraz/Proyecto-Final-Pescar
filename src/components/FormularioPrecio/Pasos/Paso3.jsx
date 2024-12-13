import React, { useState, useEffect } from 'react';
import styles from './Pasos.module.css';
import axios from 'axios';

const Paso3 = ({ 
    usedMaterials, 
    setPrecioFinal, 
    prevStep, 
    setIsUploadVisible, 
    setIsPrecioVisible, 
    setValues, 
    setFinalMaterials, 
    setCalculoPrecio // Ahora usamos un setter más representativo
}) => {
    const [profitType, setProfitType] = useState('percentage'); // Tipo de ganancia: 'percentage' o 'fixed'
    const [profitValue, setProfitValue] = useState(''); // Valor de ganancia (vacío inicialmente)
    const [finalPrice, setFinalPrice] = useState(0); // Precio final con ganancia
    const [materialsWithNames, setMaterialsWithNames] = useState([]);
    const [precioTransparente, setPrecioTransparente] = useState(false); // Estado de la checkbox

    // Calcular el precio total de los materiales usados
    const totalPrice = usedMaterials.reduce((acc, material) => acc + material.precio, 0);

    // Calcular el precio final y actualizar calculo_precio automáticamente
    useEffect(() => {
        const profit = parseFloat(profitValue) || 0; // Convertir el valor a número o usar 0 si está vacío
        let final = totalPrice;
        let ganancia = 0;

        if (profitType === 'percentage') {
            ganancia = (profit / 100) * totalPrice;
            final += ganancia; // Añadir porcentaje de ganancia
        } else if (profitType === 'fixed') {
            ganancia = profit;
            final += ganancia; // Añadir ganancia fija
        }

        // Actualizar estados
        setFinalPrice(final);
        setPrecioFinal(final); // Guardar en el estado global

        // Actualizar el objeto completo de calculo_precio
        setCalculoPrecio({
            precio_transparente: precioTransparente,
            ganancia: parseFloat(ganancia.toFixed(2)), // Redondear la ganancia a 2 decimales
        });
    }, [profitType, profitValue, totalPrice, precioTransparente, setPrecioFinal, setCalculoPrecio]);

    const obtenerNombre = async (id) => {
        try {
            const response = await axios.get(`https://grow-backend.up.railway.app/api/material/${id}`);
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
    
        // Actualizar valores generales
        setValues(prevValues => ({
            ...prevValues,
            precio: finalPrice.toFixed(2),
        }));
        setFinalMaterials(usedMaterials);
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
                    <label className={styles.labelPrecio}>
                        <input 
                            type="checkbox" 
                            className={styles.inputPrecio}
                            checked={precioTransparente}
                            onChange={(e) => setPrecioTransparente(e.target.checked)}
                        />
                        <span className={styles.checkPrecio}></span>
                        Activar precios transparentes
                    </label>
                </section>
            </main>
            <div className={styles.buttons}>
                <button onClick={prevStep} className={styles['cancel-btn']}>Volver</button>
                <button className={styles['next-btn']} onClick={handleConfirmarPrecio}>Confirmar Precio</button>
            </div>
        </div>
    );
};

export default Paso3;
