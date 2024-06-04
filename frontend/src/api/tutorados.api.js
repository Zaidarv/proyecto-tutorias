import axios from "axios";

export const AddTutoradoGrupo = async (data) =>
  axios.post(`http://localhost:3000/api/grupos-tutorados/`, data);

export const createTutorado = async (data) =>
  axios.post("http://localhost:3000/api/tutorados", data);
