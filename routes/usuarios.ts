import { Router } from "express";
import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
  updateUsuario,
  loginUsuario,
} from "../controllers/usuarios";
import {
  emailAndPasswordMiddleware,
  nameEmailAndPasswordMiddleware,
} from "../middlewares/validateEmailAndPassword";

const router = Router();

router.get("/", getUsuarios);

router.post("/", nameEmailAndPasswordMiddleware, createUsuario);

router.post("/login", emailAndPasswordMiddleware, loginUsuario);

router.get("/:id", getUsuario);

router.put("/:id", updateUsuario);

router.delete("/:id", deleteUsuario);

export default router;
