import Router from "express-promise-router";
import {
  getAllTutorados,
  getTutorado,
  createTutorado,
  updateTutorado,
  deleteTutorado,
} from "../controllers/tutorados.controller.js";

const router = Router();

router.get("/tutorados", getAllTutorados);
router.get("/tutorados/:id", getTutorado);
router.post("/tutorados", createTutorado);
router.put("/tutorados/:id", updateTutorado);
router.delete("/tutorados/:id", deleteTutorado);

export default router;
