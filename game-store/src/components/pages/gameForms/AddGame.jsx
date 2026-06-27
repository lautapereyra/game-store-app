import { useState } from "react";
import { useNavigate } from "react-router";

import Navbar from "../../navbar/Navbar";
import GameForm from "../../games/gameForm/GamesForm";

import MessageModal from "../../modal/messageModal/MessageModal";


import "./addGame.css";

const AddGame = () => {

    const navigate = useNavigate();

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

    const [game, setGame] =
        useState(emptyGame);

    const [success, setSuccess] =
        useState(false);

    const [error, setError] =
        useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

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
                <GameForm
                    game={game}
                    setGame={setGame}
                    onSubmit={handleSubmit}
                    success={success}
                    error={error}
                    isEdit={false}
                />
            </div>
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