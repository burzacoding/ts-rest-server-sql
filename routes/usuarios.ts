import { Router } from "express";
import { createUsuario, deleteUsuario, getUsuario, getUsuarios, updateUsuario } from "../controllers/usuarios";

const router = Router();

router.get("/", getUsuarios);

router.post("/", createUsuario);

router.get("/:id", getUsuario)

router.put("/:id", updateUsuario)

router.delete("/:id", deleteUsuario)

export default router;
