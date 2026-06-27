import { useContext, useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../autProvider/AuthProvider";
import MessageModal from "../../modal/messageModal/MessageModal";

const Login = () => {
  // Obtiene la funcion de login desde el contexto de autenticación
  const { login } = useContext(AuthContext);

  // Estados para almacenar los datos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para controlar errores de validación en los campos
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  // Estados utilizados para mostrar mensajes en el modal
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  //Useref para hacer focus automaticamente en los campos cuando ocurre un error de validacón
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //actualiza el estado del mail mientras el usuario escribe
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Actualiza el estado de la contraseña
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //Hook para realizar la navegación entre páginas
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Validación de campos obligatorios
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

      // Envia los datos al backend para autenticar al usuario
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

      // si el servidor devuelve un error, se informa al usuario y se hace focus en el campo correspondiente
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
      // Error de conexión con el servidor
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

          {/* Formulario de inicio de sesión */}
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

            {/* Modal reutilizable para mostrar mensajes de éxito o error */}
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