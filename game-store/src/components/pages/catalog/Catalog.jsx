import GameCard from "../../games/gameCard/GameCard";
import Navbar from "../../navbar/Navbar";
import "./catalog.css";
import Sidebar from "../../sidebar/Sidebar";
import { useEffect, useState } from "react";
import Footer from "../../footer/Footer";

function Catalog({ addToCart }) {

    const [games, setGames] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            fetch(`http://localhost:3000/games?search=${search}`)
                .then((res) => res.json())
                .then((data) => setGames(data))
                .catch((error) => console.error(error));
        }, 500);
        // CLEANUP FUNCTION
        return () => clearTimeout(timer);
    }, [search]);

    const filteredGames = games.filter((game) => {

        const matchesGenre =
            selectedGenre === "" ||
            game.genre === selectedGenre;

        const matchesSearch =
            game.title
                .toLowerCase()
                .includes(search.toLowerCase());

        return matchesGenre && matchesSearch;
    });

    return (
        <>
            <Navbar />
            <div className="catalog-container">
                <div className="container">

                    <div className="row g-5">
                        <div className="col-md-3">
                            <Sidebar
                                selectedGenre={selectedGenre}
                                setSelectedGenre={setSelectedGenre}
                                search={search}
                                setSearch={setSearch}
                            />
                        </div>

                        <div className="col-md-9">
                            <h2 className="catalog-title">Catálogo de Juegos</h2>

                            <p className="catalog-description">
                                Explorá nuestra colección de juegos y encontrá nuevos títulos para sumar a tu biblioteca. Desde clásicos hasta los lanzamientos más recientes, hay opciones para todos los gustos.
                            </p>
                            <div className="catalog-grid">
                                {filteredGames.map((game) => (
                                    <GameCard
                                        key={game.id}
                                        game={game}
                                        addToCart={addToCart}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Catalog;