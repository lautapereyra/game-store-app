import { useNavigate } from "react-router";
import { useState, useContext } from 'react'
import { AuthContext } from "../../auth/autProvider/AuthProvider";
import "./gameCard.css";
import ConfirmModal from "../../modal/ConfirmModal";

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

                </div>
            </div>
            <ConfirmModal
                show={gameToDelete !== null}
                onHide={() => setGameToDelete(null)}
                onConfirm={() => {
                    confirmDelete();
                    setGameToDelete(null);

                    setTimeout(() => {
                        window.location.reload();
                    }, 300);
                }}
                title="Eliminar juego"
                message={`¿Deseas eliminar "${gameToDelete?.title}"?`}
                confirmText="Sí, eliminar"
            />
        </div>
    );
}

export default GameCard;