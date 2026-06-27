import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import MessageModal from "../../modal/messageModal/MessageModal";

const AddNews = () => {
    // Hook para navegar entre páginas
    const navigate = useNavigate();

    // Estado que almacena los datos de la noticia
    const [news, setNews] = useState({
        title: "",
        source: "",
        image: "",
        content: "",
    });

    // Estados para controlar el modal de mensajes
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    // Actualiza el campo modificado del formulario
    const handleChange = (e) => {
        setNews({
            ...news,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        // Evita la recarga de la página al enviar el formulario
        e.preventDefault();

        try {
            // Envía la nueva noticia al backend
            const response = await fetch("http://localhost:3000/news", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(news),
            });

            if (!response.ok) {
                throw new Error("Error al crear la noticia");
            }

            // Muestra un mensaje de éxito y redirige al listado
            setModalTitle("Éxito");
            setModalMessage("La noticia fue creada correctamente.");
            setShowModal(true);

            setTimeout(() => {
                navigate("/news");
            }, 2000);

        } catch (error) {
            // Muestra un mensaje de error si falla la operación
            console.error(error);

            setModalTitle("Error");
            setModalMessage("No se pudo guardar la noticia.");
            setShowModal(true);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <Card className="p-4 bg-dark text-light">
                    <h2 className="mb-4">Agregar Noticia</h2>

                    {/* Formulario para crear una nueva noticia */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={news.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Fuente</Form.Label>
                            <Form.Control
                                type="text"
                                name="source"
                                value={news.source}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>URL de Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={news.image}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contenido</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                name="content"
                                value={news.content}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Guardar Noticia
                        </Button>
                    </Form>
                </Card>
            </div>

            {/* Modal reutilizable para mostrar mensajes de éxito o error */}
            <MessageModal
                show={showModal}
                onHide={() => setShowModal(false)}
                title={modalTitle}
                message={modalMessage}
            />
        </>
    );
};

export default AddNews;