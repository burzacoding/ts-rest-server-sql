import { Router } from "express";
import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
  updateUsuario,
  loginUsuario,
  userMiddlewareTest,
} from "../controllers/usuarios";
import { validateFields } from "../middlewares/testMiddleware";

const router = Router();

router.get("/", getUsuarios);

router.post(
  "/",
  validateFields(["password", "email", "nombre"]),
  createUsuario
);

router.post("/login", validateFields(["email", "password"]), loginUsuario);

router.get("/nameTest", validateFields(["nombre"]), userMiddlewareTest);

router.get("/emailTest", validateFields(["email"]), userMiddlewareTest);

router.get("/passwordTest", validateFields(["password"]), userMiddlewareTest);

router.get("/:id", getUsuario);

router.put("/:id", updateUsuario);

router.delete("/:id", deleteUsuario);

export default router;
