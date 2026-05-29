// 🔹 IMPORTAMOS useEffect
import React, { useEffect, useState } from 'react'

import Navbar from '../../navbar/Navbar';
import { Button, Badge } from 'react-bootstrap';
import { useParams } from 'react-router';

import './gamedetails.css'

const GameDetails = ({ addToCart, loggedIn }) => {

  const { id } = useParams();

  // 🔹 ESTADO DEL JUEGO
  const [game, setGame] = useState(null);

  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  // 🔹 FETCH PARA TRAER EL JUEGO DESDE EL BACKEND
  useEffect(() => {

    fetch(`http://localhost:3000/games/${id}`)
      .then((res) => res.json())
      .then((data) => setGame(data))
      .catch((error) => console.error(error));

  }, [id]);

  // 🔹 EVITA QUE ROMPA CUANDO game ES null
  if (!game) {
    return <h1>Cargando...</h1>;
  }

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

  return (
    <>
      <Navbar />

      <div
        className="game-details-page"
        style={{
          backgroundImage: `linear-gradient(
            rgba(5,5,15,0.85),
            rgba(5,5,15,0.95)
          ), url(${game.image})`
        }}
      >

        <div className="game-details-overlay">

          <div className="game-hero">

            <div className="game-cover">
              <img src={game.image} alt={game.title} />
            </div>

            <div className="game-info">

              <Badge bg="primary" className='mb-3'>
                {game.genre}
              </Badge>

              <h1
                style={{
                  fontSize: "3rem",
                  fontWeight: "700"
                }}
              >
                {game.title}
              </h1>

              <p className="game-description">
                {game.description}
              </p>

              <div className="game-meta">
                <span>{game.rating}/10</span>
                <span>{game.gameMode}</span>
                <span>{game.platform}</span>
              </div>

              <h2 className="game-price">
                ${game.price}
              </h2>

              <div className="game-buttons">

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

                <Button
                  variant="outline-light"
                  size="lg"
                >
                  Wishlist
                </Button>

              </div>

              {error && (
                <p className="error-msg">
                  Debes iniciar sesión ❌
                </p>
              )}

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default GameDetails