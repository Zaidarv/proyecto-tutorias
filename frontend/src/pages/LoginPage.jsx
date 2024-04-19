import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    await login(data);
    navigate("/");
  });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold">Inicio de Sesión</h3>

        <form onSubmit={onSubmit}>
          <Label htmlFor="usuario">Usuario</Label>
          <Input
            placeholder="Usuario"
            {...register("usuario", { required: true })}
          />
          {errors.usuario && (
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
    </div>
  );
}

export default LoginPage;
