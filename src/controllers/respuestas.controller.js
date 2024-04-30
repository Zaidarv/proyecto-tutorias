import { pool } from "../db.js";

export const getAllRespuestas = async (req, res) => {
  const result = await pool.query("SELECT * FROM public.respuestas ");
  return res.json(result.rows);
};

export const getRespuesta = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM public.respuestas WHERE id_respuesta = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Respuesta no encontrado" });
  }

  return res.json(result.rows[0]);
};

export const createRespuesta = async (req, res) => {
  const { id_pregunta, respuesta } = req.body;

  const result = await pool.query(
    "INSERT INTO public.respuestas (id_pregunta, respuesta) VALUES ($1, $2) RETURNING *",
    [id_pregunta, respuesta]
  );
  return res.json({
    message: "Respuesta creada",
    respuesta: result.rows[0],
  });
};
export const updateRespuesta = async (req, res) => {
  const { id_pregunta, respuesta } = req.body;

  const result = await pool.query(
    "UPDATE public.respuestas SET id_pregunta = $1, respuesta = $2 WHERE id_respuesta = $3 RETURNING *",
    [id_pregunta, respuesta, req.params.id]
  );
  return res.json({
    message: "Respuesta actualizada",
    respuesta: result.rows[0],
  });
};

export const deleteRespuesta = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "DELETE FROM public.Respuestas WHERE id_respuesta = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Respuesta no encontrado" });
  }

  return res.sendStatus(204);
};
