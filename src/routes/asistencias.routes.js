import Router from "express-promise-router";
import {
  getAllAsistencias,
  getAsistencia,
  createAsistencia,
  updateAsistencia,
  deleteAsistencia,
} from "../controllers/asistencias.controller.js";

const router = Router();

router.get("/asistencias", getAllAsistencias);
router.get("/asistencias/:id", getAsistencia);
router.post("/asistencias", createAsistencia);
router.put("/asistencias/:id", updateAsistencia);
router.delete("/asistencias/:id", deleteAsistencia);

export default router;
