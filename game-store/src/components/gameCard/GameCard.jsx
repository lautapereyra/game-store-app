import { useNavigate } from "react-router";
import "./gameCard.css";
import { useState } from 'react'
import { Button } from "react-bootstrap";

function GameCard({ game, addToCart, loggedIn }) {

    const [added, setAdded] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleAdd = () => {

        if (!loggedIn) {

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
    return (
        <div className="container">
            <div className="game-card">
                <img src={game.image} alt={game.title} />
                <div className="game-card-body">
                    <div className="game-card-title">{game.title}</div>
                    <div className="game-card-genre">{game.genre}</div>
                    <div className="game-card-price">${game.price}</div>
                    <button onClick={handleClick}>
                        Detalles
                    </button>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleAdd}
                    >
                        Agregar al carrito
                    </Button>
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
                </div>
            </div>
        </div>
    );
}

export default GameCard;