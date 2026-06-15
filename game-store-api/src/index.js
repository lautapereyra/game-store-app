import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import "./models/Game.js";
import "./models/User.js";
import "./models/News.js";

import gameRoutes from "./routes/games.routes.js";
import userRoutes from "./routes/users.routes.js";
import newsRoutes from "./routes/news.routes.js";


// CARGAR VARIABLES DE ENTORNO
dotenv.config();


// CREAR APP
const app = express();

try {

    // MIDDLEWARES
    app.use(cors());

    app.use(express.json());

    // TEST
    app.get("/", (req, res) => {

        res.json({
            message:
                "GameStore API funcionando",
        });

    });

    // ROUTES
    app.use(gameRoutes);

    app.use(userRoutes);

    app.use(newsRoutes);

    // DB
    await sequelize.sync();

    // SERVER
    app.listen(PORT, () => {

        console.log(
            `Server listening on port ${PORT}`
        );

    });

} catch (error) {

    console.log(error);

}