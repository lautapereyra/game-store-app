import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import ConfirmModal from "../../modal/confirmModal/ConfirmModal";
import "./checkout.css";

function CheckOut({ cart = [], clearCart }) {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState(false);

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

    const total = cart.reduce((acc, game) => acc + game.price, 0);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const emailValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

    const phoneValid =
        /^[0-9]{8,15}$/.test(formData.phone);

    const formValid =
        formData.fullName.trim() &&
        emailValid &&
        phoneValid &&
        formData.country.trim() &&
        formData.province.trim() &&
        formData.city.trim() &&
        formData.address.trim() &&
        formData.postalCode.trim();

    const handlePurchase = () => {

        setShowModal(false);
        setSuccess(true);

        setTimeout(() => {
            clearCart();
            setSuccess(false);
            navigate("/catalog");
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

                    <div className="checkout-form">
                        <h3>Datos del comprador</h3>

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

                    <div className="checkout-summary">

                        <h3>Resumen</h3>

                        {cart.map((game) => (
                            <div key={game.id}>
                                {game.title} - ${game.price}
                            </div>
                        ))}

                        <hr />

                        <h2>Total: ${total}</h2>

                        <button
                            disabled={!formValid || cart.length === 0}
                            onClick={() => setShowModal(true)}
                        >
                            Confirmar compra
                        </button>

                    </div>
                </div>

                <ConfirmModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    onConfirm={handlePurchase}
                    title="Confirmar compra"
                    message={`Total a pagar: $${total}`}
                    confirmText="Pagar"
                />

            </div>
        </>
    );
}

export default CheckOut;