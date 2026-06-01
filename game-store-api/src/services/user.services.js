import { User } from '../models/User.js';



export const createUser = async (req, res) => {
     console.log(req.body);
    const {
        userName,
        userLastName,
        dni,
        date,
        email,
        password,
    } = req.body;
    
console.log({
    userName,
    userLastName,
    dni,
    date,
    email,
    password,
});
    // VALIDACIÓN
    if (
        !userName||
        !userLastName ||
        !dni ||
        !date ||
        !email ||
        !password
    ) {
        return res.status(400).json({
            message: "Todos los campos son obligatorios"
        });
    }

    try {

        const user = await User.create({
            userName,
            userLastName,
            dni,
            date,
            email,
            password,
        });

        res.status(201).json(user);

    } catch (error) {
        console.error("ERROR CREATE USER:", error);

        res.status(500).json({
            message: error.message
        });

    }
};
export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({
            where: {
                email,
                password
            }
        });

        if (!user) {
            return res.status(401).json({
                message: "Email o contraseña incorrectos"
            });
        }

        res.status(200).json({
            message: "Login exitoso",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

}};

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