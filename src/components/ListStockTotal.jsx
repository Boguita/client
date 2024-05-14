//  import React, { useState, useEffect, useContext } from 'react';
// import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from 'recharts';
// import api from '../common/Axiosconfig';
// import axios from 'axios';
// import { PiBackpackDuotone } from "react-icons/pi";
// import { TbTools } from "react-icons/tb";
// import { TbJacket } from "react-icons/tb";
// import Loader from './Loader';
// import Input from './Input';
// import { IoCloseOutline } from 'react-icons/io5';
// import Modal from 'react-modal';
// import Select from 'react-select';
// import NavBar from './NavBar';
// import '../style.css';
// import Logo from '../assets/img/logo.png'
// import { AuthContext } from "../context/authContext";
// import { Link } from 'react-router-dom';
// import Avatar from './Avatar';

// const COLORS = ['#006084', '#23A1D8', '#0E6F4B'];

// const ListBenefits = () => {
//   const [data, setData] = useState(null); // Cambié el estado inicial a null
//   const [list, setList] = useState(null); // Cambié el estado inicial a null
//   const [sumasData, setSumasData] = useState(null); // Cambié el estado inicial a null
//   const [success, setSuccess] = useState(null);
//     const [productoSeleccionado, setProductoSeleccionado] = useState(""); // Estado para almacenar el producto seleccionado
//   const [filtroStock, setFiltroStock] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [mostrarTalles, setMostrarTalles] = useState(false);
//   const [busquedaPalabra, setBusquedaPalabra] = useState("");
//   const [delegaciones, setDelegaciones] = useState([]);
//   const [provincias, setProvincias] = useState(null);
//   const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null); // Estado para almacenar la provincia seleccionada
//   const [seccionales, setSeccionales] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedSeccionales, setSelectedSeccionales] = useState([]);
//   const [error, setError] = useState(null);
//   const [openModalMultiple, setOpenModalMultiple] = useState(false);
//   const [idSeccional, setIdSeccional] = useState(null);
//     const [seccionalesFiltradas, setSeccionalesFiltradas] = useState([]);
//     const [activeTab, setActiveTab] = useState('seccional');
//       const { currentUser, logout } = useContext(AuthContext);
//       const [fix, setFix] = useState(false)
//   const [inputs, setInputs] = useState({
//     provincia: "",
//     ciudad: "",
//     seccional: [],
//   });
//   const [formData, setFormData] = useState({
//     id: idSeccional,
//     funcion: "",
//     mochila: 0,
//     utiles: 0,   
//     talle6:0,
//     talle8: 0,
//     talle10: 0,
//     talle12: 0,
//     talle14: 0,
//     talle16: 0,
//     talle18: 0,   
//   });

//   // const pendingUsers = beneficios?.filter(beneficio => beneficio.estado === 'Pendiente');


// const whiteRowClass = 'bg-white';
// const grayRowClass = 'bg-gray-200';





 



//    const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     // onTabChange(tab); // Llama a la función para cambiar el gráfico con el tipo de pestaña seleccionado
//   };

  
//   const handleChangeStock = (e) => {   
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   }

// const handleChangeTalles = (selectedOptions) => {
//   // Obtén un array de strings con los nombres de las columnas de talle
//   const columnasTalle = selectedOptions.map(talle => talle.value);

//   // Actualiza el formData con el array de columnas de talle
//   setFormData({ ...formData, talles: columnasTalle });
// };


// useEffect(() => {
//   console.log(formData);
// }, [formData]);
  
//   const handleSeccionalChange = (selectedOptions) => {
//     setSelectedSeccionales(selectedOptions);
//   };

//   const handleSeccionalSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(false);
//     console.log("items", formData);
//     if(!selectedSeccionales) return setError('Selecciona una seccional')
//     const fieldsToCheck = ['mochila', 'utiles', 'talle6', 'talle8', 'talle10', 'talle12', 'talle14', 'talle16', 'talle18'];

