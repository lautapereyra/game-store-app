import { Button, Card, Form, FormGroup } from "react-bootstrap";
import Navbar from "../../navbar/Navbar";

// Listas utilizadas para generar las opciones de los select
const genres = [
    "Acción",
    "Aventura",
    "RPG",
    "Shooter",
    "Deportes",
    "Estrategia",
    "Terror",
    "Carreras",
];

const platforms = [
    "PC",
    "PlayStation 5",
    "Xbox Series X",
    "Nintendo Switch",
    "Mobile",
];

const gameModes = [
    "Single Player",
    "Multiplayer",
    "Cooperativo",
    "Online",
];

const GamesForm = ({
    game,
    setGame,
    onSubmit,
    success,
    error,
    isEdit,
}) => {
    // Actualiza dinámicamente el campo modificado del formulario
    const handleChange = (field, value) => {
        setGame({
            ...game,
            [field]: value,
        });
    };

    return (

        <>

            <Card className="add-game-card">

                <Card.Body>
                    {/* El título cambia según si se agrega o edita un juego */}
                    <h2>
                        {isEdit
                            ? "Editar juego"
                            : "Agregar juego"}
                    </h2>

                    {/* Formulario reutilizable para crear o editar videojuegos */}
                    <Form onSubmit={onSubmit}>

                        <FormGroup className="mb-3">
                            <Form.Control
                                placeholder="Título"
                                value={game?.title || ""}
                                onChange={(e) =>
                                    handleChange(
                                        "title",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                placeholder="Descripción"
                                value={game?.description || ""}
                                onChange={(e) =>
                                    handleChange(
                                        "description",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Select
                                value={game?.genre || ""}
                                onChange={(e) =>
                                    handleChange(
                                        "genre",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Seleccionar género
                                </option>

                                {genres.map((g) => (
                                    <option
                                        key={g}
                                        value={g}
                                    >
                                        {g}
                                    </option>
                                ))}
                            </Form.Select>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="number"
                                min="1"
                                max="10"
                                placeholder="Rating"
                                value={game?.rating || ""}
                                onChange={(e) =>
                                    handleChange(
                                        "rating",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Select
                                value={game?.platform || ""}
                                onChange={(e) =>
                                    handleChange(
                                        "platform",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Seleccionar plataforma
                                </option>

                                {platforms.map((p) => (
                                    <option
                                        key={p}
                                        value={p}
                                    >
                                        {p}
                                    </option>
                                ))}
                            </Form.Select>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                placeholder="Imagen URL"
                                value={game?.image || ""}
                                onChange={(e) =>
                                    handleChange(
                                        "image",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Form.Control
                                type="number"
                                placeholder="Precio"
                                value={game?.price || ""}
                                onChange={(e) =>
                                    handleChange(
                                        "price",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>

                        <FormGroup className="mb-4">
                            <Form.Select
                                value={game?.gameMode || ""}
                                onChange={(e) =>
                                    handleChange(
                                        "gameMode",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="">
                                    Seleccionar modo
                                </option>

                                {gameModes.map((m) => (
                                    <option
                                        key={m}
                                        value={m}
                                    >
                                        {m}
                                    </option>
                                ))}
                            </Form.Select>
                        </FormGroup>

                        <Button
                            type="submit"
                            className="btn btn-danger"
                        >
                            {isEdit
                                ? "Guardar cambios"
                                : "Guardar juego"}
                        </Button>

                    </Form>
                    {/* Mensaje de éxito */}
                    {success &&
                        <p className="text-success mt-3">
                            Guardado correctamente ✅
                        </p>
                    }
                    {/* Mensaje de error */}
                    {error &&
                        <p className="text-danger mt-3">
                            Error ❌
                        </p>
                    }

                </Card.Body>

            </Card>
        </>
    );
};

export default GamesForm;