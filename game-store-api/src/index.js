import express from 'express';
import { PORT } from './config.js';
import { sequelize } from './db.js';
import cors from "cors";

import "./models/Game.js";
import "./models/User.js";
import "./models/News.js";

import gameRoutes from './routes/games.routes.js';
import userRoutes from './routes/users.routes.js';
import newsRoutes from './routes/news.routes.js';

const app = express();

try {
    app.use(cors());
    app.use(express.json());

    app.get("/", (req, res) => {
        res.json({
            message: "GameStore API funcionando"
        });
    });

    // routes
    app.use(gameRoutes);
    app.use(userRoutes);
    app.use(newsRoutes);

    await sequelize.sync();

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });

} catch (error) {
    console.log(error);
}