import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Container } from "../components/ui";
import { useGrupos } from "../context/GrupoContext";

function GruposFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loadCreateGrupo, errors: gruposErrors } = useGrupos();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const grupo = await loadCreateGrupo(data);
    if (grupo) {
      navigate(`/grupos/${grupo.id_grupo}`);
    }
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {gruposErrors && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {loginErrors[0]}</span>
          </div>
        )}
        <h3 className="text-2xl font-bold">Nuevo Grupo</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor="nombre_grupo">Nombre de grupo</Label>
          <Input
            placeholder="Ej. ISC1"
            {...register("nombre_grupo", { required: true })}
          />
          {errors.nombre_grupo && (
            <span className="text-red-500">Este campo es requerido</span>
          )}

          <br />
          <Button>Crear grupo</Button>
        </form>
      </Card>
    </Container>
  );
}

export default GruposFormPage;
