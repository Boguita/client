import { useEffect, useState } from "react";
import GridTable from "../GridTable/index";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import Libro from "../../../assets/img/libro-abierto.png";
import { loadKitEscolar, selectAllKitEscolar } from "../../../store/kitEscolar";
import { TableEnvíos } from "./Envíos";
import { TableGestionStock } from "./TableGestionStock";
import { RxExternalLink } from "react-icons/rx";
import { IoIosRefresh } from "react-icons/io";

const PageKitEscolar = () => {
  const dispatch = useDispatch();
  const { list: data, loading: isLoading } = useSelector(selectAllKitEscolar);
  const [beneficiosAgrupados, setBeneficiosAgrupados] = useState([]);

    const handleOpenList = () => {
    // Abre una nueva pestaña o ventana del navegador con la URL especificada
    window.open('/admin/kit-escolar/listado-pendientes', '_blank');
  };

  useEffect(() => {
    dispatch(loadKitEscolar());
  }, [dispatch]);

  useEffect(() => {
    // Función para agrupar beneficios por afiliado y familiar
  const agruparBeneficios = (beneficios) => {
    return beneficios.reduce((acumulador, beneficio) => {
      const clave = `${beneficio.afiliado_id}_${beneficio.familiar_id}`;
      if (acumulador[clave]) {
        // Beneficio ya existe, actualiza solo si el nuevo beneficio es más reciente
        const beneficioExistente = acumulador[clave];
        const fechaNueva = new Date(beneficio.fecha_otorgamiento);
        const fechaExistente = new Date(beneficioExistente.fecha_otorgamiento);

        if (fechaNueva > fechaExistente) {
          // Actualiza los campos específicos manteniendo el valor 1 sobre el 0
          acumulador[clave] = {
            ...beneficioExistente,
            utiles: beneficio.utiles || beneficioExistente.utiles,
            mochila: beneficio.mochila || beneficioExistente.mochila,
            guardapolvo_confirm: beneficio.guardapolvo_confirm || beneficioExistente.guardapolvo_confirm,
            beneficios: [...beneficioExistente.beneficios, { ...beneficio }],
          };
        }
      } else {
        // Beneficio no existe, agrégalo
        acumulador[clave] = { ...beneficio, beneficios: [{ ...beneficio }] };
      }

      return acumulador;
    }, {});
  };

  // Agrupar beneficios cuando los datos cambien
  const beneficiosAgrupados = agruparBeneficios(data);
  setBeneficiosAgrupados(Object.values(beneficiosAgrupados));
  console.log(beneficiosAgrupados);
  console.log(data);
}, [data]);

 
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

  const contentTemplate = (rowData) => {
    const status = rowData.guardapolvo_confirm === 1 && 
    rowData.mochila === 1 &&
    rowData.utiles === 1;
    return status ? (
      <Tag value="Completo" severity="success"></Tag>
    ) : (
      <Tag value="Incompleto" severity="warning"></Tag>
    );
  }

  const guardapolvoTemplate = (rowData) => {
    return rowData.guardapolvo_confirm === 1 ? <Tag value={`SI TALLE: ${rowData.guardapolvo}`} severity="success" />  :  <Tag value={`NO TALLE: ${rowData.guardapolvo}`} severity="danger" />;
  }

const checkTemplate = (value) => (value === 1 ? <Tag value="SI" severity="success" /> :  <Tag value="NO" severity="danger" />);
const utilesTemplate = (rowData) => checkTemplate(rowData.utiles);
const mochilaTemplate = (rowData) => checkTemplate(rowData.mochila);


  return (
    <div className="container mx-auto">
      <div className="md:ml-64 h-auto pt-20">
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-3xl font-extrabold text-gray-900 ">
              <i>
                <img className=" w-8 h-8 sm:w-12 sm:h-12" src={Libro} />
              </i>
              Kit Escolar
            </h2>
          </div>
          <div className="flex w-full justify-between">
           <button onClick={handleOpenList} className='p-1 px-3 w-40 font-bold text-white rounded-lg bg-[#006084] hover:bg-opacity-60'
                    
                        >
                          <span className='flex items-center gap-x-2'>
                          Envíos Totales 
                          <RxExternalLink className='text-2xl' />
                          </span>
           </button>
            <button onClick={() => dispatch(loadKitEscolar({params: "refresh"}))} className='p-1 px-5 w-max font-bold text-white rounded-lg bg-[#006084] hover:bg-opacity-60'
                    
                        >
                          <span className='flex items-center gap-x-2'>
                          
                          <IoIosRefresh className='text-2xl' />
                          </span>
           </button>
          </div>
          <TableGestionStock />   
          <TableEnvíos />

        
          <h3 className="text-xl  text-gray-700 sm:text-2xl my-5">
            Entregados (
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
                  data={beneficiosAgrupados}
                  loading={isLoading}
                  fileName="KitEscolar"
                >
                  <Column selectionMode="multiple"></Column>
                  <Column
                    field="provincia"
                    header="PROVINCIA"
                    sortable
                  ></Column>
                  <Column field="delegacion" header="DELEGACIÓN" sortable></Column>
                  <Column
                    field="seccional"
                    header="SECCIONAL"
                    sortable
                  ></Column>
                  <Column
                    field="direccion"
                    header="DIRECCIÓN"
                    sortable
                  ></Column>
                  <Column field="afiliado_name" header="AFILIADO" sortable></Column>
                  <Column
                    field="afiliado_dni"
                    header="DNI"
                    sortable
                  ></Column>
                  <Column
                    field="familiar_name"
                    header="HIJO/A"
                    sortable
                  ></Column>
                   <Column
                    field="familiar_dni"
                    header="DNI HIJO/A"
                    sortable
                  ></Column>
                    <Column
                    field="año_escolar"
                    header="AÑO ESCOLAR"
                    sortable
                  ></Column>
                    <Column
                    field={utilesTemplate}
                    header="ÚTILES"
                    
                  ></Column>
                    <Column
                    field={guardapolvoTemplate}
                    header="GUARDAPOLVO"
                    
                  ></Column>
                    <Column
                    field={mochilaTemplate}
                    header="MOCHILA"
                    
                  ></Column>
                  <Column
                    body={contentTemplate}
                    header="ESTADO"                
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
         

        </div>
      </div>
    </div>
  );
};

export default PageKitEscolar;
