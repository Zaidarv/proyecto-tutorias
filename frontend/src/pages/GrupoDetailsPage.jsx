import React from "react";
import { Card, Input, Button, Label, Container } from "../components/ui";
import { useGrupos } from "../context/GrupoContext";
import { useTutores } from "../context/TutorContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BasicDatatable } from "../components/tables";

function GrupoDetailsPage() {
  const { grupo, loadGrupo, tutorados, tutor } = useGrupos();
  // const { tutor, loadTutor } = useTutores();

  const { id } = useParams();

  useEffect(() => {
    loadGrupo(id);
  }, []);

  const titleTutor = "TUTOR DEL GRUPO";
  const columnsTutor = [
    {
      name: "rfc",
      label: "RFC",
    },
    {
      name: "apellidos_empleado",
      label: "APELLIDOS",
    },
    {
      name: "nombre_empleado",
      label: "NOMBRE",
    },
  ];
  const optionsTutor = {
    selectableRows: "none",
    toolbar: false,
    pagination: false,
    search: false,
    download: false,
    print: false,
    filter: false,
    textLabels: {
      body: {
        noMatch: "Sin tutor asignado",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
    },
  };

  // TUTORADOS DATATABLE
  const titleTutorado = "TUTORADOS INSCRITOS";
  const columnsTutorado = [
    {
      name: "no_de_control",
      label: "NO. DE CONTROL",
    },
    {
      name: "apellido_paterno",
      label: "APELLIDO PATERNO",
    },
    {
      name: "apellido_materno",
      label: "APELLIDO MATERNO",
    },
    {
      name: "nombre_alumno",
      label: "NOMBRE",
    },
    {
      name: "semestre",
      label: "SEMESTRE",
    },
  ];
  const optionsTutorado = {
    selectableRows: "none",
    toolbar: false,
    pagination: false,
    search: false,
    download: false,
    print: false,
    filter: false,
    textLabels: {
      body: {
        noMatch: "Sin tutorados inscritos",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
    },
  };

  return (
    <Container className="h-[calc(100vh-10rem)] items-center justify-center">
      <Card className="p-14">
        <div className="flex items-center">
          <h2 className="text-2xl flex-grow">
            Detalles del grupo{" "}
            <span className=" font-bold">{grupo?.nombre_grupo}</span>
          </h2>
          <Link to={`/grupos/${id}/asignar-tutor`}>
            <Button>Seleccionar tutor</Button>
          </Link>
        </div>
      </Card>

      <BasicDatatable
        title={titleTutor}
        columns={columnsTutor}
        data={tutor}
        options={optionsTutor}
      ></BasicDatatable>

      <Card className="">
        <div className="flex items-center">
          {/* <h2 className="text-2xl flex-grow">Tutorados Inscritos </h2> */}
          <Link to={`/grupos/${id}/asignar-tutorados`}>
            <Button>Asignar tutorados</Button>
          </Link>
        </div>
      </Card>

      <BasicDatatable
        title={titleTutorado}
        columns={columnsTutorado}
        data={tutorados}
        options={optionsTutorado}
      ></BasicDatatable>
    </Container>
  );
}

export default GrupoDetailsPage;
