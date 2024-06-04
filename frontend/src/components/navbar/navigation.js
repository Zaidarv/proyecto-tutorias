export const publicRoutes = [
  { name: "Inicio", href: "/", current: true },
  { name: "Login", href: "/login", current: false },
];

export const privateRoutes = [
  { name: "Usuarios", href: "/usuarios", current: false },
  {
    name: "Carreras",
    href: "/carreras",
    current: false,
  },
  { name: "Grupos", href: "/grupos", current: false },
  { name: "Tutorados", href: "/tutorados", current: false },
  { name: "Sesiones", href: "/sesiones", current: false },
  { name: "Asistencias", href: "/asistencias", current: false },
  { name: "Informacion", href: "/informacion", current: false },
];
