import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router'

const NotFound = () => {
    // Hook para navegar entre paginas
    const navigate = useNavigate();

    // Función que redirige al usuario a la página de login
    const goBackLoginHandler = () => {
        navigate("/login");
    }

    return (
        <div className="text-center mt-3">
            {/* Mensaje principal de error 404 */}
            <h2>La página solicitada no fue encontrada</h2>

            {/* Botón que redirige al login */}
            <Button className="text-center" onClick={goBackLoginHandler}>
                volver a iniciar sesión
            </Button>
        </div>
    );
};

export default NotFound;
