import React, { useEffect, useState } from 'react'
import Footer from "../../footer/Footer"
import Navbar from '../../navbar/Navbar';
import { Button, Badge } from 'react-bootstrap';
import { useParams } from 'react-router';

import './gamedetails.css'

const GameDetails = ({ addToCart, loggedIn }) => {
  // Obtiene el ID del juego desde la URL
  const { id } = useParams();

  // Estado que almacena el juego obtenido del backend
  const [game, setGame] = useState(null);

  // Estado para mostrar mensajes de feedback al usuario
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  // Al montar el componente obtiene los datos del juego según su ID
  useEffect(() => {
    fetch(`http://localhost:3000/games/${id}`)
      .then((res) => res.json())
      .then((data) => setGame(data))
      .catch((error) => console.error(error));

  }, [id]);

  // Evita errores de renderizado antes de que llegue la data
  if (!game) {
    return <h1>Cargando...</h1>;
  }

  // Agrega el juego al carrito solo si el usuario está logueado
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

              <h1 className="game-title">
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
      <Footer />
    </>
  )
}

export default GameDetails