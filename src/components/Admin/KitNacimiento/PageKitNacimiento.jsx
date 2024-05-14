import { useEffect } from "react";
import GridTable from "../GridTable/index";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import {
  loadKitMaternal,
  selectAllKitMaternal,
} from "../../../store/kitMaternal";
import EntregarBeneficio from "./EntregarBeneficio";
import Libro from "../../../assets/img/mono.png";
import RechazarBeneficio from "./RechazarBeneficio";
import PendienteBeneficio from "./PendienteBeneficio";
import EliminarBeneficio from "./EliminarBeneficio";
import { IoIosRefresh } from "react-icons/io";

const PageKitNacimiento = () => {
  const dispatch = useDispatch();
  const { list: data, loading: isLoading } = useSelector(selectAllKitMaternal);

  useEffect(() => {
    dispatch(loadKitMaternal());
  }, [dispatch]);

  const statusBodyTemplate = (data) => {
    return <Tag value={data.estado} severity={getSeverity(data)}></Tag>;
  };

  const diaPartoBodyTemplate = (row) => {
    const fechaParto = new Date(row.fecha_de_parto);
    fechaParto.setHours(0, 0, 0, 0);

    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    const diferenciaEnMilisegundos = fechaParto - fechaActual;
    const diaFaltantes = Math.floor(
      diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)
    );

    return diaFaltantes;
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
            <div className="flex items-center">
              <img
                className="w-8 h-8 sm:w-12 sm:h-12 me-2"
                src={Libro}
                alt="Kit Nacimiento"
              />
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
                Kit Nacimiento
              </h2>
            </div>
            <button onClick={() => dispatch(loadKitMaternal({params: "refresh"}))} className='p-1 px-5 w-max font-bold text-white rounded-lg bg-[#006084] hover:bg-opacity-60'
                    
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
                  fileName="KitNacimiento"
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
                    header="MADRE"
                    sortable
                  ></Column>
                  <Column
                    field="familiar_dni"
                    header="DNI MADRE"
                    sortable
                  ></Column>
                  <Column
                    field="provincia"
                    header="PROVINCIA"
                    sortable
                  ></Column>
                  <Column
                    field="delegacion"
                    header="DELEGACIÓN"
                    sortable
                  ></Column>
                  <Column
                    field="seccional"
                    header="SECCIONAL"
                    sortable
                  ></Column>
                  <Column
                    field="direccion"
                    header="DIRECCIÓN SECCIONAL"
                    sortable
                  ></Column>
                  <Column
                    body={(rowData) =>
                      new Date(rowData.fecha_de_parto).toLocaleDateString(
                        "es-AR",
                        { timeZone: "America/Buenos_Aires" }
                      )
                    }
                    header="FECHA PARTO"
                    sortable
                  ></Column>
                  <Column
                    body={diaPartoBodyTemplate}
                    header="DÍAS PARA EL PARTO"
                    sortable
                  ></Column>

                  <Column
                    body={(rowData) =>
                      diaPartoBodyTemplate(rowData) < 60 ? (
                        <Tag value="Urgente" severity="danger"></Tag>
                      ) : (
                        <Tag value="Normal"></Tag>
                      )
                    }
                    header="PLAZO"
                    sortable
                  ></Column>
                  <Column
                    headerStyle={{ width: "24%", minWidth: "8rem" }}
                    bodyStyle={{ textAlign: "center" }}
                    header="ACCIONES"
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

          <h3 className="text-xl text-gray-700 sm:text-2xl my-2">
            Enviados (
            {data &&
              new Intl.NumberFormat().format(
                data.filter((f) => f.estado === "Enviado")?.length
              )}
            )
          </h3>
          <div className="mx-auto max-w-screen-xl">
            <div className="bg-gray-100 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <GridTable
                  data={data.filter((f) => f.estado === "Enviado")}
                  loading={isLoading}
                  fileName="KitNacimiento"
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
                    header="MADRE"
                    sortable
                  ></Column>
                  <Column
                    field="familiar_dni"
                    header="DNI MADRE"
                    sortable
                  ></Column>
                  <Column
                    field="provincia"
                    header="PROVINCIA"
                    sortable
                  ></Column>
                  <Column
                    field="delegacion"
                    header="DELEGACIÓN"
                    sortable
                  ></Column>
                  <Column
                    field="seccional"
                    header="SECCIONAL"
                    sortable
                  ></Column>
                  <Column
                    field="direccion"
                    header="DIRECCIÓN SECCIONAL"
                    sortable
                  ></Column>
                  <Column
                    body={(rowData) =>
                      new Date(rowData.fecha_de_parto).toLocaleDateString(
                        "es-AR",
                        { timeZone: "America/Buenos_Aires" }
                      )
                    }
                    header="FECHA PARTO"
                    sortable
                  ></Column>
                  <Column
                    body={diaPartoBodyTemplate}
                    header="DÍAS PARA EL PARTO"
                    sortable
                  ></Column>
                  <Column
                    body={(rowData) =>
                      new Date(rowData.fecha_envio).toLocaleDateString(
                        "es-AR",
                        { timeZone: "America/Buenos_Aires" }
                      )
                    }
                    header="FECHA ENVIÓ"
                    sortable
                  ></Column>
                  <Column
                    headerStyle={{ width: "24%", minWidth: "8rem" }}
                    bodyStyle={{ textAlign: "center" }}
                    header="ACCIONES"
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
                        <PendienteBeneficio row={rowData} />
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
                  fileName="KitNacimiento"
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
                    header="MADRE"
                    sortable
                  ></Column>
                  <Column
                    field="familiar_dni"
                    header="DNI MADRE"
                    sortable
                  ></Column>
                  <Column
                    field="provincia"
                    header="PROVINCIA"
                    sortable
                  ></Column>
                  <Column
                    field="delegacion"
                    header="DELEGACIÓN"
                    sortable
                  ></Column>
                  <Column
                    field="seccional"
                    header="SECCIONAL"
                    sortable
                  ></Column>
                  <Column
                    field="direccion"
                    header="DIRECCIÓN SECCIONAL"
                    sortable
                  ></Column>
                  <Column
                    body={(rowData) =>
                      new Date(rowData.fecha_de_parto).toLocaleDateString(
                        "es-AR",
                        { timeZone: "America/Buenos_Aires" }
                      )
                    }
                    header="FECHA PARTO"
                    sortable
                  ></Column>
                  <Column
                    body={(rowData) =>
                      new Date(rowData.fecha_entrega).toLocaleDateString(
                        "es-AR",
                        { timeZone: "America/Buenos_Aires" }
                      )
                    }
                    header="FECHA ENTREGA"
                    sortable
                  ></Column>
                  <Column
                    headerStyle={{ width: "24%", minWidth: "8rem" }}
                    bodyStyle={{ textAlign: "center" }}
                    header="ACCIONES"
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
                data.filter((f) => f.estado === "Rechazado")?.length
              )}
            )
          </h3>
          <div className="mx-auto max-w-screen-xl">
            <div className="bg-gray-100 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <GridTable
                  data={data.filter((f) => f.estado === "Rechazado")}
                  loading={isLoading}
                  fileName="KitNacimiento"
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
                    header="MADRE"
                    sortable
                  ></Column>
                  <Column
                    field="familiar_dni"
                    header="DNI MADRE"
                    sortable
                  ></Column>
                  <Column
                    field="provincia"
                    header="PROVINCIA"
                    sortable
                  ></Column>
                  <Column
                    field="delegacion"
                    header="DELEGACIÓN"
                    sortable
                  ></Column>
                  <Column
                    field="seccional"
                    header="SECCIONAL"
                    sortable
                  ></Column>
                  <Column
                    field="direccion"
                    header="DIRECCIÓN SECCIONAL"
                    sortable
                  ></Column>
                  <Column
                    body={(rowData) =>
                      new Date(rowData.fecha_de_parto).toLocaleDateString(
                        "es-AR",
                        { timeZone: "America/Buenos_Aires" }
                      )
                    }
                    header="FECHA PARTO"
                    sortable
                  ></Column>
                  <Column
                    body={diaPartoBodyTemplate}
                    header="DÍAS PARA EL PARTO"
                    sortable
                  ></Column>
                  <Column
                    headerStyle={{ width: "24%", minWidth: "8rem" }}
                    bodyStyle={{ textAlign: "center" }}
                    header="ACCIONES"
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
                        <PendienteBeneficio row={rowData} />
                        <EliminarBeneficio row={rowData} />
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

export default PageKitNacimiento;
