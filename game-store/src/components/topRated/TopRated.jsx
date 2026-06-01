import { useEffect, useState } from "react";
import GameCard from "../gameCard/GameCard";
import "./topRated.css";

function TopRated({ addToCart }) {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/games")
            .then(res => res.json())
            .then(data => setGames(data))
            .catch(err => console.log(err));
    }, []);

    const topRated = [...games]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);

    return (
        <section className="top-rated">
            <div className="container">

                <h2 className="top-rated-title">
                    Mejores puntuados
                </h2>
                <p className="description-text">Descubre los títulos mejor valorados por la comunidad!</p>

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