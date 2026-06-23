import { useContext, useState } from 'react';
import { AuthContext } from '../auth/autProvider/AuthProvider';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ConfirmModal from '../modal/ConfirmModal';
import './navbar.css';

const Navbar = () => {

    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container custom-navbar">

                <Link to="/home" className="navbar-brand">
                    Game Store
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarContent"
                >
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
                                    onClick={() => setShowLogoutModal(true)}
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
                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
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
                                    {(user?.role === "ADMIN") && (
                                        <li>
                                            <button
                                                className="dropdown-item"
                                                onClick={() => navigate("/users")}
                                            >
                                                Ver usuarios
                                            </button>
                                        </li>)}
                                </ul>
                            </div>
                        )}

                    </div>

                </div>
            </div>

            <ConfirmModal
                show={showLogoutModal}
                onHide={() => setShowLogoutModal(false)}
                onConfirm={() => {
                    logout();
                    navigate("/home");
                    setTimeout(() => {
                        setShowLogoutModal(false);
                    }, 300);
                }}
                title="Cerrar sesión"
                message="¿De verdad deseas cerrar sesión?"
                confirmText="Sí, cerrar sesión"
            />
        </nav>
    );
};

export default Navbar;