//     if (fieldsToCheck.every(field => formData[field] === 0 || formData[field] === null || formData[field] === undefined || formData[field] === "")) {
//       setError('Debes cargar la cantidad de al menos un item para editar el stock');
//       return;
//       }    
//       try {
//       setIsLoading(true);   
//       const ids = selectedSeccionales.map((seccional) => seccional.value);
//       const res = await api.put(`/tasks/stock-escolar/${ids}`, formData);
//        res.status === 200 && setSuccess(res.data.message);      
//       setError(null);
//       setIsLoading(false);
//       refreshData();
      
           
//     } catch (error) {
//       console.log(error.response.data.message);
//       setError(error.response.data.message);
//       setIsLoading(false);
//     }
//   };
  
      
      

//   const handleSubmit = async (e, id) => {
//     e.preventDefault();
    
//     try {
//       setIsLoading(true);
//       const res = await api.put(`/tasks/stock-escolar/${id}`, formData);
//       res.status === 200 && setSuccess(res.data.message);      
//       setError(null);
//       setIsLoading(false);
//       // refreshData(id);

      
//     } catch (error) {
//       console.log(error.response.data.message);
//       setError(error.response.data.message);
//       setIsLoading(false);
//     }
//   };

//   const handleChange = async (e) => {
//     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     console.log(inputs)

//     if (e.target.name === "provincia") {
//       setProvinciaSeleccionada(e.target.value);
//       setSeccionalesFiltradas(null); 
//       setIdSeccional(null);
   
//       const delegacion = seccionales.filter((seccional) => seccional.provincia === e.target.value);
//       setDelegaciones(delegacion);
    
//   }
//            if (e.target.name === "delegacion") {
//             setIdSeccional(null);
//     // Filtrar las seccionales por la ciudad seleccionada
//     const ciudadInput = e.target.value;
//     if (seccionales && seccionales.length > 0) {
//   const filteredSeccionales = seccionales.filter((seccional) => seccional.ciudad === ciudadInput);
//   setSeccionalesFiltradas(filteredSeccionales);
// } else {
//   setSeccionalesFiltradas([]); // Establece un array vacío si no hay seccionales
// }
 
//     setError(null);
//     setIsLoading(false);
//   }

//   if (e.target.name === "seccional") {
//     // Obtener el ID de la seccional seleccionada y actualizar el gráfico
//     const selectedSeccionalId = parseInt(e.target.value);
//     setIdSeccional(selectedSeccionalId);
//   }
// };
  

//  const refreshData = async () => {
  
//       try {
//         const res = await api.get(`tasks/stock`);
//         const apiData = res.data;

//         // Ahora apiData contiene la información de seccional y stock
//         setList(apiData);
//         setIsLoading(false);
//       } catch (error) {
//         console.log(error.response.data.message);
//         setIsLoading(false);
//       }
//     }
  
//    useEffect(() => {
//     axios.get("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre").then((res) => {
//       setProvincias(res.data.provincias);
//        // Almacenar las provincias en el estado
//     });
    
//   }, []);

//    const getStock = async () => { 
//     try {
//       setIsLoading(true);
//       const res = await api.get(`/tasks/stock`);
//       const apiData = res.data;
//       // Ahora apiData contiene la información de seccional y stock
//       setList(apiData);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error.response.data.message);
//       setIsLoading(false);
//     }
//     setIsLoading(false);
//   };





//    const handleAffiliateDataRequest = async () => {  
  
//   try {
//     setIsLoading(true);
//     const res = await api.get(`/tasks/seccionales`);
//     // Almacenar los datos recibidos de la API
//     const seccionales = res.data;
    
//     setSeccionales(seccionales);
//     setSeccionalesFiltradas(seccionales);
//     setError(null);
//     setIsLoading(false);
//      // Restablecer el estado del error si la solicitud tiene éxito
//   } catch (error) {
    
//     setSeccionales(null);
//     console.log(error.response.data.message)
//     setError(error.response.data.message);
//     setIsLoading(false);
//   }
//    setIsLoading(false);
// };


