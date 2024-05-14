import { useEffect, useState } from "react";
import GridTable from "../GridTable/index";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
// import EntregarBeneficio from "./EntregarBeneficio";
// import Libro from "../../../assets/img/libro-abierto.png";
// import RechazarBeneficio from "./RechazarBeneficios";

import { loadEnvios, selectAllEnvios } from "../../../store/envios";


export const TableEnvíos = () => {
    const dispatch = useDispatch();
  const { list: data, loading: isLoading } = useSelector(selectAllEnvios);


  
  useEffect(() => {
    dispatch(loadEnvios());
  }, [dispatch]);


        return ( 
        <>     
        <h3 className="text-xl  text-gray-700 sm:text-2xl my-5">
            Envíos (
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
                  fileName="Envíos"
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
                </GridTable>
              </div>
            </div>
          </div>
          </>
        )
}