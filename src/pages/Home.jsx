import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../common/Axiosconfig';
import Input from '../components/Input';
import Avatar from '../assets/img/avatar.png';
import {FiDownload} from 'react-icons/fi'

const Home = () => {
  const [dni, setDni] = useState('');
  const [affiliateData, setAffiliateData] = useState(null);
  const [err, setErr] = useState(null);
  const [beneficio, setBeneficio] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popUpseen, setPopUpseen] = useState(false);
  const [showEmpleadorPopup, setShowEmpleadorPopup] = useState(false);
  const [expandedFamiliars, setExpandedFamiliars] = useState([]);


  const navigate = useNavigate();
  
  // Función para manejar las peticiones a la API para los datos de afiliados
const handleAffiliateDataRequest = async () => {
  if (!dni) {
    setErr('Por favor, ingresa un número de DNI antes de hacer la solicitud.');
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
    navigate('/registro-afiliado')
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

  const handleSeeBenefit = async () => {
    try {
    const res = await api.get(`tasks/beneficio/${dni}`);
    
    // Almacenar los datos del beneficio otorgado
    setBeneficio(res.data);
    setShowPopup(true);
    console.log(beneficio)
     // Mostrar el popup
  } catch (error) {
    console.log(error.response.data.message);
  }
    
  }

  const handleDniChange = (e) => {
    const { name, value } = e.target;

    if (name === "dni" && !/^[0-9]*$/.test(value)) {
      setErr("Ingresa solo números en el campo DNI");
    } else {
      setErr("");
      setDni(value);
    }
  };

  const getDniImg = async () => {
    affiliateData.dni_img.forEach((dni) => {
    window.open(`https://uatre-api.onrender.com/${dni}`, '_blank');
  });
    
  }

  const handleGrantBenefit = async () => {
  try {
    const res = await api.get(`tasks/beneficio/${dni}`);
    // Almacenar los datos del beneficio otorgado
    setBeneficio(res.data);
    
     navigate(`/beneficios?dni=${dni}`);
  } catch (error) {
    console.log(error.response.data.message);
  }
  
};

useEffect(() => {
  if (!showPopup && beneficio) {
    // Si showPopup es falso y hay datos de beneficio, limpiar los datos de beneficio
    setBeneficio(null);
  }
}, [showPopup, beneficio]);

const toggleFamiliar = id => {
  setExpandedFamiliars(prevState => ({
    ...prevState,
    [id]: !prevState[id]
  }));
};



  return (
    <div className="h-screen py-36 pl-80 w-full ">
      <div className='flex flex-col justify-center'>        
        <h1 className="mt-4 text-3xl font-extrabold ">{affiliateData ? 'Perfil del Trabajador: Revisar Datos' : 'INGRESA EL NUMERO DE DNI DEL TRABAJADOR'}</h1>
        <p className='text-gray-500 font-semibold mt-4'>{affiliateData ? '' : 'Ingrese un número de DNI para comenzar.'}</p>
      </div>

 
      { affiliateData ? (
        // Mostrar los datos del afiliado
        <div className="flex">
          {/* ... Código para mostrar los datos del afiliado ... */}
           <div className="flex flex-col rounded-2xl w-[23%] mt-4 ">
         
        
         <img className='mb-[-5px]' src={Avatar}>
              </img>


            <div className='flex flex-col p-5 bg-white rounded-b-2xl'> 
            
              <p className='mt-2 text-gray-800 font-semibold'><strong>{affiliateData.name}</strong> </p>
               <p className='mt-2 text-gray-800 font-semibold'><strong>DNI:</strong> {affiliateData.dni} {affiliateData.dni_img && (
        <div>
          
         
        </div>
      )}</p>
       <p><strong>CUIT:</strong> {affiliateData.cuit}</p>
               <p><strong>Nacionalidad:</strong> {affiliateData.nacionalidad}</p>
               <p><strong>Sexo:</strong> {affiliateData.sexo}</p>
               <p><strong>Domicilio:</strong> {affiliateData.domicilio}</p>
               <p><strong>Estado Civil:</strong> {affiliateData.estado_civil}</p>
               <p><strong>Fecha de Nacimiento:</strong> {affiliateData.fecha_de_nacimiento}</p>
               <p><strong>Teléfono:</strong> {affiliateData.tel}</p>
               <p><strong>Email:</strong> {affiliateData.correo}</p>
              <button 
              className='mt-4 bg-[#0E6F4B] w-36 font-bold text-white rounded-lg p-1 hover:bg-opacity-75'
              onClick={handleGrantBenefit}>
                Otorgar Beneficio
              </button>
      </div>

        <div className='flex h-28'>
               
          <div onClick={getDniImg}  className='flex flex-col cursor-pointer justify-center items-center w-full rounded-2xl mt-5 h-[80%] bg-white'>
                
            <FiDownload className='text-5xl text-[#23A1D8]'></FiDownload>
            <p className='text-[#727272] hover:underline font-semibold'>Ver foto del DNI</p> 
           
            
          </div>
          
        </div>
    </div>

      {/* Cuadro de datos de familiares */}
  <div className="flex ml-10 justify-between rounded-lg w-[70%] p-5 mt-4 bg-white">

                <div className=''>
                <h3 className='font-bold text-3xl mb-5'>Hijos:</h3>
                  {affiliateData.familiares ? (
  <div>
    
    <ul>
      {affiliateData.familiares
        .filter(familiar => familiar.categoria === 'Hijo/a')
        .map((familiar, index) => (
          <div key={index}>
            <p
              className='p-2 bg-[#d8d8d8] font-semibold text-gray-800 relative w-80 mt-4 pl-6 cursor-pointer flex flex-row justify-between'
             
            >
               
              <span className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-[#006084]'></span>
              {familiar.name} <span onClick={() => toggleFamiliar(familiar.id)} className='text-[#006084] pr-1'>{expandedFamiliars[familiar.id] ? "Ver menos" : "Ver más"}</span>
            </p>

            {expandedFamiliars[familiar.id] && (
              <li key={index} className="w-80 p-4 mb-4">
                <p><strong>DNI:</strong></p>
                <p className='p-2 bg-gray-200 relative pl-6'>
                  <span className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-[#006084]'></span>
                  {familiar.dni}
                </p>
                <p><strong>Fecha de Nacimiento:</strong></p>
                <p className='p-2 bg-gray-200 relative pl-6'>
                  <span className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-[#006084]'></span>
                  {familiar.fecha_de_nacimiento}
                </p>
                
                {/* Agregar aquí otros campos de los familiares */}
              </li>
            )}
          </div>
        ))}
    </ul>
         <button 
              className='mt-4 bg-[#006084] font-bold text-white rounded-lg p-2 hover:bg-opacity-75'
              onClick={""}>
                + CARGAR HIJO
              </button>
  </div>
) : (
  <>
  <p className='text-gray-500'>No hay datos de familiares.</p>
     <button 
              className='mt-4 bg-[#006084] font-bold text-white rounded-lg p-2 hover:bg-opacity-75'
              onClick={""}>
                + CARGAR HIJO
              </button>
  </>

)}


              </div>

              <div className=''>
              <h3 className='font-bold text-3xl mb-5'>Datos del Conyugue:</h3>
                  {affiliateData.familiares ? (
  <div>
    
    <ul>
      {affiliateData.familiares
        .filter(familiar => familiar.categoria === 'Conyugue')
        .map((familiar, index) => (
          <div key={index}>
            <p
              className='p-2 bg-[#d8d8d8] font-semibold text-gray-800 relative w-80 mt-4 pl-6 cursor-pointer flex flex-row justify-between'
             
            >
               
              <span className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-[#006084]'></span>
              {familiar.name} <span onClick={() => toggleFamiliar(familiar.id)} className='text-[#006084] pr-1'>{expandedFamiliars[familiar.id] ? "Ver menos" : "Ver más"}</span>
            </p>

            {expandedFamiliars[familiar.id] && (
              <li key={index} className="w-80 p-4 mb-4">
                <p><strong>DNI:</strong></p>
                <p className='p-2 bg-gray-200 relative pl-6'>
                  <span className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-[#006084]'></span>
                  {familiar.dni}
                </p>
                <p><strong>Fecha de Nacimiento:</strong></p>
                <p className='p-2 bg-gray-200 relative pl-6'>
                  <span className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-[#006084]'></span>
                  {familiar.fecha_de_nacimiento}
                </p>
                <p><strong>Teléfono:</strong></p>
                <p className='p-2 bg-gray-200 relative pl-6'>
                  <span className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-[#006084]'></span>
                  {familiar.tel}
                </p>
                
                {/* Agregar aquí otros campos de los familiares */}
              </li>
            )}
          </div>
        ))}
    </ul>
    
  </div>
) : (
  <>  <p className='text-gray-500'>No hay datos de familiares.</p>
   <button 
              className='mt-4 bg-[#0E6F4B] font-bold text-white rounded-lg p-2 hover:bg-opacity-75'
              onClick={""}>
                + CARGAR CONYUGUE
              </button>
  </>

)

}

              </div>

        <div className='flex'>
              {affiliateData.datos_empleador && (
                        <div >
                                <h2 className="font-bold text-3xl mb-5">Datos del Empleador</h2>
                                {affiliateData.datos_empleador && (
                                  <div>
                                    {(() => {
                                      try {
                                        const empleador = JSON.parse(affiliateData.datos_empleador);
                                        return (
                                          <div>
                                            <p><strong>Razon Social:</strong></p>
                                            <p
                                               className='p-2 bg-gray-200 font-semibold text-gray-800 relative w-80 mt-2 pl-6'
                                            >                
                                              <span className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-[#006084]'></span>
                                              {empleador.razon_social} 
                                              
                                            </p>
                                            <p><strong>CUIT:</strong></p>
                                              <p className='p-2 bg-gray-200 relative pl-6'>
                                                <span className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-[#006084]'></span>
                                                {empleador.cuit_empleador}
                                              </p>
                                              <p><strong>Actividad:</strong></p>
                                              <p className='p-2 bg-gray-200 relative pl-6'>
                                                <span className='absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-full bg-[#006084]'></span>
                                                {empleador.actividad}
                                              </p>                                            
                                          </div>
                                        );
                                      } catch (error) {
                                        console.error('Error al analizar los datos del empleador:', error);
                                        setErr(error)
                                        return <p>{err}</p>;
                                      }
                                    })()}
                                    
                                  </div>
                      )}

                
                                    {affiliateData.recibo_sueldo && affiliateData.recibo_sueldo.length > 0 && (
                          <div>
                            <h3>Recibo de Sueldo:</h3>
                            {affiliateData.recibo_sueldo.map((recibo, index) => (
                              <div key={index}>
                                <a
                                  href={`https://uatre-api.onrender.com/${recibo}`} // Utiliza la URL de tu API
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline"
                                >
                                  Ver Recibo de Sueldo {index + 1}
                                </a>
                              </div>
                            ))}
                          
                          </div>
                        )}
                        
                          

                          </div>
                        )}
                        
                        </div>
               
                                
  </div>
                              
  

             

          
        </div>
      ) :  (
        // Mostrar campo de búsqueda si no hay datos de afiliado
        <div className="flex flex-col h-full justify-center items-center">
          <div className='flex flex-col w-[40rem] h-[14rem] items-center justify-center align-middle rounded-lg bg-white'>
          <label className='flex font-bold w-full mt-[-15px] pl-24 pb-2' htmlFor='dni'>DNI</label>
          <Input
            type="text"
            name='dni'
            value={dni}
            onChange={handleDniChange}
            className="py-4 px-4 w-[28rem] bg-[#d8d8d8]"
            placeholder="123456"
          />
          </div>
          <button
            onClick={handleAffiliateDataRequest}
             className='mt-4 bg-[#006084] w-40 font-bold text-white rounded-lg p-1 hover:bg-opacity-75'>
            Buscar Afiliado
          </button>
             { err && (
            <p className="text-red-500">{err}</p>
            ) }
       
        </div>
        
      )}
      
     
      

    </div>
  );
};

export default Home;

           
            
//             <div className="text-white">
              
              
              
              



    
  



//               {/* Agregar aquí otros campos relevantes */}



//               {/* Botón para otorgar el beneficio */}
//               <button
//                 onClick={handleGrantBenefit}
//                 className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 mt-4"
//               >
//                 Otorgar Beneficio
//               </button>
//               <button
//                 onClick={handleSeeBenefit}
//                 className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 mt-4"
//               >
//                 Ver Beneficios Otorgados
//               </button>
//               {/* Mostrar aviso de beneficio otorgado */}
//                          {beneficio && (
//   <div className="grid place-items-center bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded shadow-lg">
//     <h2 className="text-center text-black text-xl font-bold mb-2">Beneficios otorgados</h2>
//     {beneficio === null ? (
//       <p className='text-black'>No existen beneficios otorgados</p>
//     ) : (
//       beneficio.map((item) => (
//         <div key={item.id} className="mb-4">
//           <p className='text-black'><strong>Descripción:</strong> {item.tipo}</p>
//           <p className='text-black'><strong>Fecha de otorgamiento:</strong> {formatFechaOtorgamiento(item.fecha_otorgamiento)}</p>
//           {/* Resto de detalles del beneficio para cada elemento */}
//         </div>
//       ))
//     )}
//     {/* Mostrar otros detalles del beneficio */}
//     <button
//       onClick={() => {setShowPopup(false), setPopUpseen(true),
//         console.log(showPopup);}}
//       className="py-2 px-4 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//     >
//       Cerrar
//     </button>
//   </div>
// )}


//             </div>
//           </div>
//         )
//       )}
