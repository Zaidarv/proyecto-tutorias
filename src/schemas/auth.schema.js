import { z } from "zod";

export const loginSchema = z.object({
  rfc: z
    .string({
      required_error: "El RFC es requerido",
      invalid_type_error: "El RFC debe ser un texto",
    })
    .min(13, "El RFC debe tener 13 caracteres"),
  contrasena: z
    .string({
      required_error: "La Contraseña es requerida",
      invalid_type_error: "La Contraseña debe ser un texto",
    })
    .min(4, "La contraseña debe tener al menos 4 caracteres"),
});
