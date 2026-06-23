import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../../navbar/Navbar";
import GamesForm from "../../games/gameForm/GamesForm.jsx";
import Footer from '../../footer/Footer.jsx'
import "./addGame.css";

const EditGame = () => {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const [game, setGame] =
        useState(null);

    const [success, setSuccess] =
        useState(false);

    const [error, setError] =
        useState(false);

    useEffect(() => {

        fetch(
            `http://localhost:3000/games/${id}`
        )
            .then((res) =>
                res.json()
            )
            .then(setGame);

    }, [id]);

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const response =
                    await fetch(
                        `http://localhost:3000/games/${id}`,
                        {
                            method:
                                "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify(game),
                        }
                    );

                if (!response.ok)
                    throw new Error();

                setSuccess(true);

                setTimeout(
                    () =>
                        navigate(
                            "/catalog"
                        ),
                    1500
                );

            } catch {

                setError(true);
            }
        };

    if (!game)
        return <p>Cargando…</p>;

    return (
        <>
            <Navbar />

            <div
                className="add-game-container"
            >

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
        </>
    );
};

export default EditGame;