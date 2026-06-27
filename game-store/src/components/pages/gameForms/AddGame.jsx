import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../../navbar/Navbar";
import GameForm from "../../games/gameForm/GamesForm";
import MessageModal from "../../modal/messageModal/MessageModal";
import "./addGame.css";

const AddGame = () => {

    // Hook para navegar entre rutas
    const navigate = useNavigate();

    // Estructura inicial del formulario (valores vacíos)
    const emptyGame = {
        title: "",
        description: "",
        genre: "",
        rating: "",
        platform: "",
        price: "",
        image: "",
        gameMode: "",
    };

    // Estado del formulario del juego
    const [game, setGame] = useState(emptyGame);

    // Estados para feedback visual
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // Estado del modal de mensajes
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    // Envía el nuevo juego al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:3000/games",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(game),
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            setSuccess(true);

            setModalTitle("Éxito");
            setModalMessage("El juego fue agregado correctamente.");
            setShowModal(true);

            setTimeout(() => {
                navigate("/catalog");
            }, 2000);

        } catch (error) {

            console.error(error);

            setError(true);

            setModalTitle("Error");
            setModalMessage("No se pudo agregar el juego.");
            setShowModal(true);
        }
    };

    return (
        <>
            <Navbar />

            <div
                className="add-game-container"
            >
                {/* Formulario de alta de juego */}
                <GameForm
                    game={game}
                    setGame={setGame}
                    onSubmit={handleSubmit}
                    success={success}
                    error={error}
                    isEdit={false}
                />
            </div>
            {/* Modal de feedback */}
            <MessageModal
                show={showModal}
                onHide={() => setShowModal(false)}
                title={modalTitle}
                message={modalMessage}
            />
        </>
    );
};

export default AddGame;