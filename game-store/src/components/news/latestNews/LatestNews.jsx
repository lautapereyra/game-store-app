import { useEffect, useState } from "react";
import NewsCard from "../newsCard/NewsCard";
import { useNavigate } from "react-router-dom";
import "./latestNews.css";

function LatestNews() {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/news")
            .then(res => res.json())
            .then(data => setNews(data))
            .catch(err => console.log(err));
    }, []);

    // Ordenar por publishedAt (más nuevas primero) y tomar solo 4
    const latestNews = [...news]
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 4);

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
                            onViewMore={(news) =>
                                navigate(`/news/${news.id}`)
                            }
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default LatestNews;