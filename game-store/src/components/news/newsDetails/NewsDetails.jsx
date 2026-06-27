import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import "./newsDetails.css";

const NewsDetails = () => {
    // Obtiene el id de la noticia desde la URL
    const { id } = useParams();

    // Hook para navegar entre páginas
    const navigate = useNavigate();

    // Estado que almacena la noticia obtenida del backend
    const [news, setNews] = useState(null);

    // Indica si la información todavía se está cargando
    const [loading, setLoading] = useState(true);

    // Al cargar el componente obtiene la noticia correspondiente al id recibido en la URL
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

    // Muestra un mensaje mientras se carga la noticia
    if (loading) {
        return (
            <div className="news-details-loading">
                <h2>Cargando noticia...</h2>
            </div>
        );
    }
    // Si la noticia no existe informa el error al usuario
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

                    {/* Contenido completo de la noticia */}
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