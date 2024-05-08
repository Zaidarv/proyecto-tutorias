import { createContext, useState, useContext } from "react";
import {
  getAllCarreras,
  getCarrera,
  getAllCoordinadores,
  createCarrera,
  checkCoordinador,
  getCoordinador,
} from "../api/carreras.api";

const CarreraContext = createContext();

export const useCarreras = () => {
  const context = useContext(CarreraContext);
  if (!context) {
    throw new Error(
      "useCarrera debe estar dentro del proveedor CarreraProvider"
    );
  }
  return context;
};

export const CarreraProvider = ({ children }) => {
  const [carreras, setCarreras] = useState([]);
  const [carrera, setCarrera] = useState(null);
  const [coordinadores, setCoordinadores] = useState([]);
  const [coordinador, setCoordinador] = useState([]);

  const loadCarreras = async () => {
    const res = await getAllCarreras();
    setCarreras(res.data);
    // console.log(res.data);
  };

  const loadCarrera = async (id) => {
    const res = await getCarrera(id);
    setCarrera(res.data);
    // console.log(res.data);
  };

  const loadCoordinadores = async (id) => {
    const res = await getAllCoordinadores();
    setCoordinadores(res.data);
    // console.log(res.data);
  };

  const loadCoordinador = async (id) => {
    try {
      const res = await checkCoordinador(id);
      console.log(res.data);

      if (res.data.rfc != null) {
        const rescoord = await getCoordinador(res.data.rfc);
        setCoordinador(rescoord.data);
        console.log(rescoord.data);
      } else {
        setCoordinador([]);
      }
    } catch (error) {
      if (error.response.status === 404) {
        // console.log("entra al 404");
        await createCarrera({ id_carrera: id });
        setCoordinador([]);
      }
    }
  };

  return (
    <CarreraContext.Provider
      value={{
        carreras,
        carrera,
        coordinador,
        coordinadores,
        loadCarreras,
        loadCarrera,
        loadCoordinadores,
        loadCoordinador,
      }}
    >
      {children}
    </CarreraContext.Provider>
  );
};
