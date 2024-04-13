import Router from "express-promise-router";
import {
  getAllGrupos,
  getGrupo,
  createGrupo,
  updateGrupo,
  deleteGrupo,
} from "../controllers/grupos.controller.js";

const router = Router();

router.get("/grupos", getAllGrupos);
router.get("/grupos/:id", getGrupo);
router.post("/grupos", createGrupo);
router.put("/grupos/:id", updateGrupo);
router.delete("/grupos/:id", deleteGrupo);

export default router;
