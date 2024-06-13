import { createContext, useState, useContext } from "react";
import {
  getGrupoDeTutor,
  getSesionesPorGrupo,
  createSesion,
} from "../api/sesiones.api";

const SesionContext = createContext();

export const useSesiones = () => {
  const context = useContext(SesionContext);
  if (!context) {
    throw new Error(
      "useSesiones debe estar dentro del proveedor SesionProvider"
    );
  }
  return context;
};

export const SesionProvider = ({ children }) => {
  const [grupo, setGrupo] = useState([]);
  const [sesiones, setSesiones] = useState([]);
  const [sesion, setSesion] = useState([]);
  const [errors, setErrors] = useState(null);

  const loadGrupoDeTutor = async (id) => {
    try {
      // Obtén los datos del grupo del tutor
      const res = await getGrupoDeTutor(id);
    } catch (error) {
      setErrors(error);
    }
  };

  const loadSesionesPorGrupo = async (id) => {
    try {
      const grupo = await getGrupoDeTutor(id);
      setGrupo(grupo.data[0]);
      // Obtén los datos de las sesiones
      const res = await getSesionesPorGrupo(grupo.data[0].id_grupo);
      if (res.data[0] == undefined) {
        setSesiones([]);
      } else {
        setSesiones(res.data);
        console.log(res.data);
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const loadSesion = async (id) => {
    try {
      // Obtén los datos de la sesión
      const res = await getSesion(id);
      setSesion(res.data);
    } catch (error) {
      setErrors(error);
    }
  };

  const loadCreateSesion = async (data) => {
    try {
      // Crea la sesión
      const res = await createSesion({ ...data, id_grupo: grupo.id_grupo });
      setSesion(res.data.sesion);
      return res.data.sesion;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const updateSesion = async (id, data) => {
    try {
      // Actualiza la sesión
      const res = await updateSesion(id, data);
      setSesion(res.data);
    } catch (error) {
      setErrors(error);
    }
  };

  const deleteSesion = async (id) => {
    try {
      // Elimina la sesión
      const res = await deleteSesion(id);
      setSesion(res.data);
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <SesionContext.Provider
      value={{
        grupo,
        sesiones,
        sesion,
        errors,
        loadGrupoDeTutor,
        loadSesionesPorGrupo,
        loadSesion,
        loadCreateSesion,
        updateSesion,
        deleteSesion,
      }}
    >
      {children}
    </SesionContext.Provider>
  );
};
