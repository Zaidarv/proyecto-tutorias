import express, { json } from "express";
import morgan from "morgan";
import usuarioRoutes from "./routes/usuarios.routes.js";
import tutoradoRoutes from "./routes/tutorados.routes.js";
import coordinadoresCarrerasRoutes from "./routes/coordinadores_carreras.routes.js";
import gruposRoutes from "./routes/grupos.routes.js";
import gruposTutoradosRoutes from "./routes/grupos_tutorados.routes.js";
import sesionesRoutes from "./routes/sesiones.routes.js";
import asistenciasRoutes from "./routes/asistencias.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cuestionariosRoutes from "./routes/cuestionarios.routes.js";
import preguntasRoutes from "./routes/preguntas.routes.js";
import respuestasRoutes from "./routes/respuestas.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", usuarioRoutes);
app.use("/api", tutoradoRoutes);
app.use("/api", coordinadoresCarrerasRoutes);
app.use("/api", gruposRoutes);
app.use("/api", gruposTutoradosRoutes);
app.use("/api", sesionesRoutes);
app.use("/api", asistenciasRoutes);
app.use("/api", authRoutes);
app.use("/api", cuestionariosRoutes);
app.use("/api", preguntasRoutes);
app.use("/api", respuestasRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World 2" });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
