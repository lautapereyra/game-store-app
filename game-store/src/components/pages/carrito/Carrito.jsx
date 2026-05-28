import "./carrito.css";
import { useNavigate } from "react-router";
import Navbar from "../../navbar/Navbar";

function Carrito({ cart = [], deleteGame, clearCart }) {

  const navigate = useNavigate();

  const total = cart.reduce((acc, game) => acc + game.price, 0);

  const handleDelete = (e, index) => {
    e.stopPropagation();
    deleteGame(index);
  };

  const handleGameClick = (id) => {
    navigate(`/game/${id}`);
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

            <button className="btn-clear" onClick={clearCart}>
              Vaciar carrito
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Carrito;