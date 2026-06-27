import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NewsCard from "../newsCard/NewsCard";
import ConfirmModal from "../../modal/confirmModal/ConfirmModal";
import "./latestNews.css";

function LatestNews({ news = [] }) {
    const navigate = useNavigate();

    const [localNews, setLocalNews] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        setLocalNews(news);
    }, [news]);

    const openDeleteModal = (newsItem) => {
        setSelectedNews(newsItem);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        // selectedNews se limpia después, no de inmediato,
        // para evitar que el mensaje del modal "parpadee" a undefined
        // mientras se cierra (si tiene transición/animación).
        setTimeout(() => setSelectedNews(null), 300);
    };

    const latestNews = [...localNews]
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 4);

    const handleEdit = (newsItem) => {
        navigate(`/news/edit/${newsItem.id}`);
    };

    const handleConfirmDelete = async () => {
        if (!selectedNews || isDeleting) return;

        const newsToDelete = selectedNews;
        setIsDeleting(true);

        try {
            const res = await fetch(
                `http://localhost:3000/news/${newsToDelete.id}`,
                { method: "DELETE" }
            );

            if (!res.ok) throw new Error("Error al eliminar");

            setLocalNews(prev => prev.filter(n => n.id !== newsToDelete.id));
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
            closeDeleteModal();
        }
    };

    return (
        <section className="news-section">
            <div className="container">

                <h2 className="news-title">
                    Últimas noticias
                </h2>

                <p className="news-description">
                    Enterate de las novedades más recientes del mundo gaming.
                </p>

                <div className="catalog-grid">
                    {latestNews.map(item => (
                        <NewsCard
                            key={item.id}
                            news={item}
                            onViewMore={() => navigate(`/news/${item.id}`)}
                            onEdit={handleEdit}
                            onDelete={() => openDeleteModal(item)}
                        />
                    ))}
                </div>

            </div>

            <ConfirmModal
                show={showDeleteModal}
                onHide={closeDeleteModal}
                onConfirm={handleConfirmDelete}
                title="Eliminar noticia"
                message={`¿Deseas eliminar la noticia "${selectedNews?.title}"?`}
                confirmText="Sí, eliminar"
                confirmLoading={isDeleting}
            />
        </section>
    );
}

export default LatestNews;