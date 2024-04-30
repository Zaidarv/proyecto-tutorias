import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import { Container } from "./components/ui";

import InicioPage from "./pages/InicioPage";
import LoginPage from "./pages/LoginPage";
import UsuariosPage from "./pages/UsuariosPage";
import TutoradosPage from "./pages/TutoradosPage";
import InformacionPage from "./pages/InformacionPage";
import GruposPage from "./pages/GruposPage";
import SesionesPage from "./pages/SesionesPage";
import AsistenciasPage from "./pages/AsistenciasPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/tutorados" element={<TutoradosPage />} />
          <Route path="/informacion" element={<InformacionPage />} />
          <Route path="/grupos" element={<GruposPage />} />
          <Route path="/sesiones" element={<SesionesPage />} />
          <Route path="/asistencias" element={<AsistenciasPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
