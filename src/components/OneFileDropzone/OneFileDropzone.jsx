import {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './OneFileDropzone.module.css'


const OneFileDropzone = ({setFile}) => {

    const [files, setFiles] = useState([])
    const [rejected, setRejected] = useState([])
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setFiles([])
        setRejected([])
        if(acceptedFiles?.length){
            setFiles(
                acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            );
            setFile(acceptedFiles[0]);
        }
        if (rejectedFiles?.length) {  
            setRejected(rejectedFiles);  
            setFile(null)
        }

        
    }, [setFile])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept:{
            'image/*' : []
        },
        maxFiles:1,
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


    const removeFile = name => {
        setFiles(files => files.filter(file => file.name !== name));
        setFile(null);
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
                    <p className={styles.centerDrop}>Suelta la imagen aquí</p> :
                    <p className={styles.centerDrop}>Arrastra y suelta tu imagen o haz click</p>
                }
            </div>
            <ul>
                
                {rejected.length<1 && files.map(file=>(
                    <li key={file.name}>
                        <img className={styles['img-preview']} src={file.preview} alt='' 
                        onLoad={() =>{
                            URL.revokeObjectURL(file.preview)
                        }}/>
                        <button type='button' className={styles['remove-image']} onClick={()=> removeFile(file.name)}>
                        <i className='icon-trash-empty'></i>
                        </button>
                        <p className={styles['img-name']}>{file.name}</p>
                    </li>
                ))}
                {rejected.length>0 && rejected.map(({file, errors}) => 
                <li key={file.name}>
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

export default OneFileDropzone