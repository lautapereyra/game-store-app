import { News } from '../models/News.js';


//Buscar Todas las noticias
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

// Buscar 1 sola noticia
export const findOneNews = async (req, res) => {
    const { id } = req.params;
    const news = await News.findByPk(id);

    if (!news) {
        return res.status(404).send({ message: "Noticia no encontrada" });
    }

    res.json(news);
};

//Crear noticias
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
            message: "Titulo, imagen y descripcion son necesarios"
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
// Editar noticias
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
            message: "Noticia no encontrada"
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
// Borrar noticias
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