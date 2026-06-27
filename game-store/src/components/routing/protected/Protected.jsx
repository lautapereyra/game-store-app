import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../auth/autProvider/AuthProvider";

function Protected({ children, allowedRoles }) {

    // Obtiene información del usuario desde el contexto global
    const {
        user,
        isLoggedIn,
        loading,
    } = useContext(AuthContext);

    // Mientras se verifica la sesión, evita renderizar rutas incorrectas
    if (loading) {
        return <p>Cargando...</p>;
    }
    // Si no hay sesión activa, redirige al login
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }
    // Si la ruta tiene roles permitidos, valida permisos del usuario
    if (
        allowedRoles &&
        !allowedRoles.includes(user?.role)
    ) {
        return <Navigate to="/home" />;
    }
    // Si cumple las condiciones, renderiza la ruta protegida
    return children;
}

export default Protected;