// useEffect(() => {
//   handleAffiliateDataRequest();
// }, []); // Ejec

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await api.get(`tasks/stock-escolar/${idSeccional === null ? 16 : idSeccional}`);
//         const apiData = res.data;
//         console.log(apiData.seccional)
//         // Ahora apiData contiene la información de seccional y stock
//         setData(apiData.seccional);
//         setIsLoading(false);
//       } catch (error) {
//         console.log(error.response.data.message);
//         setIsLoading(false);
//       }
//       setIsLoading(false);
//     }

//     fetchData();
//     getStock();
//   }, [idSeccional]);

//   if (isLoading || !list) {
//     return <div>Cargando datos...</div>;
//   }

// // const talle6 = parseInt(data.talle6, 10) || 0;
// // const talle8 = parseInt(data.talle8, 10) || 0;
// // const talle10 = parseInt(data.talle10, 10) || 0;
// // const talle12 = parseInt(data.talle12, 10) || 0;
// // const talle14 = parseInt(data.talle14, 10) || 0;
// // const talle16 = parseInt(data.talle16, 10) || 0;
// // const talle18 = parseInt(data.talle18, 10) || 0;

// // const totalTalles = talle6 + talle8 + talle10 + talle12 + talle14 + talle16 + talle18;

//   // const chartData = [
//   //   { name: 'Guardapolvo', value: totalTalles },
//   //   { name: 'Mochila', value: data.mochila },
//   //   { name: 'Útiles', value: data.utiles },
//   //   {name: 'Talles', value:[data.talle6, data.talle8, data.talle10, data.talle12, data.talle14, data.talle16, data.talle18]}
//   // ];

//   const options = [
//   { value: "talle6", label: "6" },
//   { value: "talle8", label: "8" },
//   { value: "talle10", label: "10" },
//   { value: "talle12", label: "12" },
//   { value: "talle14", label: "14" },
//   { value: "talle16", label: "16" },
//   { value: "talle18", label: "18" }
// ];

//  const handleProductoChange = (selectedOption) => {
//     // Al seleccionar un producto en el selector, actualiza el estado productoSeleccionado
//     setProductoSeleccionado(selectedOption.value);
//   };

//   const handleStockFilterChange = () => {
//     // Cambia el estado de filtroStock al hacer clic en el botón de filtro
//     setFiltroStock(!filtroStock);
   
//   };

//   const handleBusquedaPalabraChange = (e) => {
//   // Actualiza el estado busquedaPalabra cuando el usuario escribe en el campo de búsqueda
//   setBusquedaPalabra(e.target.value);
// };

//  const comprobarStockProvincia = async (provincia) => {
//     try {
//       const response = await api.get(`/tasks/stock-escolar-provincia/${provincia}`);      
//       // Calcular las sumas aquí usando la respuesta de la API
//       const tallesSum =
//         response.data.sumas.talle6 +
//         response.data.sumas.talle8 +
//         response.data.sumas.talle10 +
//         response.data.sumas.talle12 +
//         response.data.sumas.talle14 +
//         response.data.sumas.talle16 +
//         response.data.sumas.talle18;
//         const tallesIndividuales = [
//         response.data.sumas.talle6,
//         response.data.sumas.talle8,
//         response.data.sumas.talle10,
//         response.data.sumas.talle12,
//         response.data.sumas.talle14,
//         response.data.sumas.talle16,
//         response.data.sumas.talle18
//       ];

//       setSumasData({
//         mochila: response.data.sumas.mochila,
//         utiles: response.data.sumas.utiles,
//         talles: tallesSum,
//         talles_individual: tallesIndividuales
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };


      

//  const filasFiltradasYOrdenadas = list
//   .filter((row) => (provinciaSeleccionada ? row.provincia === provinciaSeleccionada : true))
//   .filter((row) => (filtroStock ? row.mochila < 150 || row.utiles < 150 || row.talle6 < 150 || row.talle8 < 150 || row.talle10 < 150 || row.talle12 < 150 || row.talle14 < 150 || row.talle16 < 150 || row.talle18 < 150 : true))
//   .filter((row) =>
//     Object.values(row).some((value) =>
//       (value ?? '').toString().toLowerCase().includes(busquedaPalabra.toLowerCase())
//     )
//   )
//   .sort((a, b) => {
//     if(filtroStock) {
//     const sumaA = a.mochila + a.utiles + a.talle6 + a.talle8 + a.talle10 + a.talle12 + a.talle14 + a.talle16 + a.talle18;
//     const sumaB = b.mochila + b.utiles + b.talle6 + b.talle8 + b.talle10 + b.talle12 + b.talle14 + b.talle16 + b.talle18;
//     return sumaA - sumaB; // Ordenar de menor a mayor
//   }
//   });


  

 



