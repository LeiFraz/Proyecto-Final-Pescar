import './ModalLoading.css';

function ModalLoading({ isOpen, isLoading, children, text, loadingText}) {
    
    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="content">
                {isLoading ? (
                    <>
                        <div className="spinner"></div>
                        <p>{loadingText}</p>
                    </>
                ) : (
                    <>
                        <h2>Éxito</h2>
                        <p>{text}</p>
                        {children}
                    </>
                )}
            </div>
        </div>
    );
}

export default ModalLoading