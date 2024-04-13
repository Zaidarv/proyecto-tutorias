import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

export const getAllTutorados = async (req, res) => {
  const result = await pool.query("SELECT * FROM public.tutorados");
  return res.json(result.rows);
};

export const getTutorado = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM public.tutorados WHERE no_de_control = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  return res.json(result.rows[0]);
};

export const createTutorado = async (req, res) => {
  const {
    no_de_control,
    carrera,
    semestre,
    apellido_paterno,
    apellido_materno,
    nombre_tutorado,
    periodo_status,
  } = req.body;

  const result = await pool.query(
    "INSERT INTO public.tutorados (no_de_control, carrera, semestre, apellido_paterno, apellido_materno, nombre_tutorado, periodo_status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [
      no_de_control,
      carrera,
      semestre,
      apellido_paterno,
      apellido_materno,
      nombre_tutorado,
      periodo_status,
    ]
  );

  const token = await createAccessToken({
    no_de_control: result.rows[0].no_de_control,
  });

  return res.json({
    token: token,
  });
};
export const updateTutorado = async (req, res) => {
  const {
    carrera,
    semestre,
    apellido_paterno,
    apellido_materno,
    nombre_tutorado,
    periodo_status,
  } = req.body;

  const result = await pool.query(
    "UPDATE public.tutorados SET carrera = $1, semestre = $2, apellido_paterno = $3, apellido_materno = $4, nombre_tutorado = $5, status_usuario = $6 RETURNING *",
    [
      carrera,
      semestre,
      apellido_paterno,
      apellido_materno,
      nombre_tutorado,
      periodo_status,
    ]
  );
  return res.json({ message: "Usuario actualizado", usuario: result.rows[0] });
};

export const deleteTutorado = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "DELETE FROM public.tutorados WHERE no_de_control = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  return res.sendStatus(204);
};
