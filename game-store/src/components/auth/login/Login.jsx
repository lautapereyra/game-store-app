
import { useContext, useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../autProvider/AuthProvider";

const Login = () => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

 const handleSubmit = async (event) => {
  event.preventDefault();

  if (!emailRef.current.value.length) {
    setErrors({ email: true, password: false });
    alert("Email vacío");
    emailRef.current.focus();
    return;
  }

  if (!password.length || password.length < 7) {
    setErrors({ email: false, password: true });
    alert("Password inválido");
    passwordRef.current.focus();
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert(`Bienvenido ${data.user.userName}`);

    login(data.user);
    navigate("/home");

  } catch (error) {
    console.error(error);
    alert("Error al conectar con el servidor");
  }
};

  return (
    <div className="login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="login-title">Game Store</h2>
          <p className="login-subtitle mt-3">Iniciá sesión para continuar</p>

          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-4">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
                value={email}
                ref={emailRef}
                className={`login-input ${errors.email ? "input-error" : ""
                  }`}
              />
            </FormGroup>

            <FormGroup className="mb-4">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                onChange={handlePasswordChange}
                value={password}
                ref={passwordRef}
                className={`login-input ${errors.password ? "input-error" : ""
                  }`}
              />
            </FormGroup>

            <Button type="submit" className="login-button w-100">
              Iniciar sesión
            </Button>
             <p className="login-create-user mt-3"> No tenes usuario ?</p>
              <Button
              className="create-user-button w-100"
              onClick={() => navigate("/register")}>
              Crear usuario
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;