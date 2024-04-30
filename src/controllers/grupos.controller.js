import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

export const getAllGrupos = async (req, res) => {
  const result = await pool.query("SELECT * FROM public.grupos  ");
  return res.json(result.rows);
};

export const getGrupo = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM public.grupos WHERE id_grupo = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Grupo no encontrado" });
  }

  return res.json(result.rows[0]);
};

export const createGrupo = async (req, res) => {
  const { rfc, nombre_grupo } = req.body;

  const result = await pool.query(
    "INSERT INTO public.grupos (rfc, nombre_grupo) VALUES ($1, $2) RETURNING *",
    [rfc, nombre_grupo]
  );
  return res.json({
    message: "Grupo creado",
    grupo: result.rows[0],
  });
};
export const updateGrupo = async (req, res) => {
  const { rfc, nombre_grupo } = req.body;

  const result = await pool.query(
    "UPDATE public.grupos SET rfc = $1, nombre_grupo = $2 WHERE id_grupo = $3 RETURNING *",
    [rfc, nombre_grupo, req.params.id]
  );
  return res.json({ message: "Grupo actualizado", grupo: result.rows[0] });
};

export const deleteGrupo = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "DELETE FROM public.grupos WHERE id_grupo = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Grupo no encontrado" });
  }

  return res.sendStatus(204);
};
