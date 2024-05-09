import axios from "axios";

export const getAllCarreras = async () =>
  axios.get("http://localhost:4000/api/carreras");

export const getCarrera = async (id) =>
  axios.get(`http://localhost:4000/api/carreras/${id}`);

export const getAllCoordinadores = async () =>
  axios.get("http://localhost:4000/api/docentes");

export const checkCoordinador = async (id) =>
  axios.get(`http://localhost:3000/api/coordinadores-carreras/${id}`);

export const getCoordinador = async (id) =>
  axios.get(`http://localhost:4000/api/docentes/${id}`);

export const createCarrera = async (data) =>
  axios.post("http://localhost:3000/api/coordinadores-carreras", data);

export const updateCoordinador = async (id, data) =>
  axios.put(`http://localhost:3000/api/coordinadores-carreras/${id}`, data);
