import axios from "axios";

export const getAllTutores = async () =>
  axios.get("http://localhost:3000/api/tutores");

export const getTutor = async (id) =>
  axios.get(`http://localhost:4000/api/docentes/${id}`);  

export const updateTutor = async (id, data) =>
  axios.put(`http://localhost:3000/api/grupos/${id}`, data);

//USUARIOS
export const createUsuario = async (data) =>
  axios.post("http://localhost:3000/api/usuarios", data);