// // const sumasData = {
// //     mochila: response.data.sumas.mochila,
// //     utiles: response.data.sumas.utiles,
// //     talles: response.data.sumas.talle6 + response.data.sumas.talle8 + 
// //             response.data.sumas.talle10 + response.data.sumas.talle12 + 
// //             response.data.sumas.talle14 + response.data.sumas.talle16 + 
// //             response.data.sumas.talle18
// //   };





//   return (
//     <div className="bg-white w-screen h-screen rounded-lg py-40">
//        <div className={`fixed top-0 left-0 w-full z-40  px-4 py-2 bg-[#006084] text-white ${fix ? 'shadow-md' : ''}`}>
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <Link to="/admin/dashboard">
//             <img src={Logo} className="h-12  mr-2" alt="Logo" />
//             </Link>
//             {/* <span className="text-lg font-semibold">Nombre de la Aplicación</span> */}
//           </div>
//           {currentUser && (
//             <div className="flex  items-center">
//               <span className="mr-2 ">{currentUser.name}</span>
//               <Avatar />
//             </div>
//           )}
//         </div>
//       </div>
//        <h2 className='font-bold text-3xl pb-4 pl-8'>Gestión de Stock</h2>
//       <h4 className='font-semibold pl-8'>Filtros</h4>
         

//               <div className="flex items-center pl-8 mb-3 mt-1">                 
     
           
//                  <select                                    
//                     id="provincia"
//                     name="provincia"
//                     required
//                     value={inputs.provincia}
//                     onChange={handleChange}
//                            className="bg-white focus:outline-none pl-5 mr-2 py-1 rounded-lg "
//                   >
//                     <option value="" disabled selected>Provincias</option>
//                     <option value="" >Todas</option>
//                   {provincias && provincias
//                       .sort((a, b) => a.nombre.localeCompare(b.nombre))
//                       .map((provincia) => (
//                         <option key={provincia.id} value={provincia.nombre}>
//                          {provincia.nombre}
//                         </option>
//                       ))}

//                   </select>
//                   <input
//                     type="text"
//                     name='busquedaPalabra'
//                     id='busquedaPalabra'
//                     placeholder="Buscar por palabra..."
//                     value={busquedaPalabra}
//                     onChange={handleBusquedaPalabraChange}
//                     className="border border-gray-300 p-1 rounded-lg mr-3"
//                   />    

                    

//                   <button
//                     onClick={handleStockFilterChange}
//                     className={`ml-3 p-1 w-32 font-bold text-white rounded-lg ${filtroStock ? 'bg-gray-300 hover:bg-gray-400 ' : 'bg-[#006084]'}`}
//                   > 
//                    {filtroStock ? 'Reestablecer' : 'Filtrar por stock bajo'}
//                   </button>           
                          
   
//                    <div className='flex ml-3 justify-between w-[20%]'>         
//                     {/* <button
//                     className="p-1 w-32 font-bold text-white rounded-lg bg-[#006084] hover:bg-opacity-60"

//                           onClick={() => {
//                             if(!idSeccional) return setError('Selecciona una seccional')
//                             if(!inputs.provincia) return setError('Selecciona una provincia')
//                             if(!inputs.ciudad) return setError('Selecciona una ciudad')
//                             setError(null)
//                             setSuccess(null)
//                             setOpenModal(true)
                            
//                           }}
                    
//                     >
//                       Editar Stock
//                     </button> */}
//                     <button
//                     className="p-1 w-32 font-bold text-white rounded-lg bg-[#006084] hover:bg-opacity-60"

