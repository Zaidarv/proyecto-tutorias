import { pool } from "../db.js";

export const getAllCuestionarios = async (req, res) => {
  const result = await pool.query("SELECT * FROM public.cuestionarios ");
  return res.json(result.rows);
};

export const getCuestionario = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM public.cuestionarios WHERE id_cuestionario = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Cuestionario no encontrado" });
  }

  return res.json(result.rows[0]);
};

export const createCuestionario = async (req, res) => {
  const { nombre_cuestionario, descripcion } = req.body;

  const result = await pool.query(
    "INSERT INTO public.cuestionarios (nombre_cuestionario, descripcion) VALUES ($1, $2) RETURNING *",
    [nombre_cuestionario, descripcion]
  );
  return res.json({
    message: "Cuestionario creado",
    cuestionario: result.rows[0],
  });
};
export const updateCuestionario = async (req, res) => {
  const { nombre_cuestionario, descripcion } = req.body;

  const result = await pool.query(
    "UPDATE public.cuestionarios SET nombre_cuestionario = $1, descripcion = $2 WHERE id_cuestionario = $3 RETURNING *",
    [nombre_cuestionario, descripcion, req.params.id]
  );
  return res.json({
    message: "Cuestionario actualizado",
    cuestionario: result.rows[0],
  });
};

export const deleteCuestionario = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "DELETE FROM public.cuestionarios WHERE id_cuestionario = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Cuestionario no encontrado" });
  }

  return res.sendStatus(204);
};
