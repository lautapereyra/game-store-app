import { useNavigate } from "react-router";
import "./gameCard.css";
import { useState, useContext } from 'react'
import { AuthContext } from "../../auth/autProvider/AuthProvider";

function GameCard({ game, addToCart }) {

    const { user, isLoggedIn } = useContext(AuthContext);

    const [added, setAdded] = useState(false);
    const [gameToDelete, setGameToDelete] = useState(null);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleAdd = () => {

        if (!isLoggedIn) {

            setError(true);

            setTimeout(() => {
                setError(false);
            }, 2000);

            return;
        }

        addToCart(game);

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 2000);
    };
    const handleClick = () => {
        navigate(`/game/${game.id}`);
    }
    const confirmDelete = () => {
        fetch(`http://localhost:3000/games/${gameToDelete.id}`, {
            method: "DELETE"
        })
            .then(() => window.location.reload())
            .catch(err => console.log(err));
    };
    const handleEdit = () => {
        navigate(`/games/edit/${game.id}`);
    };
    return (
        <div className="container">
            <div className="game-card">
                <img src={game.image} alt={game.title} />

                <div className="game-card-body">

                    <div className="game-card-title">
                        {game.title}
                    </div>

                    <div className="game-card-genre">
                        {game.genre}
                    </div>

                    <div className="game-card-price">
                        ${game.price}
                    </div>

                    <button
                        className="details-btn"
                        onClick={handleClick}
                    >
                        Detalles
                    </button>



                    <button
                        className="cart-btn"
                        variant="primary"
                        size="lg"
                        onClick={handleAdd}
                    >
                        Agregar al carrito
                    </button>

                    {added && (
                        <p className="success-msg">
                            Agregado al carrito ✅
                        </p>
                    )}

                    {error && (
                        <p className="error-msg">
                            Debes iniciar sesión ❌
                        </p>
                    )}
                    {(user?.role === "ADMIN" ||
                        user?.role === "MODERATOR") && (

                            <div className="admin-actions">

                                <button
                                    className="edit-btn"
                                    onClick={handleEdit}
                                >
                                    Editar
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => setGameToDelete(game)}
                                >
                                    Eliminar
                                </button>

                            </div>
                        )}

                    {gameToDelete && (
                        <div className="alert mt-3">

                            <p>
                                ¿Estás seguro de que querés eliminar{" "}
                                <b>{gameToDelete.title}</b>?
                            </p>

                            <button
                                className="btn btn-danger me-2"
                                onClick={confirmDelete}
                            >
                                Sí, eliminar
                            </button>

                            <button
                                className="btn btn-secondary"
                                onClick={() => setGameToDelete(null)}
                            >
                                Cancelar
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GameCard;