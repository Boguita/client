import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../common/Axiosconfig';
import {IoIosAddCircle} from 'react-icons/io';
import Libro from '../assets/img/libro-abierto.png';
import Graphics from './Graphics';
import Calendar from "react-calendar";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Sample from './Calendar';
import TableUsers from '../components/TableUsers';
import SimplePieCharts from '../components/SimplePieCharts';
import Input from '../components/Input';
import Loader from '../components/Loader';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import TableKitEscolar from '../components/TableKitEscolar';
import GraphicsStock from '../components/GraphicsStock';
import { RxExternalLink } from 'react-icons/rx';
import TableStockEnviado from '../components/TableStockEnviado';
import ListBenefits from '../components/ListBenefits';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Modal from 'react-modal';

const KitEscolarAdmin = () => {
  const [dni, setDni] = useState('');
  const [beneficios, setBeneficios] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    const [openModalStatus, setOpenModalStatus] = useState(false);
  const [animationParent] = useAutoAnimate();
  const [err, setErr] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [stockenviado, setStockEnviado] = useState(null);

  const navigate = useNavigate();
  
  // Función para manejar las peticiones a la API para los datos de afiliados
// Función para agrupar beneficios por afiliado y familiar
const agruparBeneficios = (beneficios) => {
  return beneficios.reduce((acumulador, beneficio) => {
    const clave = generarClaveAgrupacion(beneficio);
    acumulador[clave] = beneficio;
    return acumulador;
  }, {});
};

// Función para generar una clave de agrupación única para cada afiliado y familiar
const generarClaveAgrupacion = (beneficio) => {
  return `${beneficio.afiliado_id}_${beneficio.familiar_id}`;
};


  const handleAffiliateDataRequest = async () => {
  try {
    setIsLoading(true);

    const res = await api.get(`/tasks/kit-escolar`);
    const res2 = await api.get(`/tasks/stock-enviado`);

    const stockEnviado = res2.data;
    const benefits = res.data;

    // Obtener beneficios agrupados por afiliado y familiar
    const beneficiosAgrupados = agruparBeneficios(benefits);

    benefits.forEach((beneficio) => {
      const key = generarClaveAgrupacion(beneficio);
      const beneficioExistente = beneficiosAgrupados[key];

      if (beneficioExistente) {
        // Comparar las fechas de otorgamiento y actualizar solo si es más reciente
        const fechaExistente = new Date(beneficioExistente.fecha_otorgamiento);
        const fechaNueva = new Date(beneficio.fecha_otorgamiento);

        if (fechaNueva <= fechaExistente) {
          // Actualizar solo si la fecha nueva es igual o más reciente
          beneficiosAgrupados[key] = {
            ...beneficioExistente,
            utiles: beneficioExistente.utiles || beneficio.utiles,
            mochila: beneficioExistente.mochila || beneficio.mochila,
            guardapolvo_confirm: beneficioExistente.guardapolvo_confirm || beneficio.guardapolvo_confirm,
            fecha_otorgamienton: beneficioExistente.fecha_otorgamiento || beneficio.fecha_otorgamiento,
            // Agrega aquí otros campos booleanos que necesites manejar
          };
        }
        // Si no deseas actualizar en caso de fechas iguales, usa: if (fechaNueva > fechaExistente) { ... }
      } else {
        // Agregar nuevo beneficio si no existe
        beneficiosAgrupados[key] = beneficio;
      }
    });

    // Convertir de nuevo a un array de beneficios
    const beneficiosActualizados = Object.values(beneficiosAgrupados);

    setStockEnviado(stockEnviado);
    setBeneficios(beneficiosActualizados);
    setErr(null);
  } catch (error) {
    setBeneficios(null);
    console.log(error.response.data.message);
    setErr(error.response.data.message);
  } finally {
    setIsLoading(false);
  }
};



// const handleSearch = () => {
//   if (searchKeyword.trim() === '') {
//     // Si la palabra clave de búsqueda está vacía, mostrar todos los afiliados.
//     setSearchResults(users);
//   } else {
//     // Filtrar los afiliados que coincidan con la palabra clave en nombre o DNI.
//     const filteredResults = users.filter((user) =>
//       user.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//       user.dni.includes(searchKeyword)
//     );
//     setSearchResults(filteredResults);
//   }
// };

const handleUpdateUserData = async () => {
  try {
    // Llamar a la función que obtiene los datos actualizados
    await handleAffiliateDataRequest();
     openModalWithTimeout();
    // Aquí puedes realizar otras acciones después de actualizar los datos, si es necesario.
  } catch (error) {
    console.log(error)
    // Manejar errores si es necesario
  }
};




useEffect(() => {
  handleAffiliateDataRequest();
}, []); // Ejec

// useEffect(() => {

//     handleSearch(); 
// }, [searchKeyword, users]);
  const handleListPendings = () => {
    try {
      api.get(`/tasks/stock-escolar/all/excel`, { responseType: 'blob' }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'stock-escolar.xlsx';
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          if (fileNameMatch.length === 2) {
            fileName = fileNameMatch[1];
          }
        }
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      });
    }
    catch (error) {
      console.log(error);
    }
  };

    const handleOpenList = () => {
    // Abre una nueva pestaña o ventana del navegador con la URL especificada
    window.open('/admin/kit-escolar/listado-pendientes', '_blank');
  };

  const openModalWithTimeout = () => {
    setOpenModalStatus(true);

    // Configurar un temporizador para cerrar el modal después de 3 segundos (3000 milisegundos)
    setTimeout(() => {
      setOpenModalStatus(false);
    }, 2000);
  };


  const stock = stockenviado?.sort((a, b) => b.idenviados - a.idenviados);
  const approvedUsers = beneficios?.filter(beneficio => beneficio.estado === 'Enviado');
  const rejectedUsers = beneficios?.filter(beneficio => beneficio.estado === 'Rechazado');
  const pendingUsers = beneficios?.filter(beneficio => beneficio.estado === 'Pendiente');
  const successUsers = beneficios?.filter(beneficio => beneficio.estado === 'Entregado');


        return (
            <div className="h-screen lg:pl-60 xl:pl-72 2xl:pl-80 w-screen ml-5 bg-gray-200">
              <div className='py-36'>
                <div className=' h-[90%] w-[95%]'>
                  <div className='flex flex-col justify-around'>
                       <div className="flex h-20">
                          <img className=" w-12 h-12" src={Libro}></img>
                          <div className="flex flex-col pl-4">
                            <h2 className=" text-black text-3xl font-extrabold">
                              Kit Escolar
                            </h2>
                            
                           
                          </div>
                        </div>
                    {isLoading ? <Loader/> :
                    <>
                     {/* <GraphicsStock /> */}
                     <div>
                        <h2 className='text-black font-extrabold text-2xl mb-2'>Gestión de Stock</h2>
                        <div className='flex gap-x-2 items-center mb-2'>
                        <button onClick={handleListPendings} className='p-1 px-3 w-40 font-bold text-white rounded-lg bg-[#006084] hover:bg-opacity-60'
                    
                        >
                          <span className='flex items-center'>
                          Descargar listado
                          <RxExternalLink className='text-2xl' />
                          </span>
                        </button>

                            <button onClick={handleOpenList} className='p-1 px-3 w-40 font-bold text-white rounded-lg bg-[#006084] hover:bg-opacity-60'
                    
                        >
                          <span className='flex items-center'>
                          Listado de Envíos 
                          <RxExternalLink className='text-2xl' />
                          </span>
                        </button>

                        </div>

                       
                     </div>
                     
                       <ListBenefits onUpdateData={handleUpdateUserData} />
                     
                           {/* <div ref={animationParent}>
                        <h2 className='text-black font-extrabold text-xl mt-2'>Pendientes</h2>
                        <TableKitEscolar data={pendingUsers} onUpdateUserData={handleUpdateUserData} />
                      </div> */}
                      {/* <div>
                        <h2 className='text-black font-extrabold text-xl'>Rechazados</h2>
                        <TableKitMaternal data={rejectedUsers} onUpdateUserData={handleUpdateUserData} />
                      </div> */}
               
                      <div className='flex flex-col mt-2 gap-x-8'>
                        <h2 className='text-black font-extrabold text-xl'>Envíos</h2>
                        <TableStockEnviado none={false} initialData={stock} onUpdateUserData={handleUpdateUserData} />
                      </div>

                        <div className='flex flex-col gap-x-8'>
                        <h2 className='text-black font-extrabold text-xl'>Entregados</h2>
                        <TableKitEscolar initialData={successUsers} onUpdateUserData={handleUpdateUserData} />
                      </div>
                      </>
                    }   
                    </div>
                  
              

             
                    
                  

                  

              
                </div>
              </div>

                      <Modal
  isOpen={openModalStatus}
  onRequestClose={() => setOpenModalStatus(false)}
  contentLabel="Success message"
  closeTimeoutMS={300} // Tiempo de espera para la transición de cierre en milisegundos
  style={{
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      transition: "opacity 0.3s ease-in-out", // Transición de apertura
    },
    content: {
      transition: "opacity 0.3s ease-in-out", // Transición de apertura y cierre
      border: "none",
      background: "white",
      opacity: openModalStatus ? "1" : "0", // Ajusta la opacidad en función del estado
      color: "black",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "2rem",
      width: "14%",
      maxWidth: "40rem",
    },
  }}
>
  <div className="flex-col max-w-xl items-center justify-center text-center max-xl:max-w-xl max-lg:max-w-lg p-3 rounded-2xl w-full h-full">
    <div className="flex items-center justify-center">
      <AiOutlineCheckCircle className='text-green-600 text-7xl' />
    </div>
    <p>Stock actualizado</p>
  </div>
</Modal>
            </div>
          );


      
    };


export default KitEscolarAdmin;