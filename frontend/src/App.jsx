import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import { CarreraProvider } from "./context/CarreraContext";
import { GrupoProvider } from "./context/GrupoContext";
import { TutorProvider } from "./context/TutorContext";
import { TutoradoProvider } from "./context/TutoradoContext";
import { SesionProvider } from "./context/SesionContext";

import Navbar from "./components/navbar/Navbar";
import { Container } from "./components/ui";
import { ProtectedRoute } from "./components/ui/ProtectedRoute";

import InicioPage from "./pages/InicioPage";
import LoginPage from "./pages/LoginPage";
import UsuariosPage from "./pages/UsuariosPage";
import TutoradosPage from "./pages/TutoradosPage";
import GruposPage from "./pages/GruposPage";
import GrupoDetailsPage from "./pages/GrupoDetailsPage";
import GruposFormPage from "./pages/GruposFormPage";
import TutorSelectList from "./pages/TutorSelectList";
import TutoradoSelectList from "./pages/TutoradoSelectList";
import SesionesPage from "./pages/SesionesPage";
import SesionesFormPage from "./pages/SesionesFormPage";
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
            {/* Contexto de las carreras */}
            <Route
              element={
                <CarreraProvider>
                  <Outlet />
                </CarreraProvider>
              }
            >
              <Route
                path="/carreras"
                element={
                  <ProtectedRoute
                    isAllowed={isAuth}
                    allowedRoles={[1]}
                    redirectTo="/login"
                  >
                    <CoordInstitucionalPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/carreras/:id" element={<CarreraPage />} />
              <Route
                path="/carreras/:id/asignar-coordinador"
                element={<CoordInstitucionalFormPage />}
              />
              {/* Contexto de los grupos */}
              <Route
                element={
                  <GrupoProvider>
                    <Outlet />
                  </GrupoProvider>
                }
              >
                <Route
                  path="/grupos"
                  element={
                    <ProtectedRoute
                      isAllowed={isAuth}
                      allowedRoles={[2]}
                      redirectTo="/login"
                    >
                      <GruposPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/grupos/crear" element={<GruposFormPage />} />

                {/* Contexto de los tutores */}
                <Route
                  element={
                    <TutorProvider>
                      <Outlet />
                    </TutorProvider>
                  }
                >
                  <Route path="/grupos/:id" element={<GrupoDetailsPage />} />
                  <Route
                    path="/grupos/:id/asignar-tutor"
                    element={<TutorSelectList />}
                  />
                  {/* <Route path="/tutores" element={<TutoresPage />} /> */}
                </Route>
                <Route
                  element={
                    <TutoradoProvider>
                      <Outlet />
                    </TutoradoProvider>
                  }
                >
                  <Route
                    path="/grupos/:id/asignar-tutorados"
                    element={<TutoradoSelectList />}
                  />
                </Route>
              </Route>
            </Route>

            <Route path="/tutorados" element={<TutoradosPage />} />
            <Route
              element={
                <SesionProvider>
                  <Outlet />
                </SesionProvider>
              }
            >
              <Route
                path="/sesiones"
                element={
                  <ProtectedRoute
                    isAllowed={isAuth}
                    allowedRoles={[3]}
                    redirectTo="/login"
                  >
                    <SesionesPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/sesiones/crear" element={<SesionesFormPage />} />
            </Route>
            <Route path="/asistencias" element={<AsistenciasPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
