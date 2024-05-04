import { createContext, useState, useContext } from "react";
import { getAllCarreras, getCarrera } from "../api/carreras.api";

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

  const loadCarreras = async () => {
    const res = await getAllCarreras();
    setCarreras(res.data);
    console.log(res.data);
  };

  const loadCarrera = async (id) => {
    const res = await getCarrera(id);
    setCarrera(res.data);
    console.log(res.data);
  };

  return (
    <CarreraContext.Provider
      value={{
        carreras,
        loadCarreras,
        loadCarrera,
      }}
    >
      {children}
    </CarreraContext.Provider>
  );
};
