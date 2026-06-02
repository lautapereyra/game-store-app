import { useContext } from 'react';
import { AuthContext } from '../auth/autProvider/AuthProvider';
import './navbar.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container custom-navbar">

                <Link to="/home" className="navbar-brand">
                    Game Store
                </Link>

                <div className="collapse navbar-collapse d-flex justify-content-between align-items-center">

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <NavLink to="/home" className="nav-link">
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/catalog" className="nav-link">
                                Juegos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/news" className="nav-link">
                                noticias
                            </NavLink>
                        </li>

                    </ul>

                    <div className="user-section ms-3 d-flex align-items-center gap-2 flex-nowrap">

                        {isLoggedIn ? (
                            <>
                                <span className="me-3 user-name">
                                    Hola, {user.userName}
                                </span>

                                <button
                                    className="btn btn-danger"
                                    title="Cerrar Sesion"
                                    onClick={() => {
                                        logout();
                                        navigate("/home");
                                    }}
                                >
                                    Cerrar sesión
                                </button>
                                <button
                                    className="btn btn-outline-primary ms-2"
                                    title="Carrito"
                                    onClick={() => {
                                        navigate("/cart")
                                    }}>
                                    <i className="bi bi-cart"></i>
                                </button>
                            </>
                        ) : (
                            <button
                                className="btn btn-success"
                                onClick={() => navigate("/login")}
                            >
                                Iniciar sesión
                            </button>
                        )}
                        {(user?.role === "ADMIN" || user?.role === "MODERATOR") && (
                            <div className="dropdown ms-2">
                                <button
                                    className="btn btn-outline-primary dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Admin
                                </button>

                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => navigate("/addGame")}
                                        >
                                            Agregar juegos
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => navigate("/news/add")}
                                        >
                                            Agregar Noticias
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => navigate("/users")}
                                        >
                                            Ver usuarios
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;