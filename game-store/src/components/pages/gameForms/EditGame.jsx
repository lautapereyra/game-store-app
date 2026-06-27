import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../../navbar/Navbar";
import GamesForm from "../../games/gameForm/GamesForm.jsx";
import Footer from '../../footer/Footer.jsx'
import "./addGame.css";
import MessageModal from "../../modal/messageModal/MessageModal.jsx";

const EditGame = () => {
    // Obtiene el ID del juego desde la URL
    const { id } = useParams();

    // Hook para navegar entre rutas
    const navigate = useNavigate();

    // Estado que almacena el juego a editar (inicialmente null hasta que se carga)
    const [game, setGame] = useState(null);

    // Estados de feedback
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // Estado del modal de mensajes
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    // Al montar el componente se obtiene el juego por ID para precargar el formulario
    useEffect(() => {
        fetch(
            `http://localhost:3000/games/${id}`
        )
            .then((res) =>
                res.json()
            )
            .then(setGame);

    }, [id]);

    // Envía los cambios del juego al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:3000/games/${id}`,
                {
                    method: "PUT",
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
            setModalMessage("El juego fue actualizado correctamente.");
            setShowModal(true);

            setTimeout(() => {
                navigate("/catalog");
            }, 2000);

        } catch (error) {

            console.error(error);

            setError(true);

            setModalTitle("Error");
            setModalMessage("No se pudo actualizar el juego.");
            setShowModal(true);
        }
    };
    return (
        <>
            <Navbar />

            <div
                className="add-game-container"
            >
                {/* Formulario reutilizado para editar el juego */}
                <GamesForm
                    game={game}
                    setGame={setGame}
                    onSubmit={handleSubmit}
                    success={success}
                    error={error}
                    isEdit={true}
                />

            </div>
            <Footer />

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

export default EditGame;