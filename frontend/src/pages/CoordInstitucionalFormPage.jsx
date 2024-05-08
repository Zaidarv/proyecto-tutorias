import React from "react";
import { Card, Container, Button } from "../components/ui";
import { useCarreras } from "../context/CarreraContext";
import { useEffect } from "react";
import { BasicDatatable } from "../components/tables";
import { useParams, Link } from "react-router-dom";

function CoordInstitucionalFormPage() {
  const { carrera, coordinadores, loadCoordinadores } = useCarreras();
  const { id } = useParams();
  useEffect(() => {
    loadCoordinadores();
  }, []);

  const handleRowSelection = (currentRowsSelected, allRowsSelected) => {
    console.log(currentRowsSelected, allRowsSelected);
  };

  const title = "SELECCIONAR COORDINADOR ACADÉMICO";
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

    // {
    //   name: "actions",
    //   label: "Acciones",
    //   options: {
    //     customBodyRender: (value, tableMeta) => {
    //       const rowData = tableMeta.rowData;
    //       return <Link to={`/carreras/${rowData[0]}`}>Ver Detalle</Link>;
    //     },
    //   },
    // },
  ];

  const options = {
    selectableRows: "single",
    onRowsSelectionChange: handleRowSelection,
    customToolbarSelect: () => {
      return <Button>Asignar coordinador</Button>;
    },

    download: false,
    print: false,

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

  return (
    <Container className="h-[calc(100vh-10rem)] items-center justify-center">
      {/* <Button>Asignar coordinador</Button> */}

      <BasicDatatable
        title={title + " PARA " + carrera?.nombre_carrera}
        columns={columns}
        data={coordinadores}
        options={options}
      ></BasicDatatable>
    </Container>
  );
}

export default CoordInstitucionalFormPage;
