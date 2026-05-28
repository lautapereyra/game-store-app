import { Router } from 'express';
import { findGame, findGames, createGame, editGame, deleteGame } from '../services/game.services.js';
import { createUser } from '../services/user.services.js';

const router = Router();

router.get("/games", findGames);
router.get("/games/:id", findGame);
router.post("/games", createGame);
router.put("/games/:id", editGame);
router.delete("/games/:id", deleteGame);

router.post("/users", createUser);

export default router;