//                           onClick={() => {         
//                             setError(null)
//                             setSuccess(null)
//                             setOpenModalMultiple(true)                            
//                           }}
                    
//                     >
//                       Editar Stock
//                     </button>
//                     </div>
                        



                     
                     
                        
//                         </div>
                         
                        
                        
//      { 
//       <div className="flex">
//         <div className="aspect-auto w-4/6 mt-8">
//           <h2 className='font-bold text-xl pl-8'>Stock disponible</h2>
//            {error && <p className="text-red-500 font-semibold">{error}</p>}  

//            <div  className="mt-4 bg-white min-h-[25rem] py-8 rounded-xl">
//            <table   className="w-screen table-auto divide-y-4 divide-[#006084]">
//              <thead >
//                <tr>
//                  <th className="px-2 2xl:px-6 py-3   text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                    Nº ID
//                  </th>
//                  <th className="px-2 2xl:px-6 py-3  text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                    Provincia
//                  </th>
//                  <th className="px-2 2xl:px-6 py-3  text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                    Seccional
//                  </th>
//                  <th className="px-2 2xl:px-6 py-3  text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                    Delegación
//                  </th>
//                   <th className="px-2 2xl:px-6 py-3  text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                    Dirección
//                  </th>
//                  <th className="px-2 2xl:px-6 py-3  text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                    Mochilas
//                  </th>   
//                   <th className="px-2 2xl:px-6 py-3  text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                     Útiles
//                  </th>  
//                   <th className="px-2 2xl:px-6 py-3  text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                    Talle 6
//                  </th>  
//                   <th className="px-2 2xl:px-6 py-3  text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                    Talle 8
//                  </th> 
//                   <th className="px-2 2xl:px-6 py-3  text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                    Talle 10
//                  </th> 
//                   <th className="px-2 2xl:px-6 py-3  text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                    Talle 12
//                  </th> 
//                   <th className="px-2 2xl:px-6 py-3  text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                    Talle 14
//                  </th> 
//                   <th className="px-2 2xl:px-6 py-3  text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                    Talle 16
//                  </th> 
//                   <th className="px-2 2xl:px-6 py-3  text-left text-xs leading-4 font-extrabold text-black uppercase tracking-wider">
//                    Talle 18
//                  </th>          

//                </tr>
//              </thead>
            
//              <tbody >
           
//           {filasFiltradasYOrdenadas.map((row, index) => {          
           
            
//               return(
//                 <tr  key={index} className={`text-gray-600 text-sm font-semibold ${index % 2 === 0 ? grayRowClass : whiteRowClass }`}>
                 
                    
//                   <td className="px-6 py-3 capitalize text-[#006084] whitespace-no-wrap">{row.idStock}</td>
//                                <td className="px-6 text-[#006084] py-3 whitespace-no-wrap">{row.provincia}</td>
//                               <td className="px-6 py-3 whitespace-no-wrap">{row.seccional}</td>
//                                <td className="px-6 py-3 whitespace-no-wrap">{row.delegacion}</td>
//                                 <td className="px-6 py-3 whitespace-no-wrap">{row.direccion}</td>
//                                <td className={`px-2 2xl:px-6 py-3 whitespace-no-wrap`}><span className={`bg-opacity-30 rounded-lg px-2 p-1 ${row.mochila < 150 ? 'bg-red-400 text-red-500' : ''}`}>{row.mochila}</span></td>
//                                 <td className={`px-2 2xl:px-6 capitalize py-3 whitespace-no-wrap`}><span className={`bg-opacity-30 rounded-lg px-2 p-1 ${row.utiles < 150 ? 'bg-red-400 text-red-500' : ''}`}>{row.utiles}</span></td>
//                   <td className={`px-2 2xl:px-6 capitalize py-3 whitespace-no-wrap`}>
//                       <span className={`bg-opacity-30 rounded-lg px-2 p-1 ${row.talle6 < 150 ? 'bg-red-400 text-red-500' : ''}`}>
//                         {row.talle6}
//                       </span>
//                     </td>

