import { useState } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";

import "./addGame.css";

const AddGame = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");
    const [platform, setPlatform] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [gameMode, setGameMode] = useState("");

    // MENSAJE DE ÉXITO
    const [success, setSuccess] = useState(false);

    // MENSAJE DE ERROR
    const [error, setError] = useState(false);

    const handleAddGame = async (event) => {

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

            // POST AL BACKEND
            const response = await fetch(
                "http://localhost:3000/games",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(gameData),
                }
            );

            // ERROR
            if (!response.ok) {
                throw new Error("Error al guardar juego");
            }

            // EXITO
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
            }, 2000);

            // LIMPIA FORMULARIO
            setTitle("");
            setDescription("");
            setGenre("");
            setRating("");
            setPlatform("");
            setPrice("");
            setImage("");
            setGameMode("");

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

                    <h2>Agregar juego</h2>

                    <p>
                        Ingresa un juego para guardarlo
                    </p>

                    <Form onSubmit={handleAddGame}>

                        <FormGroup className="mb-3">

                            <Form.Control
                                type="text"
                                placeholder="Título"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />

                        </FormGroup>

                        <FormGroup className="mb-3">

                            <Form.Control
                                type="text"
                                placeholder="Descripción"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />

                        </FormGroup>

                        <FormGroup className="mb-3">

                            <Form.Control
                                type="text"
                                placeholder="Género"
                                onChange={(e) => setGenre(e.target.value)}
                                value={genre}
                            />

                        </FormGroup>

                        <FormGroup className="mb-3">

                            <Form.Control
                                type="number"
                                max="10"
                                min="1"
                                placeholder="Rating"
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                            />

                        </FormGroup>

                        <FormGroup className="mb-3">

                            <Form.Control
                                type="text"
                                placeholder="Plataforma"
                                onChange={(e) => setPlatform(e.target.value)}
                                value={platform}
                            />

                        </FormGroup>

                        <FormGroup className="mb-3">

                            <Form.Control
                                type="text"
                                placeholder="Imagen (URL)"
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                            />

                        </FormGroup>

                        <FormGroup className="mb-3">

                            <Form.Control
                                type="number"
                                placeholder="Precio"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />

                        </FormGroup>

                        <FormGroup className="mb-4">

                            <Form.Control
                                type="text"
                                placeholder="Modo de juego"
                                onChange={(e) => setGameMode(e.target.value)}
                                value={gameMode}
                            />

                        </FormGroup>

                        <Button type="submit" className="w-100">
                            Guardar Juego
                        </Button>

                    </Form>

                    {/* 🔹 MENSAJE DE ÉXITO */}
                    {success && (
                        <p className="mt-3 text-success">
                            Juego guardado correctamente ✅
                        </p>
                    )}

                    {/* 🔹 MENSAJE DE ERROR */}
                    {error && (
                        <p className="mt-3 text-danger">
                            Error al guardar juego ❌
                        </p>
                    )}

                </Card.Body>

            </Card>

        </div>
    );
}

export default AddGame;