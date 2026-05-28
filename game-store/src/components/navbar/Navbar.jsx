import React from 'react'
import './navbar.css'
import { Link, NavLink } from 'react-router'

const Navbar = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container custom-navbar">
                <Link to="/home" className="navbar-brand">
                    Game Store
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">                        <li className="nav-item">
                        <NavLink to="/home" className="nav-link">
                            Home
                        </NavLink>
                    </li>
                        <li className="nav-item">
                            <NavLink to="/catalog" className="nav-link">
                                Juegos
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle ms-3" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu ms-3" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex ms-5">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>
                    <Link to="/login">
                        <button className="btn btn-outline-success ms-2">
                            Iniciar Sesión
                        </button>
                    </Link>
                    <Link to="/cart">
                        <button className="btn btn-outline-primary ms-2">
                            <i className="bi bi-cart"></i>
                        </button>
                    </Link>
                    <Link to="/addGame">
                        <button className="btn btn-outline-primary ms-2">
                            <i className="bi bi-plus"></i>
                        </button>
                    </Link>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;
