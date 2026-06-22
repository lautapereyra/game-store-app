import "./newsCard.css";
import { useContext } from "react";
import { AuthContext } from "../../auth/autProvider/AuthProvider";

const NewsCard = ({ news, onViewMore, onEdit, onDelete }) => {
    const { user } = useContext(AuthContext);
    return (
        <div className="news-card">
            <img
                src={news.image}
                alt={news.title}
                className="news-card-img"
            />

            <div className="news-card-content">
                <h3 className="news-card-title">
                    {news.title}
                </h3>

                <p className="news-card-text">
                    {news.content.length > 100
                        ? news.content.substring(0, 100) + "..."
                        : news.content}
                </p>

                {news.source && (
                    <span className="news-card-source">
                        Fuente: {news.source}
                    </span>
                )}

                <div className="news-card-buttons">
                    <button
                        className="news-card-button"
                        onClick={() => onViewMore(news)}
                    >
                        Ver más
                    </button>

                    {(user?.role === "ADMIN" || user?.role === "MODERATOR") && (
                        <>
                            <button
                                className="news-card-button"
                                onClick={() => onEdit(news)}
                            >
                                Editar
                            </button>

                            <button
                                className="news-card-button delete-button"
                                onClick={() => onDelete(news)}
                            >
                                Eliminar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
