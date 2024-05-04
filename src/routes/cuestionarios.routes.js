import Router from "express-promise-router";
import {
  getAllCuestionarios,
  getCuestionario,
  createCuestionario,
  updateCuestionario,
  deleteCuestionario,
} from "../controllers/cuestionarios.controller.js";

const router = Router();

router.get("/cuestionarios", getAllCuestionarios);
router.get("/cuestionarios/:id", getCuestionario);
router.post("/cuestionarios", createCuestionario);
router.put("/cuestionarios/:id", updateCuestionario);
router.delete("/cuestionarios/:id", deleteCuestionario);

export default router;
