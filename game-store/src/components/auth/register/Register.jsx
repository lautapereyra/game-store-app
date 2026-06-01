
import { useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {

    const navigate = useNavigate();
    const [userName,setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [dni,setDni] = useState("");
    const [date,setDate] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [successToast, setSuccessToast] = useState("");
    const [error, setError] = useState("");

    
  const handleRegister = (event) => {
    event.preventDefault();
    console.log({
    userName,
    userLastName,
    dni,
    date,
    email,
    password,
});

    fetch("http://localhost:3000/register", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ userName, userLastName,dni, date, email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return res.json();
      })
      .then(() => {
        setSuccessToast(true);
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      })
      .catch((error) => {console.log(error);
        setError(true)}
      );
  };
    return (
        <div className="register-container">
            <Card className="register-card">
                <Card.Body>
                    <h2 className="register-title">Game Store</h2>
                    <p className="register-subtitle mt-3">Registre su usuario</p>

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
                         {/* 🔹 MENSAJE DE ÉXITO */}
                    {successToast && (
                        <p className="mt-3 text-success">
                            Usuario Creado Correctamente ✅
                        </p>
                    )}

                    {/* 🔹 MENSAJE DE ERROR */}
                    {error && (
                        <p className="mt-3 text-danger">
                            Error al crear un usuario ❌
                        </p>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register;