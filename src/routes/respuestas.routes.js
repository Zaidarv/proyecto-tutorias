import Router from "express-promise-router";
import {
  getAllRespuestas,
  getRespuesta,
  createRespuesta,
  updateRespuesta,
  deleteRespuesta,
} from "../controllers/respuestas.controller.js";

const router = Router();

router.get("/respuestas", getAllRespuestas);
router.get("/respuestas/:id", getRespuesta);
router.post("/respuestas", createRespuesta);
router.put("/respuestas/:id", updateRespuesta);
router.delete("/respuestas/:id", deleteRespuesta);

export default router;
