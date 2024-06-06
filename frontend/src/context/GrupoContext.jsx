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

import { getAlumno, getCarrera, getPeriodo } from "../api/sii.api";
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
  const [carreraInfo, setCarreraInfo] = useState([]); // [id_carrera, carrera
  const [grupo, setGrupo] = useState(null);
  const [tutorados, setTutorados] = useState([]); // [id_tutorado, tutorado
  const [tutor, setTutor] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [periodo, setPeriodo] = useState([]); // [id_periodo, periodo
  const [errors, setErrors] = useState(null);

  const loadGrupos = async () => {
    const res = await getAllGrupos();
    setGrupos(res.data);

    // console.log(res.data);
  };

  // const loadGruposPorCarrera = async (id) => {
  //   const res1 = await getCarreraGrupos(id);
  //   const res = await getGruposPorCarrera(res1.data.id_carrera);
  //   const rescarrera = await getCarrera(res1.data.id_carrera);

  //   setCarreraGrupos(res1.data);
  //   setGrupos(res.data);
  //   setCarreraInfo(rescarrera.data);
  // };

  const loadGruposPorCarrera = async (id) => {
    try {
      // Obtén los datos de los grupos y la carrera
      const res1 = await getCarreraGrupos(id);
      const res = await getGruposPorCarrera(res1.data.id_carrera);
      const rescarrera = await getCarrera(res1.data.id_carrera);

      // Inicializa un array para almacenar los grupos con datos del tutor
      const gruposConTutor = await Promise.all(
        res.data.map(async (grupo) => {
          if (grupo.rfc) {
            // Si el grupo tiene un RFC, obtén los datos del tutor
            const resTutor = await getTutor(grupo.rfc);
            console.log({ ...grupo, tutor: resTutor.data });
            return { ...grupo, tutor: resTutor.data };
          } else {
            // Si no tiene RFC, devuelve el grupo tal cual
            return { ...grupo, tutor: null };
          }
        })
      );

      // Actualiza los estados
      setCarreraGrupos(res1.data);
      setGrupos(gruposConTutor); // Aquí actualizas el estado con los datos del tutor
      setCarreraInfo(rescarrera.data);
    } catch (error) {
      console.error("Error al cargar los datos de los grupos:", error);
    }
  };

  const loadGrupo = async (id) => {
    const res = await getGrupo(id);
    const restutorados = await getTutorados(id);
    const restutor = await getTutor(res.data.rfc);
    const resperiodo = await getPeriodo(res.data.id_periodo);

    const tutoradosDetallesPromises = restutorados.data.map((tutorado) =>
      getAlumno(tutorado.no_de_control)
    );
    const tutoradosDetallesResponses = await Promise.all(
      tutoradosDetallesPromises
    );

    const tutoradosDetalles = tutoradosDetallesResponses.flatMap(
      (response) => response.data
    );

    setGrupo(res.data);
    setTutor(restutor.data);
    setTutorados(tutoradosDetalles);
    setPeriodo(resperiodo.data);

    console.log(res.data);
  };

  const loadCreateGrupo = async (data) => {
    console.log("Data", data);
    try {
      const periodos = await getPeriodosEscolares();
      const periodoActual = periodos.data[0].periodo;
      console.log("Periodo actual", periodoActual);
      console.log("Data", data);
      console.log("Carrera", carreraGrupos.id_carrera);
      const res = await createGrupo({
        nombre_grupo: data.nombre_grupo,
        id_carrera: carreraGrupos.id_carrera,
        id_periodo: periodoActual,
      });
      console.log("Grupo creado", res.data);
      setGrupo(res.data.grupo);
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
        carreraInfo,
        tutorados,
        tutor,
        periodo,
        tutores,
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
