import { Router } from "express";
import { getAuto, getAutos, postAuto } from "../controllers/autos";

const router = Router()

router.get("/", getAutos)

router.post('/', postAuto)

router.get("/:id", getAuto)


export default router