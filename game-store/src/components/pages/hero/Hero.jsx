import React from "react";
import "./hero.css";
import { Link } from "react-router";

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="container text-center">
                <h1 className="hero-title">
                    Tienda de Videojuegos
                </h1>

                <p className="hero-subtitle">
                    Miles de juegos, ofertas increíbles y todo lo que necesitás en un solo lugar.
                </p>

                <div className="hero-buttons">
                    <a href="#" className="btn btn-success">
                        Explorar tienda
                    </a>
                    <Link to="/catalog">
                        <button className="btn btn-outline-light">
                            Ver catálogo
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;