import { useEffect } from "react";
import GridTable from "../GridTable/index";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { loadLunaMiel, selectAllLunaMiel } from "../../../store/lunaDeMiel";
import EntregarBeneficio from "./EntregarBeneficio";
import Avion from "../../../assets/img/plane.png";
import RechazarBeneficio from "./RechazarBeneficio";
import { IoIosRefresh } from "react-icons/io";

const PageLunaMiel = () => {
  const dispatch = useDispatch();
  const { list: data, loading: isLoading } = useSelector(selectAllLunaMiel);

  useEffect(() => {
    dispatch(loadLunaMiel());
  }, [dispatch]);

  const statusBodyTemplate = (data) => {
    return <Tag value={data.estado} severity={getSeverity(data)}></Tag>;
  };

  const getSeverity = (data) => {
    switch (data.estado) {
      case "Entregado":
        return "success";

      case "Pendiente":
        return "warning";

      case "Rechazado":
        return "danger";

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="md:ml-64 h-auto pt-20">
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
              <i>
                <img className=" w-8 h-8 sm:w-12 sm:h-12" src={Avion} />
              </i>
              Luna de Miel
            </h2>
          </div>
          <div className="flex w-full justify-end">
            <button onClick={() => dispatch(loadLunaMiel({params: "refresh"}))} className='p-1 px-5 w-max font-bold text-white rounded-lg bg-[#006084] hover:bg-opacity-60'
                    
                        >
                          <span className='flex items-center gap-x-2'>
                          
                          <IoIosRefresh className='text-2xl' />
                          </span>
           </button>
           </div>
          <h3 className="text-xl text-gray-700 sm:text-2xl my-2">
            Pendientes (
            {data &&
              new Intl.NumberFormat().format(
                data.filter((f) => f.estado === "Pendiente")?.length
              )}
            )
          </h3>
          <div className="mx-auto max-w-screen-xl">
            <div className="bg-gray-100 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <GridTable
                  data={data.filter((f) => f.estado === "Pendiente")}
                  loading={isLoading}
                  fileName="LunaDeMiel"
                >
                  <Column selectionMode="multiple"></Column>
                  <Column
                    field="afiliado_name"
                    header="AFILIADO"
                    sortable
                  ></Column>
                  <Column field="afiliado_dni" header="DNI" sortable></Column>
                  <Column
                    field="familiar_name"
                    header="CONJUGUE"
                    sortable
                  ></Column>
                  <Column
                    field="familiar_dni"
                    header="DNI CONJUGUE"
                    sortable
                  ></Column>
                  <Column field="afiliado_tel" header="TEL" sortable></Column>
                  <Column
                    field="fecha_otorgamiento"
                    header="FECHA DE SOLICITUD"
                    sortable
                  ></Column>
                  <Column
                    field="afiliado_tel"
                    header="NÚMERO DE LIBRETA"
                    sortable
                  ></Column>
                  <Column
                    body={statusBodyTemplate}
                    header="ESTADO"
                    sortable
                  ></Column>
                  <Column
                    headerStyle={{ width: "24%", minWidth: "8rem" }}
                    bodyStyle={{ textAlign: "center" }}
                    body={(rowData) => (
                      <>
                        <Button
                          icon="pi pi-id-card"
                          label="Ficha"
                          size="small"
                          rounded
                          className="mr-1"
                          onClick={() =>
                            window.open(
                              `/admin/${rowData.afiliado_dni}`,
                              "_blank",
                              "noreferrer"
                            )
                          }
                        />
                        <EntregarBeneficio row={rowData} />
                        <RechazarBeneficio row={rowData} />
                      </>
                    )}
                  />
                </GridTable>
              </div>
            </div>
          </div>
          <h3 className="text-xl  text-gray-700 sm:text-2xl my-5">
            Entregados (
            {data &&
              new Intl.NumberFormat().format(
                data.filter((f) => f.estado === "Entregado")?.length
              )}
            )
          </h3>
          <div className="mx-auto max-w-screen-xl">
            <div className="bg-gray-100 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <GridTable
                  data={data.filter((f) => f.estado === "Entregado")}
                  loading={isLoading}
                  fileName="LunaDeMiel"
                >
                  <Column selectionMode="multiple"></Column>
                  <Column
                    field="afiliado_name"
                    header="AFILIADO"
                    sortable
                  ></Column>
                  <Column field="afiliado_dni" header="DNI" sortable></Column>
                  <Column
                    field="familiar_name"
                    header="CONJUGUE"
                    sortable
                  ></Column>
                  <Column
                    field="familiar_dni"
                    header="DNI CONJUGUE"
                    sortable
                  ></Column>
                  <Column field="afiliado_tel" header="TEL" sortable></Column>
                  <Column
                    field="fecha_otorgamiento"
                    header="FECHA DE SOLICITUD"
                    sortable
                  ></Column>
                  <Column
                    field="afiliado_tel"
                    header="NÚMERO DE LIBRETA"
                    sortable
                  ></Column>
                  <Column
                    body={statusBodyTemplate}
                    header="ESTADO"
                    sortable
                  ></Column>
                  <Column
                    headerStyle={{ width: "11%", minWidth: "8rem" }}
                    bodyStyle={{ textAlign: "center" }}
                    body={(rowData) => (
                      <>
                        <Button
                          icon="pi pi-id-card"
                          label="Ficha"
                          size="small"
                          rounded
                          className="mr-1"
                          onClick={() =>
                            window.open(
                              `/admin/${rowData.afiliado_dni}`,
                              "_blank",
                              "noreferrer"
                            )
                          }
                        />
                      </>
                    )}
                  />
                </GridTable>
              </div>
            </div>
          </div>
          <h3 className="text-xl text-gray-700 sm:text-2xl my-5">
            Rechazados (
            {data &&
              new Intl.NumberFormat().format(
                data.filter((f) => f.status === "Rechazado")?.length
              )}
            )
          </h3>
          <div className="mx-auto max-w-screen-xl">
            <div className="bg-gray-100 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <GridTable
                  data={data.filter((f) => f.estado === "Rechazado")}
                  loading={isLoading}
                  fileName="LunaDeMiel"
                >
                  <Column selectionMode="multiple"></Column>
                  <Column
                    field="afiliado_name"
                    header="AFILIADO"
                    sortable
                  ></Column>
                  <Column field="afiliado_dni" header="DNI" sortable></Column>
                  <Column
                    field="familiar_name"
                    header="CONJUGUE"
                    sortable
                  ></Column>
                  <Column
                    field="familiar_dni"
                    header="DNI CONJUGUE"
                    sortable
                  ></Column>
                  <Column field="afiliado_tel" header="TEL" sortable></Column>
                  <Column
                    field="fecha_otorgamiento"
                    header="FECHA DE SOLICITUD"
                    sortable
                  ></Column>
                  <Column
                    field="afiliado_tel"
                    header="NÚMERO DE LIBRETA"
                    sortable
                  ></Column>
                  <Column
                    body={statusBodyTemplate}
                    header="ESTADO"
                    sortable
                  ></Column>
                  <Column
                    headerStyle={{ width: "16%", minWidth: "8rem" }}
                    bodyStyle={{ textAlign: "center" }}
                    body={(rowData) => (
                      <>
                        <Button
                          icon="pi pi-id-card"
                          label="Ficha"
                          size="small"
                          rounded
                          className="mr-1"
                          onClick={() =>
                            window.open(
                              `/admin/${rowData.afiliado_dni}`,
                              "_blank",
                              "noreferrer"
                            )
                          }
                        />
                        <EntregarBeneficio row={rowData} />
                      </>
                    )}
                  />
                </GridTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLunaMiel;
