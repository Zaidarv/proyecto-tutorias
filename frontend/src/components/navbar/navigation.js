export const publicRoutes = [
  { name: "Inicio", href: "/", current: true },
  { name: "Login", href: "/login", current: false },
];

export const privateRoutes = [
  { name: "Usuarios", href: "/usuarios", current: false },
  { name: "Tutorados", href: "/tutorados", current: false },
  {
    name: "Coord. Institucional",
    href: "/carreras",
    current: false,
  },
  { name: "Informacion", href: "/informacion", current: false },
  { name: "Grupos", href: "/grupos", current: false },
  { name: "Sesiones", href: "/sesiones", current: false },
  { name: "Asistencias", href: "/asistencias", current: false },
];
