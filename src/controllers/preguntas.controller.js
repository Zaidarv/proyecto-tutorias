import { pool } from "../db.js";

export const getAllPreguntas = async (req, res) => {
  const result = await pool.query("SELECT * FROM public.preguntas ");
  return res.json(result.rows);
};

export const getPregunta = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM public.preguntas WHERE id_pregunta = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Pregunta no encontrado" });
  }

  return res.json(result.rows[0]);
};

export const createPregunta = async (req, res) => {
  const { id_cuestionario, pregunta, tipo_pregunta } = req.body;

  const result = await pool.query(
    "INSERT INTO public.preguntas (id_cuestionario, pregunta, tipo_pregunta) VALUES ($1, $2, $3) RETURNING *",
    [id_cuestionario, pregunta, tipo_pregunta]
  );
  return res.json({
    message: "Pregunta creada",
    pregunta: result.rows[0],
  });
};
export const updatePregunta = async (req, res) => {
  const { id_cuestionario, pregunta, tipo_pregunta } = req.body;

  const result = await pool.query(
    "UPDATE public.preguntas SET id_cuestionario = $1, pregunta = $2, tipo_pregunta = $3  WHERE id_pregunta = $4 RETURNING *",
    [id_cuestionario, pregunta, tipo_pregunta, req.params.id]
  );
  return res.json({
    message: "Pregunta actualizada",
    pregunta: result.rows[0],
  });
};

export const deletePregunta = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "DELETE FROM public.preguntas WHERE id_pregunta = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Pregunta no encontrado" });
  }

  return res.sendStatus(204);
};
