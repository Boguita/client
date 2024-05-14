import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../common/Axiosconfig';
import {IoIosAddCircle} from 'react-icons/io';
import PlaneIcon from '../assets/img/plane.png';
import MonoIcon from '../assets/img/mono.png';
import Libro from '../assets/img/libro-abierto.png';
import Graphics from './Graphics';
import Calendar from "react-calendar";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Sample from './Calendar';

const Benefits = () => {

  const [affiliateData, setAffiliateData] = useState(null);
  const [err, setErr] = useState(null);
  const [beneficio, setBeneficio] = useState(null);
    const location = useLocation();
  const dni = new URLSearchParams(location.search).get("dni");

  const navigate = useNavigate();
  
  // Función para manejar las peticiones a la API para los datos de afiliados
const handleAffiliateDataRequest = async () => {
  if (!dni) {
    console.error('Por favor, ingresa un número de DNI antes de hacer la solicitud.');
    return;
  }

  try {
    const res = await api.get(`users/afiliados/${dni}`);
    // Almacenar los datos recibidos de la API
    console.log(res.data)
    setAffiliateData(res.data);
    setErr(null);
     // Restablecer el estado del error si la solicitud tiene éxito
  } catch (error) {
    
    setAffiliateData(null);
    console.log(error.response.data.message)
    setErr(error.response.data.message);
  }
 
};

 const formatFechaOtorgamiento = (fecha) => {
    const date = new Date(fecha);
    const formattedDate = date.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return formattedDate;
  };

    const handleDateChange = (date) => {
    setSelectedDate(date);
    // Aquí podrías realizar una solicitud a la base de datos para obtener los datos del gráfico correspondientes a la fecha seleccionada
  };



 return (
  <div className="min-h-screen pl-4 md:pl-80 bg-gray-200">
    <div className='py-8 md:py-36'>
        <div className='flex flex-col md:w-2/3'>
          <h1 className="text-black font-extrabold text-2xl md:text-3xl">Selecciona el beneficio a otorgar</h1>
          <p className='text-gray-500 font-semibold mt-4 md:mt-2'>Recuerda estar atento con la informacion <br/> proporcionada por el sistema.</p>
          
        </div>
       <div className='flex flex-col md:flex-row pt-20'>


        <div className='flex flex-col justify-center md:flex-row gap-4 md:gap-10'>
          <div className="flex flex-col rounded-lg h-80 w-full md:w-1/4 p-4 bg-white">
              <img className='mt-2 w-12 h-12' src={PlaneIcon}>
             </img>
             <h3 className='mt-4 lg:text-3xl md:text-2xl font-extrabold'>
               Luna de Miel
             </h3>
             <p className='mt-2 text-sm md:text-base text-gray-500 font-semibold'>
               Lorem ipsum dolor sit amet consectetur adipiscing elit, rhoncus per leo auctor tincidunt viverra praesent cubilia, vivamus cursus euismod justo erat tortor.
             </p>
             <button 
              onClick={() => {
                // Redirigir a la ruta correspondiente si el usuario está autenticado
                
                  navigate('/luna-de-miel', {
                    state: { dni }, // Pasamos el DNI como parámetro en el state
                  }); // Agregamos /beneficios/ al inicio de la ruta
                
                  // Si no está autenticado, redirigir al inicio de sesión
                 
              }}
             className='mt-4 bg-[#0E6F4B] w-36 font-bold text-white rounded-lg p-1 hover:bg-opacity-75'>
               VER BENEFICIO
             </button>
          </div>

          <div className="flex flex-col rounded-lg h-80 w-full md:w-1/4 p-4 bg-white">
              <img className='mt-2 w-12 h-12' src={MonoIcon}>
             </img>
             <h3 className='mt-4 text-3xl font-extrabold'>
               Kit Nacimiento
             </h3>
             <p className='mt-2 text-gray-500 font-semibold'>
               Lorem ipsum dolor sit amet consectetur adipiscing elit, rhoncus per leo auctor tincidunt viverra praesent cubilia, vivamus cursus euismod justo erat tortor.
             </p>
             <button 
              onClick={() => {
                // Redirigir a la ruta correspondiente si el usuario está autenticado
                
                  navigate('/kit-maternal', {
                    state: { dni }, // Pasamos el DNI como parámetro en el state
                  }); // Agregamos /beneficios/ al inicio de la ruta
                
                  // Si no está autenticado, redirigir al inicio de sesión
                 
              }}
             className='mt-4 bg-[#006084] w-36 font-bold text-white rounded-lg p-1 hover:bg-opacity-75'>
               VER BENEFICIO
             </button>
          </div>
          <div className="flex flex-col rounded-lg h-80 w-full md:w-1/4 p-4 bg-white">
              <img className='mt-2 w-12 h-12' src={Libro}>
             </img>
             <h3 className='mt-4 text-3xl font-extrabold'>
               Kit Escolar
             </h3>
             <p className='mt-2 text-gray-500 font-semibold'>
               Lorem ipsum dolor sit amet consectetur adipiscing elit, rhoncus per leo auctor tincidunt viverra praesent cubilia, vivamus cursus euismod justo erat tortor.
             </p>
             <button 
             onClick={() => {
                // Redirigir a la ruta correspondiente si el usuario está autenticado
                
                  navigate('/kit-escolar', {
                    state: { dni }, // Pasamos el DNI como parámetro en el state
                  }); // Agregamos /beneficios/ al inicio de la ruta
                
                  // Si no está autenticado, redirigir al inicio de sesión
                 
              }}
             
             className='mt-4 bg-[#23A1D8] w-36 font-bold text-white rounded-lg p-1 hover:bg-opacity-75'>
               VER BENEFICIO
             </button>
          </div>
          
          {/* Repeat similar code blocks for other items */}
        </div>
      </div>
    </div>
  </div>
);


  
};




export default Benefits;

// const navigate = useNavigate();
//   const { currentUser } = useContext(AuthContext);
//   const location = useLocation();
//   const dni = new URLSearchParams(location.search).get("dni");

//   const availableBenefits = [
//     { name: "Kit escolar", path: "/kit-escolar" },
//     { name: "Kit maternal", path: "/kit-maternal" },
//     { name: "Luna de Miel", path: "/luna-de-miel" },
//   ];

//   return (
//     <div className="ml-5 sm:pl-64 h-screen w-screen bg-black">
//       <div className="sm:w-[85vw] p-4">
//         {/* Título "Beneficios Disponibles" centrado */}
//         <h3 className="text-white text-center mb-4">Beneficios Disponibles</h3>

//         {/* Botones con nombres de beneficios disponibles */}
//         <div className="grid grid-cols-3 gap-4">
//           {availableBenefits.map((beneficio) => (
//             <button
//               key={beneficio.name}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               onClick={() => {
//                 // Redirigir a la ruta correspondiente si el usuario está autenticado
//                 if (currentUser?.username) {
//                   navigate(`${beneficio.path}`, {
//                     state: { dni }, // Pasamos el DNI como parámetro en el state
//                   }); // Agregamos /beneficios/ al inicio de la ruta
//                 } else {
//                   // Si no está autenticado, redirigir al inicio de sesión
//                   navigate("/login");
//                 }
//               }}
//             >
//               {beneficio.name}
//             </button>
//           ))}
//         </div>

      
//       </div>
//     </div>
// );