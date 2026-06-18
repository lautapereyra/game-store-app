import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "../newsCard/NewsCard";
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

    const latestNews = [...news]
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 4);

    const handleEdit = (news) => {
        navigate(`/news/edit/${news.id}`);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3000/news/${id}`, {
                method: "DELETE",
            });

            setNews((prev) =>
                prev.filter((item) => item.id !== id)
            );
        } catch (error) {
            console.error(error);
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
                            onViewMore={(news) =>
                                navigate(`/news/${news.id}`)
                            }
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default LatestNews;