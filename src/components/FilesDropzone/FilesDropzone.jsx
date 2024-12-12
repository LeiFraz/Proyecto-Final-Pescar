import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'

import styles from './FilesDropzone.module.css';
const FilesDropzone = ({setFile}) => {

    const [files, setFiles] = useState([])
    const [rejected, setRejected] = useState([])
    const [errorMax, setErrorMax] = useState("")
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setRejected([])
        if(acceptedFiles?.length && files.length+acceptedFiles.length<4){
            const newFiles = [...files, ...acceptedFiles.map(file => 
                Object.assign(file, {preview: URL.createObjectURL(file),
                    id: crypto.randomUUID()
                })
            )];
            setFile(newFiles)
            setFiles(newFiles);
        }
        else if(files.length+acceptedFiles.length>3){
            setErrorMax("Debe ingresar 3 imagenes máximo")
            return;
        }

        if (rejectedFiles?.length) {  
            setRejected(rejectedFiles);  
            setFile(null)
        }

        
    }, [setFile, files])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept:{
            'image/*' : []
        },
        maxFiles:3,
        maxSize: 2048 * 1000
    })
    const dropzone="dropzone"
    const dropzoneStyle = {
        backgroundColor: isDragActive ?"#ffffff" : "#f9f9f9", // Cambia el color de fondo 
        height: "100px",
        borderRadius: "5px",
        border: isDragActive ? "2px dashed #007BFF" : "2px dashed #999999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: isDragActive ? "0 0 5px rgba(0, 123, 255, 0.5)" : "none",
        transition: "0.3s ease", // Suaviza la transición
    };


    const removeFile = id => {
        const updatedFiles = files.filter(file => file.id !== id);
        setFiles(updatedFiles)
        setFile(updatedFiles)
    }


    return (
        <form className={styles['formDropzone']}>
            <div {...getRootProps({
                style:dropzoneStyle,
                className:styles.dropzone
            })}>
                <input {...getInputProps()} />
                {
                isDragActive ?
                    <p className={styles.centerDrop}>Suelta las imagenes aquí</p> :
                    <p className={styles.centerDrop}>Arrastra y suelta tus imagenes o haz click</p>
                }
            </div>
            <ul>
                
                {files.map(file=>(
                    <li key={file.id} className={styles['li-image']}>
                        <img className={styles['img-preview']} src={file.preview} alt='' 
                        onLoad={() =>{
                            URL.revokeObjectURL(file.preview)
                        }}/>
                        <button type='button' className={styles['remove-image']} onClick={()=> removeFile(file.id)}>
                        <i className='icon-trash-empty'></i>
                        </button>
                        <p className={styles['img-name']}>{file.name}</p>
                    </li>
                ))}
            </ul>
            {errorMax && <p className={styles["error-dropzone"]}>{errorMax}</p>}
            <ul>
                {rejected.map(({file, errors}) => 
                <li key={file.id}>
                    {errors.map(error => {
                        if (error.code === "file-invalid-type") {
                        return <p className={styles["error-dropzone"]}>Debe ingresar una imagen</p>;
                        }
                        if (error.code === "file-too-large") {
                        return <p className={styles["error-dropzone"]}>La imagen debe pesar menos de 2MB</p>;
                        }
                        return null; // Devuelve null si no hay errores coincidentes
                    })}
                </li>
                )}
            </ul>
            
        </form>
    )
}

export default FilesDropzone