import { pool } from "../db.js";

export const getAllCoordinadoresCarreras = async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM public.coordinadores_carreras "
  );
  return res.json(result.rows);
};

export const getCoordinadorCarrera = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM public.coordinadores_carreras WHERE id_carrera = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Sin coordinador asignado" });
  }

  return res.json(result.rows[0]);
};

export const createCoordinadorCarrera = async (req, res) => {
  const { id_carrera, rfc } = req.body;

  const result = await pool.query(
    "INSERT INTO public.coordinadores_carreras (id_carrera, rfc) VALUES ($1, $2) RETURNING *",
    [id_carrera, rfc]
  );
  return res.json({
    message: "Coordinador asignado",
    coordinador: result.rows[0],
  });
};
export const updateCoordinadorCarrera = async (req, res) => {
  const { rfc } = req.body;

  const result = await pool.query(
    "UPDATE public.coordinadores_carreras SET rfc = $1 WHERE id_carrera = $2 RETURNING *",
    [rfc, req.params.id]
  );
  return res.json({
    message: "Coordinador actualizado",
    coordinador: result.rows[0],
  });
};

// export const deleteCoordinadorCarrera = async (req, res) => {
//   const id = req.params.id;
//   const result = await pool.query(
//     "DELETE FROM public.coordinadores_carreras WHERE id_carrera = $1",
//     [id]
//   );

//   if (result.rowCount === 0) {
//     return res.status(404).json({ message: "Coordinador no encontrado" });
//   }

//   return res.sendStatus(204);
// };
