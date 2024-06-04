import { createContext, useState, useContext } from "react";

import { getAllAlumnos, getAlumnosPorCarrera } from "../api/sii.api";
import { AddTutoradoGrupo, createTutorado } from "../api/tutorados.api";

const TutoradoContext = createContext();

export const useTutorados = () => {
  const context = useContext(TutoradoContext);
  if (!context) {
    throw new Error(
      "useTutorado debe estar dentro del proveedor TutoradoProvider"
    );
  }
  return context;
};

export const TutoradoProvider = ({ children }) => {
  const [alumnos, setAlumnos] = useState([]);
  const [tutorados, setTutorados] = useState([]);
  const [tutorado, setTutorado] = useState([]);
  const [errors, setErrors] = useState(null);

  //   const loadAlumnos = async () => {
  //     const res = await getAllAlumnos();
  //     setAlumnos(res.data);
  //   };

  const loadAlumnosPorCarrera = async (id) => {
    const res = await getAlumnosPorCarrera(id);
    setAlumnos(res.data);
  };

  const loadUpdateTutoradoGrupo = async (id, data) => {
    console.log("ID", id);
    console.log("DATA", data);
    const res = await AddTutoradoGrupo({
      id_grupo: id,
      no_de_control: data.no_de_control,
    });
    if (res.status === 200) {
      const resusuario = await createTutorado({
        no_de_control: data.no_de_control,
      });
    }
  };

  return (
    <TutoradoContext.Provider
      value={{
        alumnos,
        tutorados,
        tutorado,
        errors,
        setTutorado,
        // loadAlumnos,
        loadAlumnosPorCarrera,
        loadUpdateTutoradoGrupo,
      }}
    >
      {children}
    </TutoradoContext.Provider>
  );
};
