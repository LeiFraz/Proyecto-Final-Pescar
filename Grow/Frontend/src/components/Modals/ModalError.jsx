import './ModalSuccess.css';

function ModalError({ isOpen, children, text}) {
    
    if (!isOpen) return null;

    return(
        <>
            <div className="overlay">
                <div className="content">
                <h2>Error</h2>
                <p>{text}</p>
                    {children}
                </div>
            </div>
        </>
    )
}

export default ModalError