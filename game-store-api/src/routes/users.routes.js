import { Router } from "express";

import {
    createUser,
    loginUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} from "../services/user.services.js";

const router = Router();

router.post("/register", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/login", loginUser);

export default router;