//                     <td className={`px-2 2xl:px-6 capitalize py-3 whitespace-no-wrap`}>
//                       <span className={`bg-opacity-30 rounded-lg px-2 p-1 ${row.talle8 < 150 ? 'bg-red-400 text-red-500' : ''}`}>
//                         {row.talle8}
//                       </span>
//                     </td>

//                     <td className={`px-2 2xl:px-6 capitalize py-3 whitespace-no-wrap`}>
//                       <span className={`bg-opacity-30 rounded-lg px-2 p-1 ${row.talle10 < 150 ? 'bg-red-400 text-red-500' : ''}`}>
//                         {row.talle10}
//                       </span>
//                     </td>

//                     <td className={`px-2 2xl:px-6 capitalize py-3 whitespace-no-wrap`}>
//                       <span className={`bg-opacity-30 rounded-lg px-2 p-1 ${row.talle12 < 150 ? 'bg-red-400 text-red-500' : ''}`}>
//                         {row.talle12}
//                       </span>
//                     </td>

//                     <td className={`px-2 2xl:px-6 capitalize py-3 whitespace-no-wrap`}>
//                       <span className={`bg-opacity-30 rounded-lg px-2 p-1 ${row.talle14 < 150 ? 'bg-red-400 text-red-500' : ''}`}>
//                         {row.talle14}
//                       </span>
//                     </td>

//                     <td className={`px-2 2xl:px-6 capitalize py-3 whitespace-no-wrap`}>
//                       <span className={`bg-opacity-30 rounded-lg px-2 p-1 ${row.talle16 < 150 ? 'bg-red-400 text-red-500' : ''}`}>
//                         {row.talle16}
//                       </span>
//                     </td>

//                     <td className={`px-2 2xl:px-6 capitalize py-3 whitespace-no-wrap`}>
//                       <span className={`bg-opacity-30 rounded-lg px-2 p-1 ${row.talle18 < 150 ? 'bg-red-400 text-red-500' : ''}`}>
//                         {row.talle18}
//                       </span>
//                     </td>
                                    
                  
      
                
//                 </tr>
//               )
//               })}
//             </tbody>
            
//           </table>
       
//         </div>
          
          
//         </div>


        
//      {/* {(
//   <div className="absolute z-10 w-24 p-2 bg-gray-200 right-64 mt-2 rounded-lg shadow-lg">
//     {chartData[3].value.map((talle, index) => (
//       <div className='' key={`talle-${index}`}>
//         <span className='block text-center text-xs'>
//           Talle {options[index].label}: {talle}
//         </span>
//       </div>
//     ))}
//   </div>
// )} */}
     
//       </div>
// }

      

//           <Modal isOpen={openModalMultiple}
//             onRequestClose={() => setOpenModalMultiple(false)}
//             contentLabel="Editar Stock"
//             style={{
//               overlay: {
//                 backgroundColor: "rgba(0, 0, 0, 0.5)",
//               },
//               content: {
//                 border: "none",
//                 background: "white",
//                 color: "black",
//                 top: "50%",
//                 left: "50%",
//                 right: "auto",
//                 bottom: "auto",
//                 marginRight: "-50%",
//                 transform: "translate(-50%, -50%)",
//                 padding: "2rem",
//                 width: "80%",
//                 maxWidth: "40rem",
//               },
//             }}
//           >
//     <div className="max-w-xl max-xl:max-w-xl max-lg:max-w-lg p-3 rounded-2xl w-full">
//       <div onClick={() => setOpenModalMultiple(false)} className="flex items-end justify-end">
//       <IoCloseOutline className="cursor-pointer text-2xl"  />
//       </div>
//         <h1 className="text-2xl font-semibold mb-4">Editar Stock</h1>
//         <h2 className="text-md text-gray-500 font-semibold mb-4">Selecciona varias seccionales y carga un stock en común</h2>
//         <form onSubmit={(e) => handleSeccionalSubmit(e)}> 
//         <div className='mb-3'>
//           <select                                    
//                     id="provincia"
//                     name="provincia"
//                     required
//                     value={inputs.provincia}
//                     onChange={handleChange}
//                            className="bg-white focus:outline-none pl-5 py-1 rounded-lg "
//                   >
//                     <option value="" disabled selected>Provincias</option>
//                   {provincias && provincias
//                       .sort((a, b) => a.nombre.localeCompare(b.nombre))
//                       .map((provincia) => (
//                         <option key={provincia.id} value={provincia.nombre}>
//                          {provincia.nombre}
//                         </option>
//                       ))}

