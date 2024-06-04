import { createContext, useState, useContext } from "react";
import {
  getAllGrupos,
  getCarreraGrupos,
  getGruposPorCarrera,
  getGrupo,
  createGrupo,
  getPeriodosEscolares,
  getTutor,
  getTutorados,
  //   updateGrupo,
  //   deleteGrupo,
} from "../api/grupos.api";

import { getAlumno } from "../api/sii.api";
import { set } from "react-hook-form";

const GrupoContext = createContext();

export const useGrupos = () => {
  const context = useContext(GrupoContext);
  if (!context) {
    throw new Error("useGrupo debe estar dentro del proveedor GrupoProvider");
  }
  return context;
};

export const GrupoProvider = ({ children }) => {
  const [grupos, setGrupos] = useState([]);
  const [carreraGrupos, setCarreraGrupos] = useState([]); // [id_carrera, grupos
  const [grupo, setGrupo] = useState(null);
  const [tutorados, setTutorados] = useState([]); // [id_tutorado, tutorado
  const [tutor, setTutor] = useState([]);
  const [errors, setErrors] = useState(null);

  const loadGrupos = async () => {
    const res = await getAllGrupos();
    setGrupos(res.data);

    // console.log(res.data);
  };

  const loadGruposPorCarrera = async (id) => {
    const res1 = await getCarreraGrupos(id);
    setCarreraGrupos(res1.data);
    const res = await getGruposPorCarrera(res1.data.id_carrera);
    setGrupos(res.data);
  };

  const loadGrupo = async (id) => {
    const res = await getGrupo(id);
    const restutorados = await getTutorados(id);
    const restutor = await getTutor(res.data.rfc);

    const tutoradosDetallesPromises = restutorados.data.map((tutorado) =>
      getAlumno(tutorado.no_de_control)
    );
    const tutoradosDetallesResponses = await Promise.all(
      tutoradosDetallesPromises
    );

    const tutoradosDetalles = tutoradosDetallesResponses.flatMap(
      (response) => response.data
    );
    console.log(tutoradosDetalles);

    setGrupo(res.data);
    setTutor(restutor.data);
    setTutorados(tutoradosDetalles);

    console.log(res.data);
  };

  const loadCreateGrupo = async (data) => {
    try {
      const periodos = await getPeriodosEscolares();
      const periodoActual = periodos.data[0].periodo;
      const res = await createGrupo({
        nombre_grupo: data.nombre_grupo,
        id_carrera: carreraGrupos.id_carrera,
        id_periodo: periodoActual,
      });
      setGrupo(res.data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const loadTutorados = async (id) => {
    const res = await getTutorados(id);
    setTutorados(res.data);
    console.log(res.data);
  };

  return (
    <GrupoContext.Provider
      value={{
        grupos,
        grupo,
        carreraGrupos,
        tutorados,
        tutor,
        loadGrupos,
        loadGruposPorCarrera,
        loadGrupo,
        loadCreateGrupo,
      }}
    >
      {children}
    </GrupoContext.Provider>
  );
};