
import { useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./register.css";

import { useContext } from "react";
import { AuthContext } from "../autProvider/AuthProvider";

const Register = () => {
    // Hook para navegar entre páginas
    const navigate = useNavigate();

    // Obtiene la función login desde el contexto de autenticación
    const { login } = useContext(AuthContext);

    // Estados que almacenan la información del formulario
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [dni, setDni] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // estados para mostrar mensajes de exito o error
    const [successToast, setSuccessToast] = useState("");
    const [error, setError] = useState("");

    const handleRegister = (event) => {

        // Evita que el formulario recargue la pagina
        event.preventDefault();

        // Limpia errores anteriores
        setError("");

        // Envia los datos del nuevo usuario al backend
        fetch(
            "http://localhost:3000/register",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify({
                    userName,
                    userLastName,
                    dni,
                    date,
                    email,
                    password,
                }),
            }
        )
            // Procesa la respuesta del servidor
            .then(async (res) => {

                const data =
                    await res.json();

                // Si el registro falla, lanza el mensaje recibido
                if (!res.ok) {
                    throw new Error(
                        data.message
                    );
                }

                return data;

            })
            .then((data) => {

                // Inicia sesión automáticamente luego del registro
                login({
                    ...data.user,

                    token:
                        data.token,
                });

                // Muestra un mensaje de éxito
                setSuccessToast(true);

                // Redirige al usuario a la página principal
                setTimeout(() => {
                    navigate(
                        "/home"
                    );
                }, 1000);

            })

            .catch((error) => {
                // Muestra el mensaje de error recibido del servidor
                setError(
                    error.message
                );

            });

    };
    return (
        <div className="register-container">
            <Card className="register-card">
                <Card.Body>
                    <h2 className="register-title">Game Store</h2>
                    <p className="register-subtitle mt-3">Registre su usuario</p>

                    {/* Formulario de registro de nuevos usuarios */}
                    <Form onSubmit={handleRegister}>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Nombre"
                                className="register-input"
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                            />
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Apellido"
                                className="register-input"
                                onChange={(e) => setUserLastName(e.target.value)}
                                value={userLastName}
                            />
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="int"
                                placeholder="DNI"
                                className="register-input"
                                onChange={(e) => setDni(e.target.value)}
                                value={dni}
                            />
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="date"
                                placeholder="Fecha de nacimiento"
                                className="register-input"
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                            />
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                className="register-input"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </FormGroup>

                        <FormGroup className="mb-4">
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                className="register-input"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </FormGroup>
                        <Button
                            type="submit"
                            className="create-user-button w-100">
                            Crear usuario
                        </Button>
                    </Form>
                    {/* Mensaje de exito al registrar el usuario */}
                    {successToast && (
                        <p className="mt-3 text-success">
                            Usuario Creado Correctamente ✅
                        </p>
                    )}

                    {/* mensaje de error devuelto por el servidor */}
                    {error && (
                        <p className="mt-3 text-danger">
                            {error}
                        </p>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register;