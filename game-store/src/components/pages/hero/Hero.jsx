import React, { useEffect, useRef } from "react";
import "./hero.css";
import { Link } from "react-router";

const Hero = () => {
    const typedRef = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedRef.current, {
            strings: [
                "tu tienda digital.",
                "tu mundo gamer.",
                "game store."
            ],
            typeSpeed: 30,
            backSpeed: 20,
            backDelay: 2050,
            loop: true,
            showCursor: true,
            cursorChar: "|",
        });

        return () => typed.destroy();
    }, []);

    return (
        <section className="hero-section">
            <div className="container text-center">
                <h1 className="hero-title">
                    Bienvenido a{" "}
                    <span className="brand" ref={typedRef}></span>
                </h1>

                <p className="hero-subtitle">
                    Miles de juegos, ofertas increíbles y todo lo que necesitás en un solo lugar. Descubrí nuevos títulos, accedé a descuentos exclusivos y disfrutá de la mejor experiencia gaming.</p>

                <div className="hero-buttons">
                    <a href="#" className="exp-tienda">
                        Explorar tienda
                    </a>

                    <Link to="/catalog" className="ver-catalogo">
                        Ver catálogo
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;