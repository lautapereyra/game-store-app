
import { useContext, useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../autProvider/AuthProvider";
import MessageModal from "../../modal/messageModal/MessageModal";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

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

    if (!email.trim()) {
      setErrors({ email: true, password: false });
      setModalTitle("Error");
      setModalMessage("Debe ingresar un email");
      setShowModal(true);
      emailRef.current.focus();
      return;
    }

    if (!password.trim()) {
      setErrors({ email: false, password: true });
      setModalTitle("Error");
      setModalMessage("Debe ingresar una contraseña");
      setShowModal(true);
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
        setModalTitle("Error");
        setModalMessage(data.message);
        setShowModal(true);

        if (data.message === "El email no está registrado") {
          setErrors({ email: true, password: false });
          emailRef.current.focus();
        }

        if (data.message === "La contraseña es incorrecta") {
          setErrors({ email: false, password: true });
          passwordRef.current.focus();
        }

        return;
      }

      // Login exitoso
      setModalTitle("Bienvenido");
      setModalMessage(
        `Bienvenido ${data.user.userName} ${data.user.userLastName}`
      );
      setShowModal(true);

      setTimeout(() => {
        login(data.user);
        navigate("/home");
      }, 2000);

    } catch (error) {
      console.error(error);
      setModalTitle("Error");
      setModalMessage("Error al conectar con el servidor");
      setShowModal(true);
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
            <MessageModal
              show={showModal}
              onHide={() => setShowModal(false)}
              title={modalTitle}
              message={modalMessage}
            />

          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;