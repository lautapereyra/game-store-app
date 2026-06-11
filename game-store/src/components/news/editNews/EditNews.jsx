import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";

function EditNews() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [source, setSource] = useState("");

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
        e.preventDefault();

        try {
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
                throw new Error("Error al actualizar noticia");
            }

            alert("Noticia actualizada correctamente");
            navigate("/news");

        } catch (error) {
            console.error(error);
            alert("Error al actualizar noticia");
        }
    };

    return (
        <div className="container mt-5">
            <Card className="p-4">
                <h2 className="mb-4">Editar noticia</h2>

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
                        variant="primary"
                        type="submit"
                    >
                        Guardar cambios
                    </Button>

                </Form>
            </Card>
        </div>
    );
}

export default EditNews;