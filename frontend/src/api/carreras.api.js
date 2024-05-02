import axios from "axios";

export const getAllCarreras = async () =>
  axios.get("http://localhost:4000/api/carreras");