//                   </select>
//                    <select                                    
//                     id="delegacion"
//                     name="delegacion"
//                     value={inputs.delegacion}
//                     onChange={handleChange}
//                            className="bg-white focus:outline-none pl-5 py-1 rounded-lg "
//                   >
//                     <option value="" disabled selected>Delegaciones</option>
//                   {delegaciones
//                       .sort((a, b) => a.nombre.localeCompare(b.nombre))
//                       .map((provincia) => (
//                         <option key={provincia.id} value={provincia.delegacion}>
//                          {provincia.delegacion}
//                         </option>
//                       ))}

//                   </select>
                  
//            <Select
//     required
//     value={selectedSeccionales}
//     isMulti
//     onChange={handleSeccionalChange}
//     options={seccionales
//       .filter(
//         (seccional) =>
//            seccional.delegacion === inputs.delegacion 
//            || seccional.provincia === inputs.provincia
          
//       )
//       .sort((a, b) => a.nombre.localeCompare(b.nombre))
//       .map((seccional) => ({
//         value: seccional.idseccionales,
//         label: `${seccional.provincia}, ${seccional.delegacion}, ${seccional.nombre}`,
//       }))
//     }
//   />      
//           </div> 
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="funcion">
//              Elige una función
//             </label> 
//         <div className="py-3 mb-3 !border-l-4 !border-[#006084] bg-gray-200">
        
//                   <select
//                     id="funcion"
//                     name="funcion"
//                     required
//                     value={formData.funcion}
//                     onChange={handleChangeStock}
//                     className=" bg-gray-200 pl-3 text-sm font-semibold focus:text-[#808080] focus:outline-none w-full"
//                   >
//                     <option value="" disabled selected>Operación</option>
                
//                         <option  value={"sumar"}>
//                           Sumar
//                         </option>
//                           <option  value={"restar"}>
//                           Restar
//                         </option>
                   

//                   </select>
//                 </div>   
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
//              Guardapolvo Talles
//             </label> 
//           <div className="flex gap-x-4 mb-3">            
//            <div className='flex-col '>
//            <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
//              6
//             </label> 
//             <Input 
//               className="form-control py-3 w-16"
//               id="talle6"
//               type="number"
//               required
//               name="talle6"
//               value={formData.talle6}
//               onChange={handleChangeStock}
  
//             />
//             </div>

//              <div className='flex-col '>
//            <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
//              8
//             </label> 
//             <Input 
//               className="form-control py-3 w-16"
//               id="talle8"
//               type="number"
//               required
//               name="talle8"
//               value={formData.talle8}
//               onChange={handleChangeStock}
  
//             />
//             </div>

//              <div className='flex-col '>
//            <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
//              10
//             </label> 
//             <Input 
//               className="form-control py-3 w-16"
//               id="talle10"
//               type="number"
//               required
//               name="talle10"
//               value={formData.talle10}
//               onChange={handleChangeStock}
  
//             />
//             </div>

//              <div className='flex-col '>
//            <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
//              12
//             </label> 
//             <Input 
//               className="form-control py-3 w-16"
//               id="talle12"
//               type="number"
//               required
//               name="talle12"
//               value={formData.talle12}
//               onChange={handleChangeStock}
  
//             />
//             </div>

//              <div className='flex-col '>
//            <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
//              14
//             </label> 
//             <Input 
//               className="form-control py-3 w-16"
//               id="talle14"
//               type="number"
//               required
//               name="talle14"
//               value={formData.talle14}
//               onChange={handleChangeStock}
  
//             />
//             </div>

//              <div className='flex-col '>
//            <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
//              16
//             </label> 
//             <Input 
//               className="form-control py-3 w-16"
//               id="talle16"
//               type="number"
//               required
//               name="talle16"
//               value={formData.talle16}
//               onChange={handleChangeStock}
  
