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

export const getCarreraCoordinador = async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(
    "SELECT * FROM public.coordinadores_carreras WHERE rfc = $1",
    [id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Coordinador no encontrado" });
  }

  return res.json(result.rows[0]);
};

export const createCoordinadorCarrera = async (req, res) => {
  const { id_carrera } = req.body;

  const result = await pool.query(
    "INSERT INTO public.coordinadores_carreras (id_carrera) SELECT CAST($1 AS VARCHAR) WHERE NOT EXISTS (SELECT * FROM public.coordinadores_carreras WHERE id_carrera = $1)  RETURNING *",
    [id_carrera]
  );
  return res.json({
    message: "Carrera registrada",
    coordinador: result.rows[0],
  });
};
export const updateCoordinadorCarrera = async (req, res) => {
  const { rfc } = req.body;

  const result = await pool.query(
    // "UPDATE public.coordinadores_carreras SET rfc = $1 WHERE id_carrera = $2 RETURNING *",
    "UPDATE public.coordinadores_carreras SET rfc = $1 WHERE id_carrera = $2 AND NOT EXISTS (SELECT $1 FROM public.coordinadores_carreras WHERE rfc = $1 AND id_carrera != $2) RETURNING *",

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
