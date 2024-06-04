import axios from "axios";

export const getAllGrupos = async () =>
  axios.get("http://localhost:3000/api/grupos");

export const getGruposPorCarrera = async (id) =>
  axios.get(`http://localhost:3000/api/grupos/carrera/${id}`);

export const getGrupo = async (id) =>
  axios.get(`http://localhost:3000/api/grupos/${id}`);

export const getCarreraGrupos = async (id) =>
  axios.get(`http://localhost:3000/api/coordinadores-carreras/carrera/${id}`);

export const getPeriodosEscolares = async () =>
  axios.get("http://localhost:4000/api/periodos/");

export const createGrupo = async (data) =>
  axios.post("http://localhost:3000/api/grupos", data);

export const getTutor = async (id) =>
  axios.get(`http://localhost:4000/api/docentes/${id}`);

export const getTutorados = async (id) =>
  axios.get(`http://localhost:3000/api/grupos-tutorados/${id}`);
