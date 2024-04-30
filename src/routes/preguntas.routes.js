import Router from "express-promise-router";
import {
  getAllPreguntas,
  getPregunta,
  createPregunta,
  updatePregunta,
  deletePregunta,
} from "../controllers/preguntas.controller.js";

const router = Router();

router.get("/preguntas", getAllPreguntas);
router.get("/preguntas/:id", getPregunta);
router.post("/preguntas", createPregunta);
router.put("/preguntas/:id", updatePregunta);
router.delete("/preguntas/:id", deletePregunta);

export default router;
