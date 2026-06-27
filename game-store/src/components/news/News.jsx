import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import { AuthContext } from "../auth/autProvider/AuthProvider";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer"
import ConfirmModal from "../modal/confirmModal/ConfirmModal";
import "./news.css";

const News = () => {
    // Estado que almacena todas las noticias obtenidas del backend
    const [news, setNews] = useState([]);

    // Controla el estado de carga mientras se obtienen los datos
    const [loading, setLoading] = useState(true);

    // Estados para el modal de eliminación
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    // Hook para navegación entre rutas
    const navigate = useNavigate();

    // Usuario autenticado (para control de permisos)
    const { user } = useContext(AuthContext);

    // Al montar el componente se obtienen todas las noticias desde el backend
    useEffect(() => {
        fetch("http://localhost:3000/news")
            .then((res) => res.json())
            .then((data) => {

                // (debug) muestra datos en consola
                data.forEach(item => {
                    console.log(
                        item.id,
                        item.title,
                        item.publishedAt
                    );
                });

                setNews(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);
    // Abre el modal y guarda la noticia seleccionada
    const openDeleteModal = (newsItem) => {
        setSelectedNews(newsItem);
        setShowDeleteModal(true);
    };

    // Cierra el modal y limpia la selección
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setTimeout(() => setSelectedNews(null), 300);
    };

    // Elimina una noticia del backend y actualiza el estado local
    const handleConfirmDelete = async () => {
        if (!selectedNews) return;

        const newsToDelete = selectedNews;

        try {
            const response = await fetch(
                `http://localhost:3000/news/${newsToDelete.id}`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Error al eliminar noticia");
            }
            // Actualiza la UI sin recargar la página
            setNews((prev) =>
                prev.filter((item) => item.id !== newsToDelete.id)
            );
        } catch (error) {
            console.error(error);
        } finally {
            closeDeleteModal();
        }
    };
    if (loading) {
        return (
            <div className="news-loading">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <>
            <Navbar />

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
                        {/* Lista de noticias */}
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

                                        <div className="buttons">
                                            <button
                                                className="news-btn"
                                                onClick={() => navigate(`/news/${item.id}`)}
                                            >
                                                Ver más
                                            </button>

                                            {/* Botones con control de roles */}
                                            {(user?.role === "ADMIN" ||
                                                user?.role === "MODERATOR") && (
                                                    <>
                                                        <button
                                                            className="news-btn"
                                                            onClick={() =>
                                                                navigate(`/news/edit/${item.id}`)
                                                            }
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            className="news-btn"
                                                            onClick={() => openDeleteModal(item)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </>
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

            {/* Modal de confirmación para eliminar */}
            <ConfirmModal
                show={showDeleteModal}
                onHide={closeDeleteModal}
                onConfirm={handleConfirmDelete}
                title="Eliminar noticia"
                message={`¿Estás seguro de que querés eliminar la noticia "${selectedNews?.title}"?`}
                confirmText="Sí, eliminar"
            />

            <Footer />
        </>
    );
};

export default News;
