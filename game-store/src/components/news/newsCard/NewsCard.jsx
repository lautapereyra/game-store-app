import { useNavigate } from "react-router-dom";
import "./newsCard.css";


const NewsCard = ({ news, onViewMore }) => {
    const navigate = useNavigate();
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

                <button
                    className="news-card-button"
                    onClick={() => onViewMore(news)}
                >
                    Ver más
                </button>
            </div>
        </div>
    );
};

export default NewsCard;