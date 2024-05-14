import { useEffect, useState } from "react";
import GridTable from "../GridTable/index";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { loadStock, selectAllStock } from "../../../store/stock";
import FichaEditarStock from "./FichaEditarStock";
import { Dialog } from "primereact/dialog";


export const TableGestionStock = () => {
    const dispatch = useDispatch();
  const { list: data, loading: isLoading } = useSelector(selectAllStock);
    const [visible, setVisible] = useState(false);
  const [visibleBeneficios, setVisibleBeneficios] = useState(false);
  const [visibleBeneficiosData, setVisibleBeneficiosData] = useState(false);
  const [visibleData, setVisibleData] = useState(false);


const handleBeneficio = async (rowData) => {
    setVisible(true);
    setVisibleData(rowData);
  };
  
  useEffect(() => {
    dispatch(loadStock());
  }, [dispatch]);


        return ( 
        <>     
        <h3 className="text-xl  text-gray-700 sm:text-2xl my-5">
            Gestion de Stock 
            {/* (
            {data &&
              new Intl.NumberFormat().format(
                data.length
              )}
            ) */}
          </h3>
          <div className="mx-auto max-w-screen-xl">
            <div className="bg-gray-100 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <GridTable
                  data={data}
                  loading={isLoading}
                  fileName="Stock"
                >
                  <Column selectionMode="multiple"></Column>
                  <Column
                    field="provincia"
                    header="PROVINCIA"
                    sortable
                  ></Column>
                  <Column field="delegacion" header="DELEGACIÓN" sortable></Column>
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
                    field="mochila"
                    header="MOCHILA"
                    sortable
                  ></Column>  
                    <Column
                    field="utiles_Jardín"
                    header="ÚT.J"
                    sortable
                  ></Column>
                   <Column
                    field="utiles_Primario"
                    header="ÚT.P"
                    sortable
                  ></Column>
                   <Column
                    field="utiles_Secundario"
                    header="ÚT.S"
                    sortable                    
                  ></Column>
                    <Column
                    field="talle6"
                    header="T.6"  
                    sortable              
                  ></Column>
                    <Column
                      field="talle8"
                      header="T.8"
                      sortable
                    ></Column>
                    <Column
                      field="talle10"
                      header="T.10"
                      sortable
                    ></Column>
                    <Column
                      field="talle12"
                      header="T.12"
                      sortable
                    ></Column>
                    <Column
                      field="talle14"
                      header="T.14"
                      sortable
                    ></Column>
                    <Column
                      field="talle16"
                      header="T.16"
                      sortable
                    ></Column>
                    <Column
                      field="talle18"
                      header="T.18"
                      sortable
                    ></Column>     
                       <Column
                    headerStyle={{ width: "11%", minWidth: "8rem" }}
                    bodyStyle={{ textAlign: "center" }}
                    body={(rowData) => (
                      <>
                        <Button
                          icon="pi pi-file-edit"
                          label="Stock"
                          size="small"
                          rounded
                          className="mr-1"
                          onClick={() => handleBeneficio(rowData)}
                        />
                        {/* <EliminarAfiliado row={rowData} /> */}
                      </>
                    )}
                  />                                          
                </GridTable>
                 <Dialog
            header={visibleData ? visibleData?.nombre : "Editar Stock"}
            visible={visible}
            onHide={() => setVisible(false)}
          >
            <FichaEditarStock row={visibleData} setVisible={setVisible} />
          </Dialog>
              </div>
            </div>
          </div>
          </>
        )
}