import { User } from "../models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// CREATE USER
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

    try {

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
            "ERROR CREATE USER:",
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

        try {

            const user =
                await User.findOne({
                    where: {
                        email,
                    },
                });

            if (!user) {
                return res.status(401).json({
                    message:
                        "Email o contraseña incorrectos",
                });
            }

            const validPassword =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!validPassword) {
                return res.status(401).json({
                    message:
                        "Email o contraseña incorrectos",
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

            res.status(500).json({
                message:
                    error.message,
            });

        }

    };


// GET USERS
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


// GET USER
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
                        "User not found",
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


// UPDATE
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
                        "User not found",
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


// DELETE
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
                        "User not found",
                });
            }

            await user.destroy();

            res.json({
                message:
                    "User deleted successfully",
            });

        } catch (error) {

            res.status(500).json({
                message:
                    error.message,
            });

        }

    };