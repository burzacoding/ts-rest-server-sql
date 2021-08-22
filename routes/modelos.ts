import { Router } from "express";
import { getModelo, getModelos, postModelo } from "../controllers/modelos";

const router = Router()

router.get("/", getModelos)

router.post('/', postModelo)

router.get("/:id", getModelo)


export default router