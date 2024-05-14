import { Column } from "primereact/column";
import GridTable from "../GridTable/index";
import { useEffect, useState } from "react";
import { getBeneficioOtorgado } from "./ServiceAdministrador";

const BeneficiosEntrega = (props) => {
  const { row } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getBeneficioOtorgado(row.id);
      if (response) {
        setIsLoading(false);
      }
      setData(response);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex items-center flex-1 space-x-4">
        <h3 className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
          {row.username}
        </h3>
      </div>
      <div className="grid gap-4 mb-4 sm:grid-cols-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            N° Administrador
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={row.dni}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            DNI
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={row.dni}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            MAIL
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={row.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            TEL
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={row.tel}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
      </div>
      <GridTable data={data} loading={isLoading}>
        <Column selectionMode="multiple"></Column>
        <Column field="afiliado_id" header="DNI AFILIADO" sortable></Column>
        <Column field="tipo" header="TIPO" sortable></Column>
        <Column
          field="fecha_otorgamiento"
          header="FECHA OTORGAMIENTO"
          sortable
        ></Column>
        <Column field="provincia" header="PROVINCIA" sortable></Column>
        <Column field="seccional" header="SECCIONAL" sortable></Column>
        <Column field="direccion" header="DIRECCION" sortable></Column>
        <Column field="constancia_img" header="RECIBO" sortable></Column>
      </GridTable>
    </div>
  );
};

export default BeneficiosEntrega;
