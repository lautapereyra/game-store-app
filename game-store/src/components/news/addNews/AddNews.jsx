import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar/Navbar";

const AddNews = () => {
    const navigate = useNavigate();

    const [news, setNews] = useState({
        title: "",
        source: "",
        image: "",
        content: "",
    });

    const handleChange = (e) => {
        setNews({
            ...news,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
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

            navigate("/news");
        } catch (error) {
            console.error(error);
            alert("No se pudo guardar la noticia");
        }
    };

    return (
        <>
        <Navbar/>
        <div className="container mt-5">
            <Card className="p-4 bg-dark text-light">
                <h2 className="mb-4">Agregar Noticia</h2>

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
        </>
    );
};

export default AddNews;