import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define(
    "user",
    {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        dni: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        fechaNacimiento: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    {
        timestamps: false,
    }
);