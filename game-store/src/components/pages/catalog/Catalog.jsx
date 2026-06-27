import GameCard from "../../games/gameCard/GameCard";
import Navbar from "../../navbar/Navbar";
import "./catalog.css";
import Sidebar from "../../sidebar/Sidebar";
import { useEffect, useState } from "react";
import Footer from "../../footer/Footer";

function Catalog({ addToCart }) {

    // Estado que almacena los juegos obtenidos del backend
    const [games, setGames] = useState([]);

    // Filtro por género seleccionado en el sidebar
    const [selectedGenre, setSelectedGenre] = useState("");

    // Estado del input de búsqueda
    const [search, setSearch] = useState("");

    // Efecto que busca juegos en el backend cuando cambia la búsqueda con un delay (debounce) de 500ms para evitar muchas peticiones
    useEffect(() => {
        const timer = setTimeout(() => {
            fetch(`http://localhost:3000/games?search=${search}`)
                .then((res) => res.json())
                .then((data) => setGames(data))
                .catch((error) => console.error(error));
        }, 500);

        // Limpia el timeout anterior para evitar llamadas innecesarias
        return () => clearTimeout(timer);
    }, [search]);

    // Filtra los juegos por género y búsqueda
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
                            {/* Listado de juegos */}
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