//             />
//             </div>

//              <div className='flex-col '>
//            <label className="block text-center text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
//              18
//             </label> 
//             <Input 
//               className="form-control py-3 w-16"
//               id="talle18"
//               type="number"
//               required
//               name="talle18"
//               value={formData.talle18}
//               onChange={handleChangeStock}
  
//             />
//             </div>        
                     
  
//             </div>
        
//             {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="talles">
//              Talles
//             </label>   
//                   <Select
//   required
//   isMulti
//   options={options}
//   value={options.filter(option => formData.talles.includes(option.value))} // Filtra las opciones seleccionadas
//   onChange={(selectedOptions) => handleChangeTalles(selectedOptions)}
//   className="text-sm font-semibold focus:text-[#808080] focus:outline-none w-full"
// /> */}

       
//              <div className="mb-3">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mochila">
//               Mochila
//             </label>          
//             <Input
//               className="form-control py-3 w-full"
//               id="mochila"
//               type="number"
//               required
//               name="mochila"
//               value={formData.mochila}
//              onChange={handleChangeStock}
//               placeholder="Mochila"
//             />
//           </div>

//  <div className="mb-3">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="utiles">
//               Útiles
//             </label>          
//             <Input
//               className="form-control py-3 w-full"
//               id="utiles"
//               type="text"
//               required
//               name="utiles"
//               value={formData.utiles}
//              onChange={handleChangeStock}
//               placeholder="Útiles"
//             />
//           </div>


        
                
                
//                   {isLoading ? <Loader/> :
//           <div className="flex flex-col items-center justify-center">
//         {/* {success && <p className="text-green-500  font-semibold">{success}</p>} */}
//         {error && <p className="text-red-500 font-semibold">{error}</p>}
//         {success && <p className="text-green-500 font-semibold">{success}</p>}

//           <button
//                 className="p-1 w-32 font-bold text-white rounded-lg bg-[#006084]"
//             type="submit"
//           >
//             Confirmar
//           </button>
          
//           </div>
//                   }
                 
//         </form>

              
//       </div>

//                               </Modal>
//     </div>
//   );
// };

// export default ListBenefits;
 
//  <h3 className='font-extrabold text-2xl mb-2 text-[#23A1D8]'>Stock general</h3>
//                           <table className='w-full'>

//                             <thead>
//                               <tr className='text-left'>
//                                 <th className='font-bold text-xl'>Items enviados</th>
//                                 <th className='font-bold text-xl'>Cantidad enviada</th>
//                               </tr>
//                             </thead>

//                             <tbody>

//                               <tr className='border-b-2 border-gray-200'>
//                                 <td className='text-xl'>Mochilas enviadas</td>
//                                 <td className='text-xl'>50</td>
//                               </tr>

//                               <tr className='border-b-2 border-gray-200'>
//                                 <td className='text-xl'>Útiles enviados</td>
//                                 <td className='text-xl'>50</td>

//                               </tr>

//                               <tr className='border-b-2 border-gray-200'>
//                                 <td className='text-xl'>Guardapolvos enviados</td>
//                                 <td className='text-xl'>50</td>

//                               </tr>
//                               </tbody>

                               

//                               <thead>
//                               <tr className='text-left'>
//                                 <th className='font-bold text-xl'>Items disponibles</th>
//                                 <th className='font-bold text-xl'>Cantidad disponible</th>
//                               </tr>
//                             </thead>
                            
//                             <tbody>

//                               <tr className='border-b-2 border-gray-200'>
//                                 <td className='text-xl'>Mochilas disponibles</td>
//                                 <td className='text-xl'>50</td>

//                               </tr>

//                               <tr className='border-b-2 border-gray-200'>

//                                 <td className='text-xl'>Útiles disponibles</td>
//                                 <td className='text-xl'>50</td>

//                               </tr>

//                               <tr className='border-b-2 border-gray-200'>
//                                 <td className='text-xl'>Guardapolvos disponibles</td>
//                                 <td className='text-xl'>50</td>

//                               </tr>

//                            </tbody>

//                           </table>