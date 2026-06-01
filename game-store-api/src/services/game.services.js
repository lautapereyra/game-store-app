import { Game } from '../models/Game.js';


export const findGames = async (req, res) => {
    const games = await Game.findAll();
    res.json(games);
};

export const findGame = async (req, res) => {
    const { id } = req.params;
    const game = await Game.findByPk(id);

    if (!game) {
        return res.status(404).send({ message: "Game not found" });
    }

    res.json(game);
};

export const createGame = async (req, res) => {
    const {
        title,
        genre,
        gameMode,
        rating,
        platform,
        price,
        image,
        description
    } = req.body;

    //validacion
    if (!title || !genre || !gameMode || !rating || !platform || !price || !image || !description) {
        return res.status(400).send({ message: "Title, genre, game mode, rating, platform, price, image and description are required" });
    }

    const newGame = await Game.create({
        title,
        genre,
        gameMode,
        rating,
        platform,
        price,
        image,
        description
    });
    res.json(newGame);
};

export const editGame = async (req, res) => {

    const { id } = req.params;

    const {
        title,
        genre,
        gameMode,
        rating,
        platform,
        price,
        image,
        description
    } = req.body;

    const game = await Game.findByPk(id);

    if (!game) {
        return res.status(404).send({
            message: "Game not found"
        });
    }

    await game.update({
        title,
        genre,
        gameMode,
        rating,
        platform,
        price,
        image,
        description
    });

    await game.save();

    res.json(game);
};

export const deleteGame = async (req, res) => {
    const { id } = req.params;
    const game = await Game.findByPk(id);

    if (!game) {
        return res.status(404).send({
            message: "Game not found"
        });
    }

    await game.destroy();
    res.send(`Juego con id: ${id} eliminado exitosamente`);
};

