import { set } from "animejs";
import { useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./addGame.css";

const AddGame = ({gameData, onAddGame, isEditing = false}) => {
    const [title, setTitle] = useState(gameData?.title);
    const [description, setDescription] = useState(gameData?.description);
    const [genre, setGenre] = useState(gameData?.genre);
    const [rating, setRating] = useState(gameData?.rating);
    const [platform, setPlatform] = useState(gameData?.platform);
    const [price, setPrice] = useState(gameData?.price);
    const [image, setImage] = useState(gameData?.image);
    const [gameMode, setGameMode] = useState(gameData?.gameMode);

    /*const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    /*const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const genreRef = useRef(null);
    const ratingRef = useRef(null);
    const platformRef = useRef(null);
    const priceRef = useRef(null);
    const imageRef = useRef(null);
    const gameModeRef = useRef(null);*/

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };
    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };
    const handlePlatformChange = (event) => {
        setPlatform(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const handleImageChange = (event) => {
        setImage(event.target.value);
    };
    const handleGameModeChange = (event) => {
        setGameMode(event.target.value);
    };
    /*const handleSubmit = (event) => {
    event.preventDefault();
    };*/

    const handleAddGame = (event) => {
        event.preventDefault();

        const gameData = {
            title,
            description,
            genre,
            rating: parseInt(rating, 10),
            platform,
            price,
            image,
            gameMode,
        };
        onAddGame(gameData);
        setTitle("");
        setDescription("");
        setGenre("");
        setRating("");
        setPlatform("");
        setPrice("");
        setImage("");
        setGameMode("");
    };

    const handleSavedGames = (event) => {
        event.preventDefault();

        const gameData = {
            title,
            description,
            genre,
            rating: parseInt(rating, 10),
            platform,
            price,
            image,
            gameMode,
        };
    };
  return (
        <div className="add-game-container">
            <Card className="add-game-card">
                <Card.Body>
                    <h2>Agregar juego</h2>
                    <p>Ingresa un juego para guardarlo</p>

                    <Form onSubmit={isEditing ? handleSavedGames:handleAddGame}>
                        <FormGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Título"
                                onChange={handleTitleChange}
                                value={title}
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Descripción"
                                onChange={handleDescriptionChange}
                                value={description}
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Género"
                                onChange={handleGenreChange}
                                value={genre}
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="number"
                                max="10"
                                min="1"
                                placeholder="Rating"
                                onChange={handleRatingChange}
                                value={rating}
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Plataforma"
                                onChange={handlePlatformChange}
                                value={platform}
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Imagen (URL)"
                                onChange={handleImageChange}
                                value={image}
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="number"
                                placeholder="Precio"
                                onChange={handlePriceChange}
                                value={price}
                            />
                        </FormGroup>

                        <FormGroup className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Modo de juego"
                                onChange={handleGameModeChange}
                                value={gameMode}
                            />
                        </FormGroup>

                        <Button type="submit" className="w-100">
                            Guardar Juego
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default AddGame