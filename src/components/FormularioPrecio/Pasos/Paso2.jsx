import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import styles from './Pasos.module.css';

const Paso2 = ({ materials, setUsedMaterials, nextStep, prevStep }) => {
    const [selectedUnits, setSelectedUnits] = useState([]); // Unidades seleccionadas
    const [selectedQuantities, setSelectedQuantities] = useState([]); // Cantidades usadas

    // Opciones de unidades posibles
    const unitOptions = [
        { value: 'kg', label: 'kg' },
        { value: 'g', label: 'g' },
        { value: 'm', label: 'm' },
        { value: 'cm', label: 'cm' },
        { value: 'l', label: 'l' },
        { value: 'ml', label: 'ml' },
    ];

    // Filtrar las opciones de unidad disponibles según el material seleccionado
    const getFilteredUnitOptions = (unidadOriginal) => {
        // Aquí filtramos las unidades según la unidad original del material
        if (unidadOriginal === 'kg' || unidadOriginal==='g') {
            return unitOptions.filter(option => option.value === 'kg' || option.value === 'g');
        } else if (unidadOriginal === 'l' || unidadOriginal==='ml') {
            return unitOptions.filter(option => option.value === 'l' || option.value === 'ml');
        }
        else if(unidadOriginal==='m' || unidadOriginal==='cm'){
            return unitOptions.filter(option => option.value === 'm' || option.value === 'cm');
        }
        // Si no hay coincidencias, devolver todas las unidades
        return unitOptions;
    };

    // Manejar la selección de unidad
    const handleUnitChange = (index, selectedOption) => {
        const updatedUnits = [...selectedUnits];
        updatedUnits[index] = selectedOption;
        setSelectedUnits(updatedUnits);
    };

    // Manejar la cantidad utilizada de un material
    const handleQuantityChange = (index, event) => {
        const updatedQuantities = [...selectedQuantities];
        updatedQuantities[index] = event.target.value;
        setSelectedQuantities(updatedQuantities);
    };

    // Subir los materiales usados al backend en paralelo
    const submitUsedMaterials = async () => {
        const usedMaterials = materials.map((material, index) => {
            const cantidadUsada = parseFloat(selectedQuantities[index]) || 0; // Asegurarse que sea un número
            return {
                id_material: material._id, // ID del material
                cantidad_usada: cantidadUsada,  // Enviar como número
                unidad_original: selectedUnits[index]?.value || '',
            };
        });

        try {
            // Crear un array de promesas para enviar todos los materiales usados simultáneamente
            const promises = usedMaterials.map((usedMaterial) => 
                axios.post('http://localhost:5000/api/materialusado/crear', usedMaterial)
            );

            // Esperar a que todas las solicitudes se resuelvan
            const responses = await Promise.all(promises);
            
            // Extraer los objetos completos de las respuestas del backend
            const createdMaterials = responses.map((response) => response.data);

            // Guardar los objetos completos de los materiales creados en el estado del formulario
            setUsedMaterials(createdMaterials);

            // Una vez que todas las solicitudes se completan, pasar al siguiente paso
            nextStep();
        } catch (error) {
            console.error('Error al subir materiales usados:', error);
        }
    };

    return (
        <div className={styles['mainContainer']}>
            <h2 className={styles['title']}>Paso 2: Especifica las cantidades utilizadas</h2>
            <main className={styles['main-container']}>
            {/* Recorrer los materiales seleccionados */}
            {materials.map((material, index) => (
                <section key={index} className={styles['info-general']}>
                    <h4>{material.nombre}</h4>
                    <hr />
                    <label>Cantidad Usada:</label>
                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={selectedQuantities[index] || ''}
                        onChange={(e) => handleQuantityChange(index, e)}
                    />
                    <div>
                        <label>Unidad:</label>
                        <Select
                            value={selectedUnits[index]}
                            onChange={(selectedOption) => handleUnitChange(index, selectedOption)}
                            options={getFilteredUnitOptions(material.unidad_original)}
                            placeholder="Selecciona una unidad"
                            className={styles['select-paso2']}
                        />
                    </div>
                </section>
            ))}
            </main>
            <div className="buttons">
            <button onClick={prevStep} className={styles['cancel-btn']}>Volver</button>
            <button onClick={submitUsedMaterials} className={styles['next-btn']}>Siguiente</button>
            </div>
        </div>
    );
};

export default Paso2;
