import { useEffect, useState } from "react";
import { getAllCarreras } from "../api/carreras.api";
import { BasicDatatable } from "../components/tables";
import { Link } from "react-router-dom";

const title = "CARRERAS";
const columns = [
  {
    name: "carrera",
    label: "ID CARRERA",
  },
  {
    name: "reticula",
    label: "RETICULA",
  },
  {
    name: "nombre_carrera",
    label: "NOMBRE",
  },
  {
    name: "siglas",
    label: "SIGLAS",
  },
  {
    name: "actions",
    label: "Acciones",
    options: {
      customBodyRender: (value, tableMeta) => {
        const rowData = tableMeta.rowData;
        return <Link to={`/carreras/${rowData[0]}`}>Ver Detalle</Link>;
      },
    },
  },
];

const options = {
  selectableRows: false,
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

function CoordInstitucionalPage() {
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    getAllCarreras().then((response) => {
      setCarreras(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <BasicDatatable
        title={title}
        columns={columns}
        data={carreras}
        options={options}
      ></BasicDatatable>
    </div>
  );
}

export default CoordInstitucionalPage;
