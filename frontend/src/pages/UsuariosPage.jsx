import React from "react";
import { useAuth } from "../context/AuthContext";

function UsuariosPage() {
  const data = useAuth();
  console.log(data);
  return <div>Pagina Principal</div>;
}

export default UsuariosPage;
