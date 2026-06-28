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
    // Estado que evita múltiples confirmaciones simultáneas
    const [isConfirming, setIsConfirming] = useState(false);

    // Maneja la acción de confirmación de forma segura
    const handleConfirm = async () => {
        if (isConfirming) return;

        setIsConfirming(true);

        try {
            await onConfirm();
        } catch (error) {
            console.error(error);
        } finally {
            setIsConfirming(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered animation={false}>

            {/* Encabezado del modal con título */}
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            {/* Mensaje principal del modal */}
            <Modal.Body>{message}</Modal.Body>

            {/* Acciones del modal */}
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
