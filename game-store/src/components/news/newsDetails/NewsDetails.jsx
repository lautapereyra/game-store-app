import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import "./newsDetails.css";

const NewsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/news/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Noticia no encontrada");
                }
                return res.json();
            })
            .then((data) => {
                setNews(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="news-details-loading">
                <h2>Cargando noticia...</h2>
            </div>
        );
    }

    if (!news) {
        return (
            <div className="news-details-loading">
                <h2>No se encontró la noticia.</h2>
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <section className="news-article">

                <div className="news-hero">

                    <img
                        src={news.image}
                        alt={news.title}
                        className="news-hero-image"
                    />

                    <div className="news-hero-overlay"></div>

                    <div className="news-hero-content">

                        <button
                            className="news-back-btn"
                            onClick={() => navigate("/news")}
                        >
                            ← Volver a noticias
                        </button>

                        <span className="news-category">
                            {news.source}
                        </span>

                        <h1 className="news-headline">
                            {news.title}
                        </h1>

                        <p className="news-date">
                            {new Date(news.publishedAt).toLocaleDateString(
                                "es-AR",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }
                            )}
                        </p>

                    </div>

                </div>

                <div className="news-content-wrapper">

                    <div className="news-article-content">
                        {news.content.split("\n\n").map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                </div>

            </section>

            <Footer />
        </>
    );
};

export default NewsDetails;