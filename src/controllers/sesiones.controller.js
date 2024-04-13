import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

export const getAllSesiones = async (req, res) => {
  const result = await pool.query("SELECT * FROM public.sesiones  ");
  return res.json(result.rows);
};

export const getSesion = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM public.sesiones WHERE id_sesion = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Sesion no encontrado" });
  }

  return res.json(result.rows[0]);
};

export const createSesion = async (req, res) => {
  const { id_grupo, actividad, fecha, hora, lugar, observaciones } = req.body;

  const result = await pool.query(
    "INSERT INTO public.sesiones (id_grupo, actividad, fecha, hora, lugar, observaciones) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [id_grupo, actividad, fecha, hora, lugar, observaciones]
  );
  return res.json({
    message: "sesion creada",
    sesion: result.rows[0],
  });
};
export const updateSesion = async (req, res) => {
  const { id_grupo, actividad, fecha, hora, lugar, observaciones } = req.body;

  const result = await pool.query(
    "UPDATE public.sesiones SET id_grupo = $1, actividad = $2, fecha = $3, hora = $4, lugar = $5, observaciones = $6 RETURNING *",
    [id_grupo, actividad, fecha, hora, lugar, observaciones]
  );
  return res.json({ message: "sesion actualizada", sesion: result.rows[0] });
};

export const deleteSesion = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "DELETE FROM public.sesiones WHERE id_sesion = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Sesion no encontrado" });
  }

  return res.sendStatus(204);
};
