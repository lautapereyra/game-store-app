import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { AuthContext } from "../auth/autProvider/AuthProvider";

import "./news.css";

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch("http://localhost:3000/news")
            .then((res) => res.json())
            .then((data) => {
                setNews(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="news-loading">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <div className="news-page">
            <Container>
                <h1 className="news-page-title">
                    Sección de Noticias
                </h1>

                <p className="news-page-description">
                    Enterate de las últimas novedades del mundo gamer:
                    lanzamientos, actualizaciones, torneos, anuncios y todo lo
                    que está pasando en la industria.
                </p>

                <Row>
                    {news.map((item) => (
                        <Col lg={4} md={6} className="mb-4" key={item.id}>
                            <Card className="h-100 news-card-page">
                                <Card.Img
                                    variant="top"
                                    src={item.image}
                                    style={{
                                        height: "220px",
                                        objectFit: "cover",
                                    }}
                                />

                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>
                                        {item.title}
                                    </Card.Title>

                                    <Card.Subtitle className="text-muted mb-2">
                                        {item.source}
                                    </Card.Subtitle>

                                    <Card.Text>
                                        {item.content.length > 150
                                            ? item.content.substring(0, 150) + "..."
                                            : item.content}
                                    </Card.Text>

                                    <div className="mt-auto d-flex gap-2">
                                        <button
                                            className="news-btn"
                                            onClick={() =>
                                                navigate(`/news/${item.id}`)
                                            }
                                        >
                                            Ver más
                                        </button>

                                        {(user?.role === "ADMIN" ||
                                            user?.role === "MODERATOR") && (
                                                <Button
                                                    className="news-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/news/edit/${item.id}`
                                                        )
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                            )}
                                    </div>
                                </Card.Body>

                                <Card.Footer className="text-muted">
                                    {new Date(
                                        item.publishedAt
                                    ).toLocaleDateString()}
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default News;