import Router from "express-promise-router";
import {
  getAllSesiones,
  getSesion,
  createSesion,
  updateSesion,
  deleteSesion,
} from "../controllers/sesiones.controller.js";

const router = Router();

router.get("/sesiones", getAllSesiones);
router.get("/sesiones/:id", getSesion);
router.post("/sesiones", createSesion);
router.put("/sesiones/:id", updateSesion);
router.delete("/sesiones/:id", deleteSesion);

export default router;
