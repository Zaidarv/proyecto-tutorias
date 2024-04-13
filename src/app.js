import express, { json } from "express";
import morgan from "morgan";
import usuarioRoutes from "./routes/usuarios.routes.js";
import tutoradoRoutes from "./routes/tutorados.routes.js";
import gruposRoutes from "./routes/grupos.routes.js";
import sesionesRoutes from "./routes/sesiones.routes.js";
import asistenciasRoutes from "./routes/asistencias.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", usuarioRoutes);
app.use("/api", tutoradoRoutes);
app.use("/api", gruposRoutes);
app.use("/api", sesionesRoutes);
app.use("/api", asistenciasRoutes);

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
