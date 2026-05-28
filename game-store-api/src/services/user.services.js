import { User } from '../models/User.js';

export const createUser = async (req, res) => {
    const {
        nombre,
        apellido,
        dni,
        fechaNacimiento,
        email,
        password
    } = req.body;
    // VALIDACIÓN
    if (
        !nombre ||
        !apellido ||
        !dni ||
        !fechaNacimiento ||
        !email ||
        !password
    ) {
        return res.status(400).send({
            message: "Nombre, apellido, dni, fecha de nacimiento, email y password son obligatorios"
        });
    }
    try {
        const user = await User.create({
            nombre,
            apellido,
            dni,
            fechaNacimiento,
            email,
            password
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};