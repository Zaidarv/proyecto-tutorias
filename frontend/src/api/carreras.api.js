import axios from "axios";

export const getAllCarreras = async () =>
  axios.get("http://localhost:4000/api/carreras");

export const getCarrera = async (id) =>
  axios.get(`http://localhost:4000/api/carreras/${id}`);

//! Get carrera, now is undifined
