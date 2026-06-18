import { News } from '../models/News.js';

export const findNews = async (req, res) => {
    try {
        const news = await News.findAll({
            order: [["publishedAt", "DESC"]]
        });

        res.json(news);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener noticias" });
    }
};

export const findOneNews = async (req, res) => {
    const { id } = req.params;
    const news = await News.findByPk(id);

    if (!news) {
        return res.status(404).send({ message: "News not found" });
    }

    res.json(news);
};

export const createNews = async (req, res) => {
    const {
        title,
        source,
        image,
        content,
        publishedAt
    } = req.body;

    // validación
    if (!title || !image || !content) {
        return res.status(400).send({
            message: "Title, image and content are required"
        });
    }

    const newNews = await News.create({
        title,
        source,
        image,
        content,
        publishedAt: publishedAt || new Date()
    });

    res.json(newNews);
};

export const editNews = async (req, res) => {
    const { id } = req.params;

    const {
        title,
        source,
        image,
        content,
        publishedAt
    } = req.body;

    const news = await News.findByPk(id);

    if (!news) {
        return res.status(404).send({
            message: "News not found"
        });
    }

    await news.update({
        title,
        source,
        image,
        content,
        publishedAt
    });

    await news.save();

    res.json(news);
};

export const deleteNews = async (req, res) => {
    const { id } = req.params;

    const news = await News.findByPk(id);

    if (!news) {
        return res.status(404).send({
            message: "News not found"
        });
    }

    await news.destroy();
    res.send(`Noticia con id: ${id} eliminada exitosamente`);
};