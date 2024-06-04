import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

export const getAllGrupos = async (req, res) => {
  const result = await pool.query("SELECT * FROM public.grupos  ");
  return res.json(result.rows);
};

export const getGruposPorCarrera = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM public.grupos where id_carrera = $1",
    [req.params.id]
  );
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
  const { nombre_grupo, id_carrera, id_periodo } = req.body;

  const result = await pool.query(
    "INSERT INTO public.grupos (nombre_grupo, id_carrera, id_periodo) VALUES ($1, $2, $3) RETURNING *",
    [nombre_grupo, id_carrera, id_periodo]
  );
  return res.json({
    message: "Grupo creado",
    grupo: result.rows[0],
  });
};
export const updateGrupo = async (req, res) => {
  const { rfc, nombre_grupo, id_carrera, id_periodo } = req.body;

  const result = await pool.query(
    "UPDATE public.grupos SET  rfc = COALESCE($1, rfc), nombre_grupo = COALESCE($2, nombre_grupo),id_carrera = COALESCE($3, id_carrera), id_periodo = COALESCE($4, id_periodo) WHERE id_grupo = $5 RETURNING *",
    [
      rfc || null,
      nombre_grupo || null,
      id_carrera || null,
      id_periodo || null,
      req.params.id,
    ]
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
