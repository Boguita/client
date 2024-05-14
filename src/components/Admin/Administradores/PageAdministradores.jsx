import { useEffect, useState } from "react";
import GridTable from "../GridTable/index";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import FichaAfiliado from "./FichaAfiliado";
import BeneficiosEntrega from "./BeneficiosEntrega";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, selectAllUsers } from "../../../store/users";
import EliminarAfiliado from "./EliminarAfiliado";

const PageAdministradores = () => {
  const [visible, setVisible] = useState(false);
  const [visibleBeneficios, setVisibleBeneficios] = useState(false);
  const [visibleBeneficiosData, setVisibleBeneficiosData] = useState(false);
  const [visibleData, setVisibleData] = useState(false);

  const dispatch = useDispatch();
  const { list: data, loading: isLoading } = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const handleBeneficio = async (rowData) => {
    setVisible(true);
    setVisibleData(rowData);
  };

  const statusBodyTemplate = (data) => {
    return <Tag value={data.status} severity={getSeverity(data)}></Tag>;
  };

  const getSeverity = (data) => {
    switch (data.status) {
      case "Aprobado":
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
              Administradores
            </h2>
          </div>

          <h3 className="text-xl text-gray-700 sm:text-2xl my-2">
            Pendientes (
            {data &&
              new Intl.NumberFormat().format(
                data.filter((f) => f.status === "Pendiente")?.length
              )}
            )
          </h3>
          <div className="mx-auto max-w-screen-xl">
            <div className="bg-gray-100 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <GridTable
                  data={data.filter((f) => f.status === "Pendiente")}
                  loading={isLoading}
                  fileName="Administradores"
                  exportField={[
                    "username",
                    "dni",
                    "email",
                    "direccion",
                    "nacionalidad",
                    "cuit",
                    "sexo",
                    "provincia",
                    "delegacion",
                    "seccional",
                    "seccional_id",
                    "status",
                    "fecha_aprobacion",
                  ]}
                >
                  <Column selectionMode="multiple"></Column>
                  <Column
                    field="username"
                    header="Nombre"
                    sortable
                    style={{ width: "35%" }}
                  ></Column>
                  <Column field="dni" header="DNI" sortable></Column>
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
                          onClick={() => handleBeneficio(rowData)}
                        />
                        <EliminarAfiliado row={rowData} />
                      </>
                    )}
                  />
                </GridTable>
              </div>
            </div>
          </div>
          <h3 className="text-xl  text-gray-700 sm:text-2xl my-5">
            Aprobados (
            {data &&
              new Intl.NumberFormat().format(
                data.filter((f) => f.status === "Aprobado")?.length
              )}
            )
          </h3>
          <div className="mx-auto max-w-screen-xl">
            <div className="bg-gray-100 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <GridTable
                  data={data.filter((f) => f.status === "Aprobado")}
                  fileName="Administradores"
                  loading={isLoading}
                >
                  <Column selectionMode="multiple"></Column>
                  <Column
                    field="username"
                    header="Nombre"
                    sortable
                    style={{ width: "25%" }}
                  ></Column>
                  <Column field="dni" header="DNI" sortable></Column>
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
                    body={statusBodyTemplate}
                    header="ESTADO"
                    sortable
                  ></Column>
                  <Column
                    headerStyle={{ width: "23%", minWidth: "8rem" }}
                    bodyStyle={{ textAlign: "center" }}
                    body={(rowData) => (
                      <>
                        <Button
                          icon="pi pi-id-card"
                          label="Ficha"
                          size="small"
                          rounded
                          className="mr-1"
                          onClick={() => handleBeneficio(rowData)}
                        />
                        <Button
                          label="Beneficios"
                          icon="pi pi-check-square"
                          size="small"
                          className="mr-1"
                          rounded
                          outlined
                          onClick={() => {
                            setVisibleBeneficios(true);
                            setVisibleBeneficiosData(rowData);
                          }}
                        />
                        <EliminarAfiliado row={rowData} />
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
                  data={data.filter((f) => f.status === "Rechazado")}
                  loading={isLoading}
                  fileName="Administradores"
                >
                  <Column selectionMode="multiple"></Column>
                  <Column
                    field="username"
                    header="Nombre"
                    sortable
                    style={{ width: "35%" }}
                  ></Column>
                  <Column field="dni" header="DNI" sortable></Column>
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
                    header="ESTADO"
                    sortable
                    body={statusBodyTemplate}
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
                          onClick={() => handleBeneficio(rowData)}
                        />
                        <EliminarAfiliado row={rowData} />
                      </>
                    )}
                  />
                </GridTable>
              </div>
            </div>
          </div>
          <Dialog
            header={visibleData ? visibleData?.username : "Afiliado"}
            visible={visible}
            onHide={() => setVisible(false)}
          >
            <FichaAfiliado row={visibleData} setVisible={setVisible} />
          </Dialog>
          <Dialog
            header="Beneficios de Entrega"
            visible={visibleBeneficios}
            onHide={() => setVisibleBeneficios(false)}
          >
            <BeneficiosEntrega row={visibleBeneficiosData} />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PageAdministradores;
