import { useNavigate } from "react-router";
import { useState } from "react";
import Navbar from "../../navbar/Navbar";
import ConfirmModal from "../../modal/confirmModal/ConfirmModal";
import "./carrito.css";

function Carrito({ cart = [], deleteGame, clearCart }) {

  const navigate = useNavigate();

  //modal carrito
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [gameIndexToDelete, setGameIndexToDelete] = useState(null);

  const total = cart.reduce((acc, game) => acc + game.price, 0);

  const handleDelete = (e, index) => {
    e.stopPropagation();
    setGameIndexToDelete(index);
    setShowDeleteModal(true);
  };

  const handleGameClick = (id) => {
    navigate(`/game/${id}`);
  };

  const handlePurchase = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">

        <h2>Carrito</h2>

        {cart.length === 0 ? (
          <h3>El carrito está vacío</h3>
        ) : (
          <>
            {cart.map((game, index) => (

              <div
                key={index}
                className="cart-item"
                onClick={() => handleGameClick(game.id)}
              >

                <img src={game.image} alt={game.title} />

                <div className="cart-item-info">
                  <h4>{game.title}</h4>
                  <p>${game.price}</p>
                </div>

                <button
                  className="btn-remove"
                  onClick={(e) => handleDelete(e, index)}
                >
                  Eliminar
                </button>

              </div>
            ))}

            <h3 className="cart-total">
              Total: ${total}
            </h3>

            <button
              className="btn-clear"
              onClick={() => setShowClearModal(true)}
            >
              Vaciar carrito
            </button>
            <button
              className="btn-clear"
              onClick={handlePurchase}
            >
              Finalizar compra
            </button>




            <ConfirmModal
              show={showDeleteModal}
              onHide={() => setShowDeleteModal(false)}
              onConfirm={() => {
                deleteGame(gameIndexToDelete);
                setShowDeleteModal(false);
              }}
              title="Eliminar juego"
              message="¿Deseas eliminar este juego del carrito?"
              confirmText="Sí, eliminar"
            />

            <ConfirmModal
              show={showClearModal}
              onHide={() => setShowClearModal(false)}
              onConfirm={() => {
                clearCart();
                setShowClearModal(false);
              }}
              title="Vaciar carrito"
              message="¿Deseas eliminar todos los juegos del carrito?"
              confirmText="Sí, vaciar carrito"
            />
          </>
        )}
      </div >
    </>
  );
}

export default Carrito;