
CREATE DATABASE db_tutorias;

CREATE TABLE roles (  
  id_rol SERIAL PRIMARY KEY,  
  nombre_rol VARCHAR(30) NOT NULL,  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);  

INSERT INTO roles (nombre_rol) VALUES ('Coordinador Institucional'), ('Coordinador Académico'), ('Tutor');

CREATE TABLE usuarios (
  rfc VARCHAR(15) NOT NULL PRIMARY KEY,
  clave_area INT NOT NULL,
  apellidos_usuario VARCHAR(100) NOT NULL,
  nombre_usuario VARCHAR(100) NOT NULL,
  status_usuario SMALLINT NOT NULL,
  id_rol INT NULL,
  contrasena VARCHAR(4) NOT NULL DEFAULT '9999',
  FOREIGN KEY (id_rol) REFERENCES roles (id_rol),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE grupos (
  id_grupo SERIAL PRIMARY KEY,
  rfc VARCHAR(15) NOT NULL,
  nombre_grupo VARCHAR(10) NOT NULL,
  FOREIGN KEY (rfc) REFERENCES usuarios (rfc),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tutorados (
  no_de_control VARCHAR(11) PRIMARY KEY,
  carrera INT NOT NULL,
  semestre INT NOT NULL,
  apellido_paterno VARCHAR(50) NOT NULL,
  apellido_materno VARCHAR(50) NOT NULL,
  nombre_tutorado VARCHAR(100) NOT NULL,
  periodo_status INT NOT NULL,
  id_grupo INT NOT NULL,
  FOREIGN KEY (id_grupo) REFERENCES grupos (id_grupo),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE sesiones (
  id_sesion SERIAL PRIMARY KEY,
  id_grupo INT NOT NULL,
  actividad VARCHAR(100) NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  lugar VARCHAR(100) NOT NULL,
  observaciones TEXT,
  status_sesion SMALLINT NOT NULL,
  FOREIGN KEY (id_grupo) REFERENCES grupos (id_grupo),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE asistencias (
  id_asistencia SERIAL PRIMARY KEY,
  id_sesion INT NOT NULL,
  no_de_control VARCHAR(10) NOT NULL,
  asistencia BOOLEAN NOT NULL,
  FOREIGN KEY (id_sesion) REFERENCES sesiones (id_sesion),
  FOREIGN KEY (no_de_control) REFERENCES tutorados (no_de_control),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cuestionarios (
  id_cuestionario SERIAL PRIMARY KEY,
  nombre_cuestionario VARCHAR(100) NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE preguntas (
  id_pregunta SERIAL PRIMARY KEY,
  id_cuestionario INT NOT NULL,
  pregunta TEXT NOT NULL,
  tipo_pregunta VARCHAR(30) NULL,
  FOREIGN KEY (id_cuestionario) REFERENCES cuestionarios (id_cuestionario)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE respuestas (
  id_respuesta SERIAL PRIMARY KEY,
  id_pregunta INT NOT NULL,
  respuesta TEXT NOT NULL,
  FOREIGN KEY (id_pregunta) REFERENCES preguntas (id_pregunta),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cuestionarios_tutorados (
  id_cuestionario INT NOT NULL,
  no_de_control VARCHAR(11) NOT NULL,
  fecha_aplicacion DATE NOT NULL,
  FOREIGN KEY (id_cuestionario) REFERENCES cuestionarios (id_cuestionario),
  FOREIGN KEY (no_de_control) REFERENCES tutorados (no_de_control),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

