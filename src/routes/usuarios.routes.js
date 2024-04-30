import Router from "express-promise-router";
import {
  getAllUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarios.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/usuarios", isAuth, getAllUsuarios);
router.get("/usuarios/:id", isAuth, getUsuario);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:id", updateUsuario);
router.delete("/usuarios/:id", deleteUsuario);

export default router;
