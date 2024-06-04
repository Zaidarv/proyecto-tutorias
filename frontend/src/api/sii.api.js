import axios from "axios";

export const getAllPersonal = async () =>
  axios.get("http://localhost:4000/api/docentes");

export const getAllAlumnos = async () =>
  axios.get("http://localhost:4000/api/alumnos");

export const getAlumnosPorCarrera = async (id) =>
  axios.get(`http://localhost:4000/api/alumnos/carrera/${id}`);

export const getAlumno = async (id) =>
  axios.get(`http://localhost:4000/api/alumnos/${id}`);
