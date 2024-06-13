import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Container } from "../components/ui";
import { useSesiones } from "../context/SesionContext";

function SesionesFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loadCreateSesion, errors: sesionErrors } = useSesiones();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const sesion = await loadCreateSesion(data);
    console.log("SESION", sesion);
    if (sesion) {
      navigate(`/sesiones/`);
    }
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {sesionErrors && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {sesionErrors[0]}</span>
          </div>
        )}
        <h3 className="text-2xl font-bold">Agendar Sesión</h3>
        <br />
        <form onSubmit={onSubmit}>
          <Label htmlFor="actividad">Actividad</Label>
          <Input
            placeholder="Ej. Revisión de avances"
            {...register("actividad", { required: true })}
          />
          {errors.actividad && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <Label htmlFor="fecha">Fecha</Label>
          <Input type="date" {...register("fecha", { required: true })} />
          {errors.fecha && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <Label htmlFor="hora">Horario</Label>
          <Input type="time" {...register("hora", { required: true })} />
          {errors.hora && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <Label htmlFor="lugar">Lugar</Label>
          <Input
            placeholder="Ej. 704"
            {...register("lugar", { required: true })}
          />
          {errors.lugar && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <br />
          <Button>Agendar</Button>
        </form>
      </Card>
    </Container>
  );
}

export default SesionesFormPage;
