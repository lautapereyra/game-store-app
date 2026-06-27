import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import './editNews.css'
import Navbar from "../../navbar/Navbar";
import MessageModal from "../../modal/messageModal/MessageModal";

function EditNews() {
    // Obtiene el id de la noticia desde la URL
    const { id } = useParams();

    // Hook para navegar entre páginas
    const navigate = useNavigate();

    // Estados que almacenan los datos de la noticia
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [source, setSource] = useState("");

    // Estados para controlar el modal de mensajes
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    // Al cargar el componente obtiene los datos de la noticia para completar el formulario de edición
    useEffect(() => {
        fetch(`http://localhost:3000/news/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title);
                setContent(data.content);
                setImage(data.image);
                setSource(data.source);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = async (e) => {

        // Evita la recarga de la página
        e.preventDefault();

        try {
            // Envía los cambios al backend mediante una petición PUT
            const response = await fetch(
                `http://localhost:3000/news/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title,
                        content,
                        image,
                        source,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Error al actualizar la noticia");
            }

            // Muestra un mensaje de éxito y vuelve al listado
            setModalTitle("Éxito");
            setModalMessage("La noticia se actualizó correctamente.");
            setShowModal(true);

            setTimeout(() => {
                navigate("/news");
            }, 2000);

        } catch (error) {
            // Muestra un mensaje si ocurre un error
            console.error(error);

            setModalTitle("Error");
            setModalMessage("No se pudo actualizar la noticia.");
            setShowModal(true);
        }
    };

    return (
        <>
            <Navbar />
            <div className="edit-news-page">

                <div className="container">
                    <Card className="edit-news-card p-4">
                        <h2 className="edit-news-title">
                            Editar noticia
                        </h2>
                        {/* Formulario para editar una noticia existente */}
                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Contenido</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    value={content}
                                    onChange={(e) =>
                                        setContent(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={image}
                                    onChange={(e) =>
                                        setImage(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Fuente</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={source}
                                    onChange={(e) =>
                                        setSource(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Button
                                className="save-news-btn"
                                type="submit"
                            >
                                Guardar cambios
                            </Button>
                        </Form>
                    </Card>
                </div>
            </div>

            {/* Modal reutilizable para informar el resultado de la operación */}
            <MessageModal
                show={showModal}
                onHide={() => setShowModal(false)}
                title={modalTitle}
                message={modalMessage}
            />
        </>
    )
};

export default EditNews;