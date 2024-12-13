import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import styles from './Pasos.module.css'
const Paso1 = ({ setMaterials, nextStep, id_emprendimiento, setIsUploadVisible, setIsPrecioVisible }) => {
    const [availableMaterials, setAvailableMaterials] = useState([]); // Materiales disponibles para seleccionar
    const [selectedMaterials, setSelectedMaterials] = useState([null]); // Materiales seleccionados, empieza con 1 selector vacío
    const [newMaterial, setNewMaterial] = useState({
        id_emprendimiento: id_emprendimiento,
        nombre: '',
        cantidad_original: 0,
        unidad_original: null,
        precio_base: 0,
    });
    const unitOptions = [
        { value: 'kg', label: 'kg' },
        { value: 'g', label: 'g' },
        { value: 'm', label: 'm' },
        { value: 'cm', label: 'cm' },
        { value: 'l', label: 'l' },
        { value: 'ml', label: 'ml' },
    ];
    // Cargar materiales desde el backend al cargar el componente
    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await axios.get(`https://grow-backend.up.railway.app/api/material/buscar/${id_emprendimiento}`); // Endpoint para obtener materiales
                const options = response.data.map((material) => ({
                    value: material._id,
                    label: material.nombre,
                    ...material,
                }));
                setAvailableMaterials(options);
            } catch (error) {
                console.error('Error al obtener materiales:', error);
            }
        };
        fetchMaterials();
    }, [id_emprendimiento]);

    // Agregar un nuevo selector dinámico
    const addMaterialField = () => {
        setSelectedMaterials([...selectedMaterials, null]); // Añadir un nuevo campo Select vacío
    };

    // Manejar el cambio en un campo Select
    const handleMaterialChange = (index, selectedOption) => {
        const updatedMaterials = [...selectedMaterials];
        updatedMaterials[index] = selectedOption;
        setSelectedMaterials(updatedMaterials);
    };

    // Eliminar un campo Select y su material asociado
    const removeMaterialField = (index) => {
        const updatedMaterials = selectedMaterials.filter((_, i) => i !== index);
        setSelectedMaterials(updatedMaterials);
    };

    const [errors, setErrors] = useState({});
    const [selectedError, setSelectedError] = useState("");
    const validateNewMaterial = () => {
        const errors = {};

        if (!newMaterial.nombre.trim()){
            errors.nombre = 'El campo "Nombre" es obligatorio.';
        } 
        if (newMaterial.cantidad_original <= 0 || isNaN(newMaterial.cantidad_original)){
            errors.cantidad_original = 'El campo "Cantidad" debe ser mayor a 0.';
        }
        if (!newMaterial.unidad_original){
            errors.unidad_original = 'El campo "Unidad" es obligatorio.';
        } 
        if (!newMaterial.precio_base || newMaterial.precio_base <= 0 || isNaN(newMaterial.precio_base)) {
            console.log("entra?")
            errors.precio_base = 'El campo "Precio" debe ser mayor a 0.';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0; 
    };
    const validateOneMaterial = () => {
        let error=null
        if (selectedMaterials.length===0){
            error="Debe seleccionar al menos un material"
        }
        setSelectedError(error);
        return error===null
    };
    const createMaterial = async () => {
        if (!validateNewMaterial() || !validateOneMaterial){
            return;
        } 
        try {
            const response = await axios.post('https://grow-backend.up.railway.app/api/material/crear', newMaterial); // Endpoint para crear un material
            const createdMaterial = response.data;

            // Agregar el nuevo material a las opciones disponibles
            const newOption = {
                value: createdMaterial._id,
                label: createdMaterial.nombre,
                ...createdMaterial,
            };
            setAvailableMaterials([...availableMaterials, newOption]);

            // Actualizar el primer campo select con el material recién creado
            setSelectedMaterials([newOption, ...selectedMaterials]); // Lo coloca en la primera posición

            // Limpiar el formulario de nuevo material
            setNewMaterial({
                id_emprendimiento: id_emprendimiento,
                nombre: '',
                cantidad_original: 0,
                unidad_original: null, // Asegúrate de resetear a null
                precio_base: 0,
            });
        } catch (error) {
            console.error('Error al crear material:', error);
        }
    };

    // Confirmar los materiales seleccionados y pasar al siguiente paso
    const confirmMaterials = () => {
        const confirmedMaterials = selectedMaterials.filter((material) => material !== null);
        if (confirmedMaterials.length===0){
            setSelectedError("Debe seleccionar al menos un material")
            return;
        }
        setMaterials(confirmedMaterials);
        nextStep();
    };
    const handleCancel = () => {
        // Función para volver al formulario principal
        setIsUploadVisible(true);
        setIsPrecioVisible(false);
    };
    return (
        <div className={styles['mainContainer']}>
        <h2 className={styles['title']}>Paso 1: Selecciona o Agrega Materiales</h2>
        <main className={styles['main-container']}>
            
            <section className={styles['info-general']}>
            <h3 className={styles['subtitle']}>Seleccionar Materiales existentes:</h3>
            <hr />
            {/* Campos dinámicos de React Select */}
            {selectedMaterials.map((material, index) => (
                <div key={index}>
                    <Select
                        value={material}
                        onChange={(selectedOption) => handleMaterialChange(index, selectedOption)}
                        options={availableMaterials}
                        placeholder="Selecciona un material"
                        className={styles['select']}
                    />
                    
                    <button 
                        onClick={() => removeMaterialField(index)} 
                        className={styles['remove-btn']}
                    >
                        <i className='icon-trash-empty'></i>
                    </button>
                </div>
                
            ))}
            {selectedError && <span className={styles['error']}>{selectedError}</span>}
            <button onClick={addMaterialField} className={styles['add-btn']} ><i className='icon-plus-squared-alt'></i></button>
            </section>
            {/* Crear nuevo material */}
            <section className={styles['agregar-producto']}>
            <h3 className={styles['subtitle']}>Agregar Materiales nuevos:</h3>
            <hr />
            <label>Nombre</label>
            <input
                type="text"
                placeholder="Nombre"
                value={newMaterial.nombre}
                onChange={(e) => setNewMaterial({ ...newMaterial, nombre: e.target.value })}
            />
            {errors.nombre && <span className={styles['error']}>{errors.nombre}</span>}
            <label>Cantidad</label>
            <input
                type="number"
                placeholder="Cantidad"
                value={newMaterial.cantidad_original || ''} // Mostrar vacío si el valor es 0
                onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0 || e.target.value === '') {  // Evitar valores negativos
                        setNewMaterial({ ...newMaterial, cantidad_original: value });
                    }
                }}
            />
            {errors.cantidad_original && <span className={styles['error']}>{errors.cantidad_original}</span>}
            <label>Unidad</label>
            <Select
            value={unitOptions.find(option => option.value === newMaterial.unidad_original) || null} // Usar null si no hay selección
            onChange={(selectedOption) =>
                setNewMaterial({ ...newMaterial, unidad_original: selectedOption ? selectedOption.value : null })
            } // Maneja la posibilidad de que se deseleccione
            options={unitOptions}
            placeholder="Selecciona una unidad"
            className={styles['select-paso2']}
            />
            {errors.unidad_original && <span className={styles['error']}>{errors.unidad_original}</span>}
            <label>Precio</label>
            <input
                type="number"
                placeholder="Precio"
                value={newMaterial.precio_base || ''} // Mostrar vacío si el valor es 0
                onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 0 || e.target.value === '') {  // Evitar valores negativos
                        setNewMaterial({ ...newMaterial, precio_base: value });
                    }
                }}
            />
            {errors.precio_base && <span className={styles['error']}>{errors.precio_base}</span>}
            <button onClick={createMaterial} className={styles['add-btn']}>Agregar Material</button>

            
            </section>
            <div className={styles.buttons}>
                    <button className={styles['cancel-btn']} onClick={handleCancel}>Cancelar</button>
                    <button onClick={confirmMaterials} className={styles['next-btn']}>Siguiente</button>
            </div>
        </main>
        </div>
    );
};

export default Paso1;
