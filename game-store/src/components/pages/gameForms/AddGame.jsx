import { useState } from "react";
import { useNavigate } from "react-router";

import Navbar from "../../navbar/Navbar";
import GameForm from "../../games/gameForm/GamesForm";

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

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const response =
                    await fetch(
                        "http://localhost:3000/games",
                        {
                            method: "POST",

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
        </>
    );
};

export default AddGame;