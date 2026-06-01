import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Game = sequelize.define("game", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    gameMode: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    platform: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
},
    {
        timestamps: false,
    }
);