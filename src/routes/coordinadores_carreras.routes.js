import Router from "express-promise-router";
import {
  getAllCoordinadoresCarreras,
  getCoordinadorCarrera,
  getCarreraCoordinador,
  createCoordinadorCarrera,
  updateCoordinadorCarrera,
  // deleteCoordinadorCarrera,
} from "../controllers/coordinadores_carreras.controller.js";

const router = Router();

router.get("/coordinadores-carreras", getAllCoordinadoresCarreras);
router.get("/coordinadores-carreras/:id", getCoordinadorCarrera);
router.get("/coordinadores-carreras/carrera/:id", getCarreraCoordinador);
router.post("/coordinadores-carreras", createCoordinadorCarrera);
router.put("/coordinadores-carreras/:id", updateCoordinadorCarrera);
// router.delete("/coordinadores-carreras/:id", deleteCoordinadorCarrera);

export default router;
