import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer"
import ConfirmModal from "../../modal/confirmModal/ConfirmModal";
import "./checkout.css";

function CheckOut({ cart = [], clearCart }) {

    // Hook para navegar entre páginas
    const navigate = useNavigate();

    // Estado del modal de confirmación de compra
    const [showModal, setShowModal] = useState(false);

    // Estado que indica si la compra fue confirmada
    const [success, setSuccess] = useState(false);

    // Estado del formulario de datos del usuario
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        province: "",
        city: "",
        address: "",
        postalCode: "",
        paymentMethod: "Tarjeta de crédito"
    });

    // Cálculo del total sumando los precios de los productos del carrito
    const total = cart.reduce((acc, game) => acc + game.price, 0);

    // Actualiza dinámicamente los valores del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    // Validación de email con expresión regular
    const emailValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    // Validación de teléfono (solo números, entre 8 y 15 dígitos)
    const phoneValid =
        /^[0-9]{8,15}$/.test(formData.phone);

    // Validación general del formulario antes de permitir la compra
    const formValid =
        formData.fullName.trim() &&
        emailValid &&
        phoneValid &&
        formData.country.trim() &&
        formData.province.trim() &&
        formData.city.trim() &&
        formData.address.trim() &&
        formData.postalCode.trim();

    // Simula la compra y limpia el carrito
    const handlePurchase = () => {
        setShowModal(false);
        setSuccess(true);
        setTimeout(() => {
            clearCart(); // vacía el carrito
            setSuccess(false); // resetea estado visual
            navigate("/catalog"); // redirige al catálogo
        }, 2000);
    };

    return (
        <>
            <Navbar />

            <div className="checkout-container">

                <h1>Finalizar compra</h1>

                {success && (
                    <div className="success-message">
                        Procesando compra...
                    </div>
                )}

                <div className="checkout-grid">
                    {/* Formulario de datos del usuario */}
                    <div className="checkout-form">
                        <h3>Completá con tu datos</h3>

                        <input name="fullName" placeholder="Nombre completo" onChange={handleChange} />
                        <input name="email" placeholder="Email" onChange={handleChange} />
                        <input name="phone" placeholder="Teléfono" onChange={handleChange} />
                        <input name="country" placeholder="País" onChange={handleChange} />
                        <input name="province" placeholder="Provincia" onChange={handleChange} />
                        <input name="city" placeholder="Ciudad" onChange={handleChange} />
                        <input name="address" placeholder="Dirección" onChange={handleChange} />
                        <input name="postalCode" placeholder="Código postal" onChange={handleChange} />

                        <select name="paymentMethod" onChange={handleChange}>
                            <option>Tarjeta de crédito</option>
                            <option>Mercado Pago</option>
                            <option>Transferencia bancaria</option>
                        </select>
                    </div>

                    {/* Resumen de compra */}
                    <div className="checkout-summary">

                        <h3>Resumen</h3>

                        <div className="summary-items">
                            {cart.map((game) => (
                                <div key={game.id}>
                                    {game.title} - ${game.price}
                                </div>
                            ))}
                        </div>

                        <div className="summary-footer">
                            <hr />
                            <h2>Total: ${total}</h2>

                            {/* Botón de confirmación (solo activo si el formulario es válido) */}
                            <button
                                disabled={!formValid || cart.length === 0}
                                onClick={() => setShowModal(true)}
                            >
                                Confirmar compra
                            </button>
                        </div>

                    </div>


                </div>

                {/* Modal de confirmación */}
                <ConfirmModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    onConfirm={handlePurchase}
                    title="Confirmar compra"
                    message={`Total a pagar: $${total}`}
                    confirmText="Pagar"
                />

            </div>
            <Footer />
        </>
    );
}

export default CheckOut;