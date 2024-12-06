import React, { useState } from 'react';
import Paso1 from './Pasos/Paso1';
import Paso2 from './Pasos/Paso2';
import Paso3 from './Pasos/Paso3';


const FormularioPrecio = ({ setIsUploadVisible, setIsPrecioVisible, setValues, setFinalMaterials, setCalculoPrecio }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [materials, setMaterials] = useState([]); // Lista de materiales seleccionados o creados
    const [usedMaterials, setUsedMaterials] = useState([]); // Cantidades usadas y ganancia
    const [precioFinal, setPrecioFinal] = useState(null);

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);
    const id_emprendimiento = "674660e6d82f17d3abaac760"
    const handleCancel = () => {
        // Volver al formulario principal
        setIsUploadVisible(true);
        setIsPrecioVisible(false);
    };
    return (
        <div>
            {currentStep === 1 && (
                <Paso1 
                    id_emprendimiento={id_emprendimiento}
                    setMaterials={setMaterials} 
                    nextStep={nextStep} 
                    onCancel={handleCancel}
                    setIsUploadVisible={setIsUploadVisible}
                    setIsPrecioVisible={setIsPrecioVisible}
                />
            )}
            {currentStep === 2 && (
                <Paso2 
                    materials={materials} 
                    setUsedMaterials={setUsedMaterials} 
                    nextStep={nextStep} 
                    prevStep={prevStep} 
                />
            )}
            {currentStep === 3 && (
                <Paso3 
                    usedMaterials={usedMaterials} 
                    setPrecioFinal={setPrecioFinal} 
                    precioFinal={precioFinal} 
                    prevStep={prevStep}
                    setIsUploadVisible={setIsUploadVisible}
                    setIsPrecioVisible={setIsPrecioVisible}
                    setValues={setValues}
                    setFinalMaterials={setFinalMaterials}
                    setCalculoPrecio={setCalculoPrecio}
                />
            )}
        </div>
    );
};

export default FormularioPrecio;