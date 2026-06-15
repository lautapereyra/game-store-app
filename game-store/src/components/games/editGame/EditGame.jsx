import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, FormGroup } from "react-bootstrap";

import "./editGame.css";

const EditGame = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");
    const [platform, setPlatform] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [gameMode, setGameMode] = useState("");

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {

        fetch(`http://localhost:3000/games/${id}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title);
                setDescription(data.description);
                setGenre(data.genre);
                setRating(data.rating);
                setPlatform(data.platform);
                setPrice(data.price);
                setImage(data.image);
                setGameMode(data.gameMode);
            })
            .catch(err => console.error(err));

    }, [id]);

    const handleEditGame = async (event) => {

        event.preventDefault();

        const gameData = {
            title,
            description,
            genre,
            rating: parseFloat(rating),
            platform,
            price: parseFloat(price),
            image,
            gameMode,
        };

        try {

            const response = await fetch(
                `http://localhost:3000/games/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(gameData),
                }
            );

            if (!response.ok) {
                throw new Error("Error al actualizar juego");
            }

            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
                navigate("/catalog");
            }, 1500);

        } catch (error) {

            console.error(error);

            setError(true);

            setTimeout(() => {
                setError(false);
            }, 2000);
        }
    };

    return (

        <div className="add-game-container">

            <Card className="add-game-card">

                <Card.Body>

                    <h2>Editar juego</h2>

                    <p>
                        Modifica la información del juego
                    </p>

                    <Form onSubmit={handleEditGame}>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Título"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Descripción"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Género"
                                value={genre}
                                onChange={(e) =>
                                    setGenre(e.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="number"
                                min="1"
                                max="10"
                                placeholder="Rating"
                                value={rating}
                                onChange={(e) =>
                                    setRating(e.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Plataforma"
                                value={platform}
                                onChange={(e) =>
                                    setPlatform(e.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Imagen (URL)"
                                value={image}
                                onChange={(e) =>
                                    setImage(e.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="number"
                                placeholder="Precio"
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Modo de juego"
                                value={gameMode}
                                onChange={(e) =>
                                    setGameMode(e.target.value)
                                }
                            />
                        </FormGroup>

                        <button
                            type="submit"
                            className="btn btn-danger w-100"
                        >
                            Guardar cambios
                        </button>

                    </Form>

                    {success && (
                        <p className="mt-3 text-success">
                            Juego actualizado correctamente ✅
                        </p>
                    )}

                    {error && (
                        <p className="mt-3 text-danger">
                            Error al actualizar juego ❌
                        </p>
                    )}

                </Card.Body>

            </Card>

        </div>
    );
};

export default EditGame;