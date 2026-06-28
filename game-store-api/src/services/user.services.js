import { User } from "../models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Creacion de usuarios
export const createUser = async (req, res) => {

    const {
        userName,
        userLastName,
        dni,
        date,
        email,
        password,
    } = req.body;

    if (
        !userName ||
        !userLastName ||
        !dni ||
        !date ||
        !email ||
        !password
    ) {
        return res.status(400).json({
            message:
                "Todos los campos son obligatorios",
        });
    }

    // VALIDAR DNI 
     if (!/^\d{7,8}$/.test(dni)) {
        return res.status(400).json({
            message: "El DNI debe contener solo números y tener entre 7 y 8 dígitos.",
        });
    }
    // NOMBRE CON SOLO LETRAS
if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(userName)) {
    return res.status(400).json({
        message: "El nombre solo puede contener letras.",
    });
}
    //VALIDAR APELLIDO
if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(userLastName)) {
    return res.status(400).json({
        message: "El apellido solo puede contener letras.",
    });
}

    try {
        
        //USUARIO CON DNI YA REGISTRADO
        const existingUser =
            await User.findOne({
                where: {
                    dni,
                },
            });

        if (existingUser) {
            return res.status(409).json({
                message:
                    "Ya hay un usuario registrado con ese DNI",
            });
        }
        //USUARIO CON EMAIL YA REGISTRADO
        const existingEmail =
            await User.findOne({
                where: { email }
            });

        if (existingEmail) {
            return res.status(409).json({
                message:
                    "Ya hay un usuario registrado con ese email",
            });
        }
        // HASHEO DE PASSWORD NO TOCAR FUNCIONA
        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        const user =
            await User.create({
                userName,
                userLastName,
                dni,
                date,
                email,
                password:
                    hashedPassword,
            });

        const token =
            jwt.sign(
                {
                    id:
                        user.id,

                    email:
                        user.email,

                    role:
                        user.role,
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:
                        "24h",
                }
            );

        res.status(201).json({

            message:
                "Usuario creado correctamente",

            token,

            user: {
                id:
                    user.id,

                userName:
                    user.userName,

                email:
                    user.email,

                role:
                    user.role,
            },

        });

    } catch (error) {

        console.error(
            "Error al crear usuario",
            error
        );

        res.status(500).json({
            message:
                error.message,
        });

    }

};


// LOGIN
export const loginUser =
    async (req, res) => {
        const {
            email,
            password,
        } = req.body;

        //BUSCAR USUARIO POR EMAIL
        try {
            const user =
                await User.findOne({
                    where: {
                        email,
                    },
                });
            if (!user) {
                return res.status(401).json({
                    message: "El email no está registrado",
                });
            }
            //VALIDAR CONTRASEÑA POR COMPARACION
            const validPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!validPassword) {
                return res.status(401).json({
                    message: "La contraseña es incorrecta",
                });
            }
            const token =
                jwt.sign(
                    {
                        id:
                            user.id,
                        email:
                            user.email,
                        role:
                            user.role,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn:
                            "24h",
                    }
                );
            res.status(200).json({
                message:
                    "Login exitoso",
                token,
                user: {
                    id: user.id,
                    userName: user.userName,
                    userLastName: user.userLastName,
                    email: user.email,
                    role: user.role,
                },

            });
        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            });
        }
    };


// Obtener Usuarios
export const getUsers =
    async (req, res) => {
        try {
            const users =
                await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            });

        }

    };


// Obtener Usuario
export const getUser =
    async (req, res) => {

        try {
            const user =
                await User.findByPk(
                    req.params.id
                );
            if (!user) {
                return res.status(404).json({
                    message:
                        "Usuario no encontrado",
                });
            }
            res.json(user);

        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            });

        }

    };


// Actualizar usuario
export const updateUser =
    async (req, res) => {

        try {
            const user =
                await User.findByPk(
                    req.params.id
                );
            if (!user) {
                return res.status(404).json({
                    message:
                        "Usuario no encontrado",
                });
            }
            await user.update(
                req.body
            );
            res.json(user);

        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            });

        }

    };


// Borrar usuario
export const deleteUser =
    async (req, res) => {

        try {
            const user =
                await User.findByPk(
                    req.params.id
                );
            if (!user) {
                return res.status(404).json({
                    message:
                        "Usuario no encontrado",
                });
            }
            await user.destroy();
            res.json({
                message:
                    "Usuario eliminado correctamente",
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            });
        }

    };