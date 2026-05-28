import "./sideBar.css";

function Sidebar({
    selectedGenre,
    setSelectedGenre,
    search,
    setSearch,
}) {

    const genres = [
        "Acción",
        "Aventura",
        "RPG",
        "Shooter",
        "Sandbox",
        "Terror",
    ];

    return (
        <div className="sidebar">

            <h3 className="sidebar-title">Filtros</h3>

            <div className="sidebar-section">
                <label className="sidebar-label">Buscar</label>

                <input
                    type="text"
                    placeholder="Buscar juego..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="sidebar-input"
                />
            </div>

            <div className="sidebar-section">
                <label className="sidebar-label">Géneros</label>

                <div className="sidebar-genres">

                    <button
                        className={
                            selectedGenre === ""
                                ? "genre-btn active"
                                : "genre-btn"
                        }
                        onClick={() => setSelectedGenre("")}
                    >
                        Todos
                    </button>

                    {genres.map((genre) => (
                        <button
                            key={genre}
                            className={
                                selectedGenre === genre
                                    ? "genre-btn active"
                                    : "genre-btn"
                            }
                            onClick={() => setSelectedGenre(genre)}
                        >
                            {genre}
                        </button>
                    ))}

                </div>
            </div>

        </div>
    );
}

export default Sidebar;