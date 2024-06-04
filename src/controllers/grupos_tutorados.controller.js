import { pool } from "../db.js";

export const getGrupoTutorados = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM public.grupos_tutorados where id_grupo = $1 ",
    [req.params.id]
  );
  return res.json(result.rows);
};
export const createGrupoTutorado = async (req, res) => {
  const { id_grupo, no_de_control } = req.body;

  const result = await pool.query(
    "INSERT INTO public.grupos_tutorados (id_grupo, no_de_control) VALUES ($1, $2) RETURNING *",
    [id_grupo, no_de_control]
  );
  return res.json({
    message: "Tutorado asignado a grupo",
    tutorado: result.rows[0],
  });
};
