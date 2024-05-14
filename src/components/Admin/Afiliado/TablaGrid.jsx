import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import swal from "sweetalert";
import { Button } from "primereact/button";
import { removeAfiliado, getList } from "./ServicesAfiliado";

const TablaGrid = (props) => {
  const { data, loading } = props;

  const [selectedProducts, setSelectedProducts] = useState(null);
  const [dataLista, setDataLista] = useState(data);

  // filtro
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });

  const exportExcel = () => {
    if (!selectedProducts) {
      // alert("");
      swal({
        title: "",
        text: "Debe seleccionar al menos un Afiliado.",
        icon: "warning",
      });
      return false;
    }
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(selectedProducts);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "afiliados");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 "
                value={value || ""}
                onChange={(e) => onGlobalFilterChange(e)}
              />
            </div>
          </form>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          {/* <button
            type="button"
            className="flex items-center justify-center text-white bg-[#006084] hover:text-[#000] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Seleccionar todos
          </button> */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              type="button"
              onClick={exportExcel}
              className="flex items-center justify-center text-white bg-[#006084] hover:text-[#000] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Exportar seleccionados
            </button>
          </div>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
  };

  console.log("selectedProducts", selectedProducts);

  const handleEliminarAfiliado = async (id) => {
    swal({
      title: "¿Estas seguro de eliminar?",
      text: "Todos los datos, incluso familiares seran eliminados.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const status = await removeAfiliado(id);
        if (status === 200) {
          swal({
            title: "Éxito!",
            text: "Afiliado eliminado.",
            icon: "success",
          });
          setDataLista(await getList());
        }
      }
    });
  };

  useEffect(() => {
    setDataLista(data);
  });

  return (
    <DataTable
      value={dataLista}
      stripedRows
      filters={filters}
      paginator
      rows={10}
      rowsPerPageOptions={[10, 25, 50]}
      dataKey="idafiliados"
      header={header}
      scrollable
      scrollHeight="700px"
      loading={loading}
      sortField="idafiliados"
      sortOrder={-1}
      selectionMode="checkbox"
      selection={selectedProducts}
      onSelectionChange={(e) => setSelectedProducts(e.value)}
      size="small"
    >
      <Column selectionMode="multiple"></Column>
      <Column
        field="name"
        header="Nombre"
        sortable
        style={{ width: "35%" }}
      ></Column>
      <Column field="dni" header="DNI" sortable></Column>
      <Column field="correo" header="EMAIL" sortable></Column>
      <Column field="tel" header="TEL" sortable></Column>
      <Column field="provincia" header="PROVINCIA" sortable></Column>
      <Column field="ciudad" header="CIUDAD" sortable></Column>
      <Column field="domicilio" header="DOMICILIO" sortable></Column>
      <Column
        body={(rowData) => (
          <Button
            label="Ficha"
            icon="pi pi-id-card"
            size="small"
            onClick={() =>
              window.open(`/admin/${rowData.dni}`, "_blank", "noreferrer")
            }
          />
        )}
      />
      <Column
        body={(rowData) => (
          <Button
            label="Eliminar"
            onClick={() => handleEliminarAfiliado(rowData.idafiliados)}
            icon="pi pi-trash"
            size="small"
            severity="danger"
          />
        )}
      />
    </DataTable>
  );
};

TablaGrid.propTypes = {};

export default TablaGrid;
