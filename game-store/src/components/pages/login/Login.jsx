import { set } from "animejs";
import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailRef.current.value.length) {
      setErrors({ email: true, password: false });
      alert("Email vacio !!");
      emailRef.current.focus();
      setMessage(true);
      return;
    } else if (!password.length || password.length < 7) {
      setErrors({ email: false, password: true });
      alert("Password vacio!!");
      passwordRef.current.focus();
      setMessage(true);
      return;
    }
    setErrors({ email: false, password: false });
    alert(`El email ingresado es: ${email} y el password es ${password}`);
    setMessage(false);
    onLogin();
    navigate("/home");
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
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;