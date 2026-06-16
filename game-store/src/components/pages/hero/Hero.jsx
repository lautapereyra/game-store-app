import React, { useEffect, useRef, useState } from "react";
import "./hero.css";
import { Link } from "react-router";
import Typed from "typed.js";

import bg1 from "../../../assets/hero1.jpg";
import bg2 from "../../../assets/hero2.jpg";
import bg3 from "../../../assets/hero3.jpg";
import bg4 from "../../../assets/hero4.jpg";



const Hero = () => {

    const images = [bg1, bg2, bg3, bg4];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    const typedRef = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedRef.current, {
            strings: [
                "tu tienda digital.",
                "tu mundo gamer.",
                "game store."
            ],
            typeSpeed: 40,
            backSpeed: 20,
            backDelay: 2100,
            loop: true,
            showCursor: true,
            cursorChar: "|",
        });

        return () => typed.destroy();
    }, []);

    const scrollToTopRated = () => {
        const section = document.getElementById("top-rated");

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <section className="hero-section">
            <div className="hero-background">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`hero-slide ${index === currentImage ? "active" : ""
                            }`}
                        style={{
                            backgroundImage: `url(${img})`,
                        }}
                    />
                ))}
            </div>
            <div className="hero-overlay"></div>
            <div className="container text-center">
                <h1 className="hero-title">
                    Bienvenido a{" "}
                    <span className="brand" ref={typedRef}></span>
                </h1>

                <p className="hero-subtitle">
                    Miles de juegos, ofertas increíbles y todo lo que necesitás en un solo lugar. Descubrí nuevos títulos, accedé a descuentos exclusivos y disfrutá de la mejor experiencia gaming.
                </p>

                <div className="hero-buttons">
                    <button
                        className="exp-tienda"
                        onClick={scrollToTopRated}
                    >
                        Explorar tienda
                    </button>

                    <Link to="/catalog" className="ver-catalogo">
                        Ver catálogo
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;