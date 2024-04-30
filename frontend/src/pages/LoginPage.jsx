import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Container } from "../components/ui";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, errors: loginErrors } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    const user = await login(data);
    if (user) {
      navigate("/");
    }
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {loginErrors && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {loginErrors[0]}</span>
          </div>
        )}
        <h3 className="text-2xl font-bold">Inicio de Sesión</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor="rfc">Usuario</Label>
          <Input placeholder="rfc" {...register("rfc", { required: true })} />
          {errors.rfc && (
            <span className="text-red-500">Este campo es requerido</span>
          )}

          <Label htmlFor="contrasena">Contraseña</Label>
          <Input
            type="password"
            placeholder="Contraseña"
            {...register("contrasena", { required: true })}
          />
          {errors.contrasena && (
            <span className="text-red-500">Este campo es requerido</span>
          )}
          <br />
          <Button>Iniciar Sesión</Button>
        </form>
      </Card>
    </Container>
  );
}

export default LoginPage;
