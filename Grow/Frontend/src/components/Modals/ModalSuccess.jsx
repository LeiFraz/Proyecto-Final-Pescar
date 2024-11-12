import './ModalSuccess.css';

function ModalSuccess({ isOpen, children, text}) {
    
    if (!isOpen) return null;

    return(
        <>
            <div className="overlay">
                <div className="content">
                <h2>Exito</h2>
                <p>{text}</p>
                    {children}
                </div>
            </div>
        </>
    )
}

export default ModalSuccess