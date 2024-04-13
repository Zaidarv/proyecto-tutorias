import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

export const getAllAsistencias = async (req, res) => {
  const result = await pool.query("SELECT * FROM public.asistencias ");
  return res.json(result.rows);
};

export const getAsistencia = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM public.asistencias WHERE id_asistencia = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Asistencia no encontrado" });
  }

  return res.json(result.rows[0]);
};

export const createAsistencia = async (req, res) => {
  const { id_sesion, no_de_control, asistencia } = req.body;

  const result = await pool.query(
    "INSERT INTO public.asistencias (id_sesion, no_de_control, asistencia) VALUES ($1, $2, $3) RETURNING *",
    [id_sesion, no_de_control, asistencia]
  );
  return res.json({
    message: "Asistencia creada",
    sesion: result.rows[0],
  });
};
export const updateAsistencia = async (req, res) => {
  const { id_sesion, no_de_control, asistencia } = req.body;

  const result = await pool.query(
    "UPDATE public.asistencias SET id_sesion = $1, no_de_control = $2, asistencia = $3 RETURNING *",
    [id_sesion, no_de_control, asistencia]
  );
  return res.json({
    message: "Asistencia actualizada",
    sesion: result.rows[0],
  });
};

export const deleteAsistencia = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "DELETE FROM public.asistencias WHERE id_asistencia = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Asistencia no encontrado" });
  }

  return res.sendStatus(204);
};
