import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../auth/autProvider/AuthProvider";

function Protected({ children, allowedRoles }) {
    const { user, isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (
        allowedRoles &&
        !allowedRoles.includes(user?.role)
    ) {
        return <Navigate to="/home" />;
    }

    return children;
}

export default Protected;