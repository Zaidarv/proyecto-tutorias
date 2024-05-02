import MUIDataTable from "mui-datatables";

export const BasicDatatable = ({ title, data, columns, options }) => {
  return (
    <MUIDataTable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
};
