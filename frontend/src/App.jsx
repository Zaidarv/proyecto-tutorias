import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import { CarreraProvider } from "./context/CarreraContext";

import Navbar from "./components/navbar/Navbar";
import { Container } from "./components/ui";
import { ProtectedRoute } from "./components/ui/ProtectedRoute";

import InicioPage from "./pages/InicioPage";
import LoginPage from "./pages/LoginPage";
import UsuariosPage from "./pages/UsuariosPage";
import TutoradosPage from "./pages/TutoradosPage";
import GruposPage from "./pages/GruposPage";
import SesionesPage from "./pages/SesionesPage";
import AsistenciasPage from "./pages/AsistenciasPage";
import NotFound from "./pages/NotFound";
import CoordInstitucionalPage from "./pages/CoordInstitucionalPage";
import CoordInstitucionalFormPage from "./pages/CoordInstitucionalFormPage";
import CarreraPage from "./pages/CarreraPage";

function App() {
  const { isAuth } = useAuth();
  console.log(isAuth);

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Routes>
          <Route
            element={
              <ProtectedRoute isAllowed={!isAuth} redirectTo="/usuarios" />
            }
          >
            <Route path="/" element={<InicioPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/informacion" element={<InformacionPage />} /> */}
          </Route>

          <Route
            element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}
          >
            <Route path="/usuarios" element={<UsuariosPage />} />

            <Route
              element={
                <CarreraProvider>
                  <Outlet />
                </CarreraProvider>
              }
            >
              <Route path="/carreras" element={<CoordInstitucionalPage />} />
              <Route path="/carreras/:id" element={<CarreraPage />} />
              <Route
                path="/carreras/:id/asignar-coordinador"
                element={<CoordInstitucionalFormPage />}
              />
            </Route>

            <Route path="/tutorados" element={<TutoradosPage />} />
            <Route path="/grupos" element={<GruposPage />} />
            <Route path="/sesiones" element={<SesionesPage />} />
            <Route path="/asistencias" element={<AsistenciasPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
