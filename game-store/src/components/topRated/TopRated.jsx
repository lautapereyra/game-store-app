import { useEffect, useState } from "react";
import GameCard from "../games/gameCard/GameCard";
import "./topRated.css";

function TopRated({ addToCart }) {
    // Estado que almacena todos los juegos obtenidos desde la API
    const [games, setGames] = useState([]);

    // Carga inicial de datos desde el backend
    useEffect(() => {
        fetch("http://localhost:3000/games")
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(err => console.log(err));
    }, []);

    // Procesamiento de datos: se ordenan los juegos por rating de mayor a menor y se seleccionan los 4 mejores
    const topRated = [...games]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);

    return (
        <section id="top-rated" className="top-rated">
            <div className="container">

                <h2 className="top-rated-title">
                    Mejores puntuados
                </h2>
                <p className="description-text">Descubre los títulos mejor valorados por la comunidad!</p>
                {/* Grid de juegos mejor puntuados */}
                <div className="catalog-grid">
                    {topRated.map(game => (
                        <GameCard
                            key={game.id}
                            game={game}
                            addToCart={addToCart}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default TopRated;