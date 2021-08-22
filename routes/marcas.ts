import { Router } from "express";
import { getMarca, getMarcas, postMarca } from "../controllers/marcas";

const router = Router()

router.get("/", getMarcas)

router.post('/', postMarca)

router.get("/:id", getMarca)


export default router