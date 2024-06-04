import Router from "express-promise-router";
import {
  //   getAllGruposTutorados,
  getGrupoTutorados,
  createGrupoTutorado,
  //   updateGruposTutorados,
  // deleteCoordinadorCarrera,
} from "../controllers/grupos_tutorados.controller.js";

const router = Router();

// router.get("/coordinadores-carreras", getAllGruposTutorados);
router.get("/grupos-tutorados/:id", getGrupoTutorados);
router.post("/grupos-tutorados", createGrupoTutorado);
// router.put("/coordinadores-carreras/:id", updateGruposTutorados);
// router.delete("/coordinadores-carreras/:id", deleteCoordinadorCarrera);

export default router;
