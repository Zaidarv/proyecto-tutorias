import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";

export const login = async (req, res) => {
  const { rfc, contrasena } = req.body;

  const result = await pool.query(
    "SELECT * FROM public.usuarios WHERE rfc = $1 AND contrasena = $2",
    [rfc, contrasena]
  );

  if (result.rowCount === 0) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }
  const token = await createAccessToken({ rfc: result.rows[0].rfc });

  res.cookie("token", token, {
    // httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });
  return res.json(result.rows[0]);
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM public.usuarios WHERE rfc = $1",
    [req.rfc.rfc]
  );
  return res.json(result.rows[0]);
};
