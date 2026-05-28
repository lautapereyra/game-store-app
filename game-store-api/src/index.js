import express from 'express';
import { PORT } from './config.js'
import { sequelize } from './db.js';
import cors from "cors";

import "./models/Game.js"
import "./models/User.js";

import gameRoutes from './routes/games.routes.js'

const app = express();

try {
    app.use(cors());
    app.use(express.json())
    app.use(gameRoutes);
    await sequelize.sync();
    app.listen(PORT);

    console.log(`Server listening on port ${PORT}`)

} catch (error) {
    console.log(`There was an error on initialization`)
}