import { User } from '../models/User.js';



export const createUser = async (req, res) => {

    const {
        nombre,
        apellido,
        dni,
        fechaNacimiento,
        email,
        password,
        role
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
        return res.status(400).json({
            message: "Todos los campos son obligatorios"
        });
    }

    try {

        const user = await User.create({
            nombre,
            apellido,
            dni,
            fechaNacimiento,
            email,
            password,
            role
        });

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const getUsers = async (req, res) => {

    try {

        const users = await User.findAll();

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const getUser = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.update(req.body);

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.destroy();

        res.json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};