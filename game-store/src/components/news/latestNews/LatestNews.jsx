import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NewsCard from "../newsCard/NewsCard";
import ConfirmModal from "../../modal/confirmModal/ConfirmModal";
import "./latestNews.css";

function LatestNews({ news = [] }) {
    // Hook para navegar entre páginas
    const navigate = useNavigate();

    // Estado local que almacena las noticias recibidas por props
    const [localNews, setLocalNews] = useState([]);

    // Estados para controlar el modal de eliminación
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Sincroniza el estado local cuando cambia la lista de noticias
    useEffect(() => {
        setLocalNews(news);
    }, [news]);

    // Abre el modal y guarda la noticia seleccionada
    const openDeleteModal = (newsItem) => {
        setSelectedNews(newsItem);
        setShowDeleteModal(true);
    };

    // Cierra el modal y limpia la noticia seleccionada
    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setTimeout(() => setSelectedNews(null), 300);
    };

    // Obtiene las cuatro noticias más recientes
    const latestNews = [...localNews]
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 4);

    // Redirige al formulario de edición
    const handleEdit = (newsItem) => {
        navigate(`/news/edit/${newsItem.id}`);
    };

    // Elimina la noticia seleccionada del backend y actualiza el listado sin recargar la página
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

                {/* Muestra las últimas noticias ordenadas por fecha */}
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

            {/* Modal de confirmación para eliminar una noticia */}
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