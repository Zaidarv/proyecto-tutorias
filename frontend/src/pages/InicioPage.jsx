import React from "react";
import { useAuth } from "../context/AuthContext";

function InicioPage() {
  const data = useAuth();
  console.log(data);

  return (
    <div>
      <h3 className="text-2xl font-bold">Pagina de Inicio</h3>
    </div>
  );
}

export default InicioPage;
