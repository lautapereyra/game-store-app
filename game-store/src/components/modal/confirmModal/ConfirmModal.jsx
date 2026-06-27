import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import './modal.css';

const ConfirmModal = ({
    show,
    onHide,
    onConfirm,
    title,
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar"
}) => {
    const [isConfirming, setIsConfirming] = useState(false);

const handleConfirm = async () => {
    if (isConfirming) return;

    setIsConfirming(true);

    try {
        await onConfirm();
        onHide(); // cerrar el modal inmediatamente
    } catch (error) {
        console.error(error);
    } finally {
        setIsConfirming(false);
    }
};

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{message}</Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} disabled={isConfirming}>
                    {cancelText}
                </Button>

                <Button
                    variant="danger"
                    onClick={handleConfirm}
                    disabled={isConfirming}
                >
                    {isConfirming ? "Eliminando..." : confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
