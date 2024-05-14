import { useEffect, useState } from "react";
import GridTable from "../GridTable/index";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
// import EliminarAfiliado from "./EliminarAfiliado";
import { loadSeccionales, selectAllSeccionales } from "../../../store/seccionales";
import FichaEditarSeccional from "./FichaEditarSeccional";
import FichaCrearSeccional from "./FichaCrearSeccional";

const PageSeccionales = () => {
  const [visible, setVisible] = useState(false);
  const [visibleBeneficios, setVisibleBeneficios] = useState(false);
  const [visibleBeneficiosData, setVisibleBeneficiosData] = useState(false);
  const [visibleData, setVisibleData] = useState(false);

  const dispatch = useDispatch();
  const { list: data, loading: isLoading } = useSelector(selectAllSeccionales);

  useEffect(() => {
    dispatch(loadSeccionales());
  }, [dispatch]);

  const handleBeneficio = async (rowData) => {
    setVisible(true);
    setVisibleData(rowData);
  };

  const handleCrearSeccional = async () => {
    setVisibleBeneficios(true);    
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
              Seccionales
            </h2>
              <Button
                          icon="pi pi-plus"
                          label="Crear nueva seccional"
                          size="small"
                          rounded
                          className="bg-[#23a2d9ff] text-[1em] border-[#23a2d9ff] w-1/5 py-4 mr-1"
                          onClick={() => handleCrearSeccional()}
                        />
          </div>

          <h3 className="text-xl text-gray-700 sm:text-2xl my-2">
            Disponibles (
            {data &&
              new Intl.NumberFormat().format(
                data.length
              )}
            )
          </h3>
          <div className="mx-auto max-w-screen-xl">
            <div className="bg-gray-100 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <GridTable
                  data={data}
                  loading={isLoading}
                  fileName="Seccionales"
                  exportField={[
                    "provincia",
                    "delegacion",
                    "nombre",
                    "direccion",                                
                  ]}
                >
                  <Column selectionMode="multiple"></Column>                              
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
                    field="nombre"
                    header="SECCIONAL"
                    sortable
                  ></Column>
                   <Column
                    field="direccion"
                    header="DIRECCIÓN"
                    sortable
                  ></Column>                 
                  <Column
                    headerStyle={{ width: "11%", minWidth: "8rem" }}
                    bodyStyle={{ textAlign: "center" }}
                    body={(rowData) => (
                      <>
                        <Button
                          icon="pi pi-id-card"
                          label="Editar"
                          size="small"
                          rounded
                          className="mr-1"
                          onClick={() => handleBeneficio(rowData)}
                        />
                        
                      </>
                    )}
                  />
                </GridTable>
              </div>
            </div>
          </div>
          
         
          <Dialog
            header={visibleData ? visibleData?.nombre : "Editar Seccional"}
            visible={visible}
            onHide={() => setVisible(false)}
          >
            <FichaEditarSeccional row={visibleData} setVisible={setVisible} />
          </Dialog>
          <Dialog
            header="Crear nueva seccional"
            visible={visibleBeneficios}
            onHide={() => setVisibleBeneficios(false)}
          >
            <FichaCrearSeccional row={visibleBeneficiosData} setVisible={setVisibleBeneficios} />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PageSeccionales;
