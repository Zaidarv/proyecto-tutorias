import React, { useState } from "react";
import { Card, Container, Button } from "../components/ui";
import { useEffect } from "react";
import { BasicDatatable } from "../components/tables";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGrupos } from "../context/GrupoContext";
import { useTutores } from "../context/TutorContext";

function TutorSelectList() {
  const { grupo } = useGrupos();
  const { docentes, loadDocentes, loadUpdateTutorGrupo } = useTutores();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    loadDocentes();
  }, []);

  const handleSelectedRow = (currentRow) => {
    if (currentRow.length > 0) {
      setSelectedRow(docentes[currentRow[0].dataIndex]);
    }
  };

  const handleInsertButtonClick = async () => {
    if (!selectedRow) {
      console.warn("Ninguna fila seleccionada");
      return;
    }
    const confirmAction = window.confirm(
      `¿Asignar a ${selectedRow.nombre_empleado} ${selectedRow.apellidos_empleado} como tutor del grupo ${grupo.nombre_grupo}?`
    );
    if (confirmAction) {
      try {
        loadUpdateTutorGrupo(id, { rfc: selectedRow.rfc });
        navigate(`/grupos/${id}`, { replace: true });
      } catch (error) {
        console.error("Error al asignar coordinador:", error);
      }
    }
  };

  const title = "SELECCIONAR TUTOR";
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
    selectableRows: "single",
    onRowSelectionChange: handleSelectedRow,
    customToolbarSelect: () => {
      return <Button onClick={handleInsertButtonClick}>Asignar tutor</Button>;
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
        data={docentes}
        options={options}
      ></BasicDatatable>
    </Container>
  );
}

export default TutorSelectList;
