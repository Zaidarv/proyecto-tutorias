import { createContext, useState, useContext } from "react";

import {
  //   getAllTutores,
  getTutor,
  //   createTutor,
  updateTutor,
  createUsuario,
} from "../api/tutores.api";

import { getAllPersonal } from "../api/sii.api";

const TutorContext = createContext();

export const useTutores = () => {
  const context = useContext(TutorContext);
  if (!context) {
    throw new Error("useTutor debe estar dentro del proveedor TutorProvider");
  }
  return context;
};

export const TutorProvider = ({ children }) => {
  const [docentes, setDocentes] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [tutor, setTutor] = useState([]);
  const [errors, setErrors] = useState(null);

  const loadDocentes = async () => {
    const res = await getAllPersonal();
    setDocentes(res.data);
  };

  const loadTutor = async (id) => {
    try {
      const res = await getTutor(id);
      setTutor(res.data);
      console.log("TUTOR", res.data);
    } catch (error) {
      setErrors(error);
    }
  };

  const loadUpdateTutorGrupo = async (id, data) => {
    const res = await updateTutor(id, data);
    if (res.status === 200) {
      const resusuario = await createUsuario({
        rfc: data.rfc,
        status_usuario: 1,
        id_rol: 3,
      });
    }
  };

  return (
    <TutorContext.Provider
      value={{
        docentes,
        tutores,
        tutor,
        errors,
        loadDocentes,
        loadTutor,
        loadUpdateTutorGrupo,
      }}
    >
      {children}
    </TutorContext.Provider>
  );
};
