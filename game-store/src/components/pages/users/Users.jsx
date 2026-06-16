import { useEffect, useState } from "react";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer.jsx"
import "./users.css";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const fetchUsers = () => {
        fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // 🗑 ELIMINAR USUARIO
    const handleDelete = (id) => {
        fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(() => fetchUsers())
            .catch(err => console.log(err));
    };

    // 🔁 CAMBIAR ROL
    const handleRoleChange = (id, newRole) => {
        fetch(`http://localhost:3000/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ role: newRole })
        })
            .then(res => res.json())
            .then(() => fetchUsers())
            .catch(err => console.log(err));
    };
    // buscador de usuarios
    const filteredUsers = users.filter(user =>
        (user.nombre || user.userName || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <div className="users-page">
                <div className="container mt-4 users-container">
                    <h2 className="users-title">Usuarios registrados</h2>

                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Buscar usuario..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <table className="table table-dark table-striped mt-3 users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nombre || user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>

                                    <td>
                                        <div className="actions-container">
                                            <select
                                                className="form-select form-select-sm role-select"
                                                value={user.role}
                                                onChange={(e) =>
                                                    handleRoleChange(user.id, e.target.value)
                                                }
                                            >
                                                <option value="USER">USER</option>
                                                <option value="MODERATOR">MODERATOR</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </select>

                                            <button
                                                className="btn btn-danger btn-sm delete-btn"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
            </div>
            <Footer />
        </>
    );
};

export default Users;