import React from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useSesiones } from "../context/SesionContext";
import { Link } from "react-router-dom";
import { Button, Card, Container } from "../components/ui";
import { BasicDatatable } from "../components/tables";

const title = "SESIONES";
const columns = [
  {
    name: "id_sesion",
    label: "SESION",
  },
  {
    name: "actividad",
    label: "ACTIVIDAD",
  },
  {
    name: "fecha_sesion",
    label: "FECHA",
  },
  {
    name: "hora_sesion",
    label: "HORA",
  },
  {
    name: "lugar",
    label: "AULA",
  },

  // {
  //   name: "actions",
  //   label: "Acciones",
  //   options: {
  //     customBodyRender: (value, tableMeta) => {
  //       const rowData = tableMeta.rowData;
  //       return <Link to={`/sesiones/${rowData[0]}`}>Ver Detalle</Link>;
  //     },
  //   },
  // },
];

const options = {
  selectableRows: "none",
  textLabels: {
    body: {
      noMatch: "Lo sentimos, no se encontraron registros",
      toolTip: "Ordenar",
      columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
    },
    pagination: {
      next: "Siguiente",
      previous: "Anterior",
      rowsPerPage: "Filas por página:",
      displayRows: "of",
    },
    toolbar: {
      search: "Buscar",
      downloadCsv: "Descargar CSV",
      print: "Imprimir",
      viewColumns: "Ver Columnas",
      filterTable: "Filtrar Tabla",
    },
    filter: {
      all: "Todos",
      title: "Filtros",
      reset: "Deshacer",
    },
    viewColumns: {
      title: "Ver Columnas",
      titleAria: "Mostrar/Ocultar Columnas",
    },
    selectedRows: {
      text: "fila(s) seleccionada(s)",
      delete: "Eliminar",
      deleteAria: "Eliminar Filas Seleccionadas",
    },

    onRowsSelect: {
      viewColumns: "Ver Columnas",
      search: "Buscar",
      //   delete: "Eliminar",
    },
  },
};

function SesionesPage() {
  const { grupo, loadSesionesPorGrupo, sesiones } = useSesiones();

  const data = useAuth();

  useEffect(() => {
    loadSesionesPorGrupo(data.user.rfc);
  }, [data.user.rfc]);

  return (
    <Container>
      <Card>
        <div className="flex items-center">
          <h2 className="text-2xl flex-grow">
            Sesiones del grupo {grupo.nombre_grupo}
          </h2>
          <Link to={`/sesiones/crear`} className=" ">
            <Button>Agendar sesión</Button>
          </Link>
        </div>
      </Card>

      <BasicDatatable
        title={title}
        columns={columns}
        data={sesiones}
        options={options}
      ></BasicDatatable>
    </Container>
  );
}

export default SesionesPage;
