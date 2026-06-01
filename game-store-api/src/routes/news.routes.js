import { Router } from "express";
import {
    findNews,
    findOneNews,
    createNews,
    editNews,
    deleteNews
} from "../services/news.services.js";

const router = Router();

// rutas
router.get("/news", findNews);
router.get("/news/:id", findOneNews);
router.post("/news", createNews);
router.put("/news/:id", editNews);
router.delete("/news/:id", deleteNews);

export default router;