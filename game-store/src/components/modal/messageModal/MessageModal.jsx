import { Modal } from "react-bootstrap";
import "./messageModal.css";

const MessageModal = ({
    show,
    onHide,
    title,
    message,
}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            dialogClassName="message-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {message}
            </Modal.Body>
        </Modal>
    );
};

export default MessageModal;