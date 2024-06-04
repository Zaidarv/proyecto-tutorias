import React, { useState } from "react";
import { Card, Container, Button } from "../components/ui";
import { useEffect } from "react";
import { BasicDatatable } from "../components/tables";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGrupos } from "../context/GrupoContext";
import { useTutorados } from "../context/TutoradoContext";

function TutoradoSelectList() {
  const { grupo } = useGrupos();
  const { alumnos, loadAlumnosPorCarrera, loadUpdateTutoradoGrupo } =
    useTutorados();
  const [selectedRows, setSelectedRows] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadAlumnosPorCarrera(grupo.id_carrera);
  }, []);

  const handleSelectedRow = (currentRowsSelected, allRowsSelected) => {
    if (allRowsSelected.length <= 5) {
      const selected = allRowsSelected.map((row) => alumnos[row.dataIndex]);
      setSelectedRows(selected);
    } else {
      alert("Solo puedes seleccionar 5 alumnos");
    }
  };

  const handleInsertButtonClick = async () => {
    if (!selectedRows) {
      console.warn("Ninguna fila seleccionada");
      return;
    }
    const confirmMessage =
      `¿Inscribir a los siguientes alumnos al grupo ${grupo.nombre_grupo}?\n\n` +
      selectedRows
        .map(
          (row) =>
            `${row.no_de_control} ${row.nombre_alumno} ${row.apellido_paterno} ${row.apellido_materno}`
        )
        .join("\n");
    const confirmAction = window.confirm(confirmMessage);
    if (confirmAction) {
      try {
        selectedRows.map((row) =>
          loadUpdateTutoradoGrupo(id, {
            no_de_control: row.no_de_control,
          })
        );
        navigate(`/grupos/${id}`, { replace: true });
      } catch (error) {
        console.error("Error al asignar tutorado(s)", error);
      }
    }
  };

  const title = "SELECCIONAR TUTORADOS";
  const columns = [
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

  const options = {
    selectableRows: "multiple",

    pagination: true,
    filter: true,
    search: true,
    onRowSelectionChange: handleSelectedRow,
    customToolbarSelect: () => {
      return <Button onClick={handleInsertButtonClick}>Inscribir</Button>;
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
        title={title + " PARA EL GRUPO " + grupo?.nombre_grupo}
        columns={columns}
        data={alumnos}
        options={options}
      ></BasicDatatable>
    </Container>
  );
}

export default TutoradoSelectList;
