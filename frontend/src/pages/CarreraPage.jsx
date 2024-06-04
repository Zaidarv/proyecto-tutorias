import React from "react";
import { useCarreras } from "../context/CarreraContext";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Container } from "../components/ui";
import { BasicDatatable } from "../components/tables";

function CarreraPage() {
  const { carrera, coordinador, loadCarrera, loadCoordinador } = useCarreras();
  const { id } = useParams();
  useEffect(() => {
    loadCarrera(id);
    loadCoordinador(id);
  }, []);

  const title = "COORDINADOR ACADÉMICO";
  const columns = [
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
  const options = {
    selectableRows: "none",
    toolbar: false,
    pagination: false,
    search: false,
    download: false,
    print: false,
    filter: false,
    textLabels: {
      body: {
        noMatch: "Sin coordinador asignado",
        toolTip: "Ordenar",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
    },
  };

  return (
    <Container className="h-[calc(100vh-10rem)] items-center justify-center">
      <Card className="">
        <Link to={`/carreras/${id}/asignar-coordinador`}>
          <Button>Seleccionar coordinador</Button>
        </Link>
        <BasicDatatable
          title={title + " DE " + carrera?.nombre_carrera}
          columns={columns}
          data={coordinador}
          options={options}
        ></BasicDatatable>
      </Card>
    </Container>
  );
}

export default CarreraPage;
