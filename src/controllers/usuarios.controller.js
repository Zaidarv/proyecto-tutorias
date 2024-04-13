import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

export const getAllUsuarios = async (req, res) => {
  const result = await pool.query("SELECT * FROM public.usuarios limit 10");
  return res.json(result.rows);
};

export const getUsuario = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM public.usuarios WHERE rfc = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  return res.json(result.rows[0]);
};

export const createUsuario = async (req, res) => {
  const {
    rfc,
    clave_area,
    apellidos_usuario,
    nombre_usuario,
    status_usuario,
    id_rol,
  } = req.body;

  const result = await pool.query(
    "INSERT INTO public.usuarios (rfc, clave_area, apellidos_usuario, nombre_usuario, status_usuario, id_rol) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [rfc, clave_area, apellidos_usuario, nombre_usuario, status_usuario, id_rol]
  );

  const token = await createAccessToken({ rfc: result.rows[0].rfc });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });
  return res.json(result.rows[0]);
};
export const updateUsuario = async (req, res) => {
  const {
    clave_area,
    apellidos_usuario,
    nombre_usuario,
    status_usuario,
    id_rol,
  } = req.body;

  const result = await pool.query(
    "UPDATE public.usuarios SET clave_area = $1, apellidos_usuario = $2, nombre_usuario = $3, status_usuario = $4, id_rol = $5 RETURNING *",
    [clave_area, apellidos_usuario, nombre_usuario, status_usuario, id_rol]
  );
  return res.json({ message: "Usuario actualizado", usuario: result.rows[0] });
};

export const deleteUsuario = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "DELETE FROM public.usuarios WHERE rfc = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  return res.sendStatus(204);
};
