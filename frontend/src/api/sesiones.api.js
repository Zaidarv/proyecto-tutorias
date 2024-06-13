import axios from "axios";

export const getGrupoDeTutor = async (rfc) =>
  axios.get(`http://localhost:3000/api/grupos/tutor/${rfc}`);

export const getSesionesPorGrupo = async (id) =>
  axios.get(`http://localhost:3000/api/sesiones/grupo/${id}`);

export const createSesion = async (data) =>
  axios.post("http://localhost:3000/api/sesiones", data);
