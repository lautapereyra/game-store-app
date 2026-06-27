import { createContext, useState, useEffect } from "react";

// Contexto que permitirá compartir la información del usuario con todos los componentes de la aplicación.
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Estado que almacena el usuario autenticado
    const [user, setUser] = useState(null);

    // Indica cuándo terminó la carga inicial del usuario
    const [loading, setLoading] = useState(true);


    // Al iniciar la aplicación, recupera la sesión almacenada en localStorage para mantener al usuario logueado.
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    // Guarda la información del usuario en el estado y en localStorage al iniciar sesión.
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // Cierra la sesión eliminando los datos del usuario tanto del estado como del almacenamiento local.
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            // Datos compartidos con toda la aplicación
            value={{
                user,
                login,
                logout,
                loading,
                isLoggedIn: !!user,
            }}
        >
            {/* Renderiza los componentes hijos con acceso al contexto */}
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;