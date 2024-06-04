import { useEffect } from "react";
import { BasicDatatable } from "../components/tables";
import { Link } from "react-router-dom";
import { useGrupos } from "../context/GrupoContext";
import { Button } from "../components/ui";
import { useAuth } from "../context/AuthContext";

const title = "GRUPOS";
const columns = [
  {
    name: "id_grupo",
    label: "ID GRUPO",
  },
  {
    name: "nombre_grupo",
    label: "NOMBRE",
  },
  {
    name: "id_carrera",
    label: "CARRERA",
  },
  {
    name: "id_periodo",
    label: "PERIODO",
  },
  {
    name: "rfc",
    label: "TUTOR",
  },
  {
    name: "actions",
    label: "Acciones",
    options: {
      customBodyRender: (value, tableMeta) => {
        const rowData = tableMeta.rowData;
        return <Link to={`/grupos/${rowData[0]}`}>Ver Detalle</Link>;
      },
    },
  },
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

function GruposPage() {
  const { grupos, carreraGrupos, loadCarreraGrupos, loadGruposPorCarrera } =
    useGrupos();

  const { user } = useAuth();

  useEffect(() => {
    loadGruposPorCarrera(user.rfc); // Assuming the user object has an id property
  }, [user.rfc]);

  return (
    <div>
      <Link to={`/grupos/crear`}>
        <Button>Crear Grupo</Button>
      </Link>
      <BasicDatatable
        title={title}
        columns={columns}
        data={grupos}
        options={options}
      ></BasicDatatable>
    </div>
  );
}

export default GruposPage;
