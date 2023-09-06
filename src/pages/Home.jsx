import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../common/Axiosconfig';
import Input from '../components/Input';
import Avatar from '../assets/img/avatar.png';
import {FiDownload} from 'react-icons/fi'
import Modal from "react-modal";
import {AiOutlineIdcard} from 'react-icons/ai'
import {RiBillLine} from 'react-icons/ri'

const Home = () => {
  const [dni, setDni] = useState('');
  const [affiliateData, setAffiliateData] = useState(null);
  const [err, setErr] = useState(null);
  const [beneficio, setBeneficio] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
   const [showButton, setShowButton] = useState(true);
   const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showEmpleadorPopup, setShowEmpleadorPopup] = useState(false);
  const [expandedFamiliars, setExpandedFamiliars] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [modalConyugueIsOpen, setModalConyugueIsOpen] = useState(false);
    const [formData, setFormData] = useState({
    id_afiliado: "",
    name: "",
    categoria: "",
    dni: "",
    tel: "1234",
    fecha_de_nacimiento: "",
    dni_img_familiar: null,
    libreta_img:null,
  });

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
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_afiliado: res.data.idafiliados,
    }));
     // Restablecer el estado del error si la solicitud tiene éxito
  } catch (error) {
    
    setAffiliateData(null);
    console.log(error.response.data.message)
    navigate('/registro-afiliado')
  }
 
};

  const handleDniImgChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      dni_img_familiar: filesArray,
    }));
    console.log(formData.dni_img_familiar);
  };

  const handleLibretaImgChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      libreta_img: filesArray,
    }));
    console.log(formData.libreta_img);
  };

  const handleChangeHijo = (e) => {
    const { name, value } = e.target;
    if (name === "dni" && !/^[0-9]*$/.test(value)) {
      setErr("Ingresa solo números en el campo DNI");
    } else {
    setErr(null)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      categoria: "Hijo/a",
    }));
  }
  };

  const handleChangeConyugue = (e) => {
    const { name, value } = e.target;
    if (name === "dni" && !/^[0-9]*$/.test(value)) {
      setErr("Ingresa solo números en el campo DNI");
    } else {
    setErr(null)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      categoria: "Conyugue",
    }));
  }
  };

  const validateFields = () => {
    setValidationErrors({}); // Limpiar cualquier error de validación previo
    const requiredFields = {
      formData: ["name", "dni", "tel", "fecha_de_nacimiento", "dni_img_familiar, libreta_img"],
    };

    const errors = {};

    Object.entries(requiredFields).forEach(([fieldGroup, fieldNames]) => {
      fieldNames.forEach((fieldName) => {
        if (formData[fieldName] === "" && fieldGroup === "formData") {
          errors[fieldName] = "*";
        }
      });
    });
    if(modalIsOpen){
    if (!formData.dni_img_familiar || formData.dni_img_familiar.length === 0) {
      errors.dni_img_familiar = "*";
    }
  } else
     if (!formData.libreta_img || formData.libreta_img.length === 0) {
      errors.libreta_img = "*";
    }
 
    return errors;

  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      setValidationErrors(errors);
      setIsLoading(false);
      return;
    }

    const res = await api.post("users/registro-familiar", formData);
    if (res.status === 200) {
      handleImageUpload();
      setModalIsOpen(false);
      setAffiliateData(
        (prevAffiliateData) => ({
          ...prevAffiliateData,
          familiares: [...prevAffiliateData.familiares, res.data],
        }),
      );
      setFormData({
      id_afiliado: "",
      name: "",
      categoria: "",
      dni: "",
      tel: "1234",
      fecha_de_nacimiento: "",
      dni_img_familiar: null,
      libreta_img:null,
    });
      setIsLoading(false);
      handleAffiliateDataRequest();
      
    }
  };


  const handleImageUpload = async () => {

    if(formData.categoria === "Hijo/a"){
    const imgFormaData = new FormData();
    imgFormaData.append("dni", formData.dni);
    formData.dni_img_familiar.forEach((dniImg) => {
      imgFormaData.append("dni_img_familiar", dniImg);
    });
    // await Promise.all(formData.dni_img.map(loadImage));
    const responseDni = await api.post(
      "/uploads/images-dni-familiar",
      imgFormaData
    );
    if(responseDni.status !== 200){
      setErr("Error al subir la imagen del DNI.")
    } else {
      handleAffiliateDataRequest();
    }
    } else {
      const imgFormaData = new FormData();
    imgFormaData.append("dni", formData.dni);
    formData.libreta_img.forEach((libretaImg) => {
      imgFormaData.append("libreta", libretaImg);
    });

    const responseLibreta = await api.post("/uploads/images-libreta",
      imgFormaData
    );
    if(responseLibreta.status !== 200){
      setErr("Error al subir la imagen de la libreta.")
    } else {
      handleAffiliateDataRequest();
    }
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

 const getLibretaImg = async () => {
  const conyugueIndex = affiliateData.familiares.findIndex(familiar => familiar.categoria === "Conyugue");

  if (conyugueIndex !== -1) {
    const libretaImgArray = affiliateData.familiares[conyugueIndex].libreta_img;
    console.log(libretaImgArray);

    if (libretaImgArray && Array.isArray(libretaImgArray)) {
      libretaImgArray.forEach((libreta) => {
        window.open(`https://uatre-api.onrender.com/${libreta}`, '_blank');
      });
    } else {
      console.log("La propiedad libreta_img no es un arreglo o es null.");
    }
  } else {
    console.log("No se encontró un conyugue en la lista de familiares.");
  }
}

 const getDniImgHijo = async (familiarId) => {
  // Busca el familiar por su ID
  const familiar = affiliateData.familiares.find((fam) => fam.id === familiarId);

  if (familiar) {
    const dniImgArray = familiar.dni_img;

    if (dniImgArray && Array.isArray(dniImgArray)) {
      dniImgArray.forEach((dni) => {
        window.open(`https://uatre-api.onrender.com/${dni}`, '_blank');
      });
    } else {
      console.log("La propiedad dni_img no es un arreglo o es null.");
    }
  } else {
    console.log("No se encontró el familiar con el ID proporcionado.");
  }
};



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

// useEffect(() => {
//   console.log(affiliateData?.familiares.length)
//   }
// , [affiliateData]
// );


   useEffect(() => {
  if (affiliateData?.familiares.length < 5) {
    setShowButton(true);
    console.log("Mostrar botón: true");
    
  } else {
    setShowButton(false);
    console.log("Mostrar botón: false");
  }
}, [affiliateData?.familiares]);


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
           <div className="flex flex-col rounded-2xl w-[25%] mt-4 ">
         
        
         <img className='mb-[-5px]' src={Avatar}>
              </img>


            <div className=' p-5 bg-white rounded-b-2xl grid gap-4'>
               <p className='mt-2 text-gray-800 font-semibold'><strong>{affiliateData.name}</strong></p>
               <div className='grid grid-cols-2'>
  <div >   

    <p><strong>DNI</strong></p>
    <p className='text-gray-500 font-semibold'>{affiliateData.dni}</p>

    <p ><strong>CUIT</strong></p>
    <p className='text-gray-500 font-semibold'> {affiliateData.cuit}</p>

    <p><strong>Nacionalidad</strong></p>
    <p className='text-gray-500 font-semibold'>{affiliateData.nacionalidad}</p>

    <p><strong>Sexo</strong></p>
    <p className='text-gray-500 font-semibold'>{affiliateData.sexo}</p>

    <p><strong>Provincia</strong></p>
    <p className='text-gray-500 font-semibold'>{affiliateData.provincia}, {affiliateData.ciudad}</p>
  </div>

  <div>
    
    <p><strong>Estado Civil</strong></p>
    <p className='text-gray-500 font-semibold'>{affiliateData.estado_civil}</p>

    <p><strong>Fecha de Nacimiento</strong></p>
    <p className='text-gray-500 font-semibold'>{affiliateData.fecha_de_nacimiento}</p>

    <p><strong>Teléfono</strong></p>
    <p className='text-gray-500 font-semibold'>{affiliateData.tel}</p>

    <p><strong>Email</strong></p>
    <p className='text-gray-500 font-semibold'>{affiliateData.correo}</p>

     <p><strong>Domicilio</strong></p>
    <p className='text-gray-500 font-semibold'>{affiliateData.domicilio}</p>

   
  </div>
  </div>
</div>

        <div className='flex h-28 gap-x-4'>       
          <div onClick={getDniImg}  className='flex flex-col cursor-pointer justify-center items-center w-[50%] rounded-2xl mt-5  bg-white'>
                
            <AiOutlineIdcard className='text-5xl text-[#23A1D8]'></AiOutlineIdcard>
            <p className='text-[#23A1D8] hover:underline font-semibold'>Ver foto del DNI</p> 
           
            
          </div>
         

         <button
          className='mt-5 bg-[#0E6F4B] w-[50%]  font-bold text-white rounded-2xl p-1 hover:bg-opacity-75'
          onClick={handleGrantBenefit}>
          OTORGAR BENEFICIO
        </button> 

              
        </div>
    </div>

      {/* Cuadro de datos de familiares */}
  <div className="flex ml-10 justify-between rounded-lg w-[70%] p-5 mt-4 bg-white">

                <div className=''>
                <h3 className='font-bold text-3xl mb-5'>Hijos:</h3>
                  {affiliateData.familiares && affiliateData.familiares.some(familiar => familiar.categoria === 'Hijo/a') ? (
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
              <li key={index} className="w-80 p-2 ">
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
                <div id={familiar.id} onClick={() => getDniImgHijo(familiar.id)} className='p-2 mt-2 flex items-center justify-center w-full pl-6'>               
                <button className='bg-[#23A1D8] font-bold text-white rounded-lg p-2 hover:bg-opacity-75' >
                  
                  VER DNI
                </button>
                </div> 
              
                
                {/* Agregar aquí otros campos de los familiares */}
              </li>
            )}
          </div>
        ))}
    </ul>
    {showButton && (
  <button 
    className='mt-4 bg-[#006084] font-bold text-white rounded-lg p-2 hover:bg-opacity-75'
    onClick={() => setModalIsOpen(true)}>
    + CARGAR HIJO
  </button>
)}
  </div>
) : (
  <>
  <p className='text-gray-500'>No hay datos de familiares.</p>
     <button 
              className='mt-4 bg-[#006084] font-bold text-white rounded-lg p-2 hover:bg-opacity-75'
              onClick={() => setModalIsOpen(true)}>
                + CARGAR HIJO
              </button>
  </>

)}


              </div>

              <div className=''>
              <h3 className='font-bold text-3xl mb-5'>Datos del Conyugue:</h3>
                  {affiliateData.familiares && affiliateData.familiares.some(familiar => familiar.categoria === 'Conyugue') ? (
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
            <div onClick={getLibretaImg}>
            <button className='mt-4 bg-[#006084] font-bold text-white rounded-lg p-2 hover:bg-opacity-75'
            
            >Ver libreta de matrimonio</button>
            </div>
          </div>
        ))}
    </ul>
    
  </div>
) : (
  <>  <p className='text-gray-500'>No hay datos de familiares.</p>
   <button 
              className='mt-4 bg-[#0E6F4B] font-bold text-white rounded-lg p-2 hover:bg-opacity-75'
              onClick={() => 
              setModalConyugueIsOpen(true)}>
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
                          <div className='flex flex-col cursor-pointer justify-center items-center rounded-2xl p-2 mt-5  bg-gray-200'>
                            <RiBillLine className='text-3xl'/>
                            {affiliateData.recibo_sueldo.map((recibo, index) => (
                              
                              <div className='flex-col flex justify-center items-center' key={index}>
                                
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
             
       
        </div>
        
      )}
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Editar Familiares"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                border: "none",
                background: "white",
                color: "black",
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                padding: "2rem",
                width: "80%",
                maxWidth: "40rem",
              },
            }}
          >
            <h2 className="text-2xl font-bold mb-4">Añadir Hijos</h2>
            {err && <p className="text-red-500">{err}</p>}
            <div className="mb-2">
              <label className="block font-bold mb-1">
                Nombre y Apellido{" "}
                <strong className="text-red-500 text-sm">
                  {validationErrors.name}
                </strong>
              </label>
              <Input
                required
                name="name"
                className="w-full"
                type="text"
                value={formData.name}
                onChange={handleChangeHijo}
              />
            </div>

            <div className="mb-2">
              <label className="block font-bold mb-1">
                DNI{" "}
                <strong className="text-red-500 text-sm">
                  {validationErrors.dni}
                </strong>
              </label>
              <Input
                required
                name="dni"
                className="w-full"
                type="text"
                value={formData.dni}
                onChange={handleChangeHijo}
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-1">
                Fecha de Nacimiento{" "}
                <strong className="text-red-500 text-sm">
                  {validationErrors.fecha_de_nacimiento}
                </strong>
              </label>
              <Input
                required
                name="fecha_de_nacimiento"
                className="w-full"
                type="date"
                value={formData.fecha_de_nacimiento}
                onChange={handleChangeHijo}
              />
            </div>

            <div className="flex flex-col justify-center items-center mt-4 rounded-xl min-h-[6rem] w-[100%] bg-gray-200 p-2">
              <p className="font-bold">Subir foto de DNI:</p>
              <p className="text-sm font-semibold text-gray-600 max-w-[80%] text-center mt-1">
                Frente y Dorso.
              </p>

              <label
                htmlFor="dni_img_familiar"
                className="cursor-pointer mt-auto mb-2"
              >
                <FiDownload className="text-5xl text-[#23A1D8]" />
              </label>

              <input
                type="file"
                name="dni_img_familiar"
                id="dni_img_familiar"
                multiple
                required
                style={{ display: "none" }}
                onChange={handleDniImgChange}
              />

              <p className="text-xs font-semibold text-gray-600 text-center">
                Click aquí para cargar o{" "}
                <strong className="text-[#006084]">elegir archivos.</strong>
                <strong className="text-red-500 text-xl">
                  {validationErrors.dni_img_familiar}
                </strong>
              </p>
              {validationErrors.dni_img_familiar && (
                <p className="text-red-500"></p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                className="mt-4 bg-red-600 w-36 font-bold text-white rounded-lg p-2 hover:bg-opacity-75"
                onClick={() => setModalIsOpen(false)}
              >
                Cerrar
              </button>
              <button
                className="mt-4 bg-[#006084] w-36 font-bold text-white rounded-lg p-2 hover:bg-opacity-75"
                onClick={handleRegister}
              >
                Confirmar
              </button>
            </div>
          </Modal>

          <Modal
            isOpen={modalConyugueIsOpen}
            onRequestClose={() => setModalConyugueIsOpen(false)}
            contentLabel="Editar Familiares"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                border: "none",
                background: "white",
                color: "black",
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                padding: "2rem",
                width: "80%",
                maxWidth: "40rem",
              },
            }}
          >
            <h2 className="text-2xl font-bold mb-4">Añadir Conyugue</h2>
            {err && <p className="text-red-500">{err}</p>}
            <div className="mb-2">
              <label className="block font-bold mb-1">
                Nombre y Apellido{" "}
                <strong className="text-red-500 text-sm">
                  {validationErrors.name}
                </strong>
              </label>
              <Input
                required
                name="name"
                className="w-full"
                type="text"
                value={formData.name}
                onChange={handleChangeConyugue}
              />
            </div>

            <div className="mb-2">
              <label className="block font-bold mb-1">
                DNI{" "}
                <strong className="text-red-500 text-sm">
                  {validationErrors.dni}
                </strong>
              </label>
              <Input
                required
                name="dni"
                className="w-full"
                type="text"
                value={formData.dni}
                onChange={handleChangeConyugue}
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-1">
                Teléfono{" "}
                <strong className="text-red-500 text-sm">
                  {validationErrors.tel}
                </strong>
              </label>
              <Input
                required
                name="tel"
                className="w-full"
                type="number"
                value={formData.tel}
                onChange={handleChangeConyugue}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-1">
                Fecha de Nacimiento{" "}
                <strong className="text-red-500 text-sm">
                  {validationErrors.fecha_de_nacimiento}
                </strong>
              </label>
              <Input
                required
                name="fecha_de_nacimiento"
                className="w-full"
                type="date"
                value={formData.fecha_de_nacimiento}
                onChange={handleChangeConyugue}
              />
            </div>


            <div className="flex flex-col justify-center items-center mt-4 rounded-xl min-h-[6rem] w-[100%] bg-gray-200 p-2">
              <p className="font-bold">Subir foto de Libreta:</p>
              <p className="text-sm font-semibold text-gray-600 max-w-[80%] text-center mt-1">
                Donde figuren los datos del afiliado y la conyugue.
              </p>

              <label
                htmlFor="libreta_img"
                className="cursor-pointer mt-auto mb-2"
              >
                <FiDownload className="text-5xl text-[#23A1D8]" />
              </label>

              <input
                type="file"
                name="libreta_img"
                id="libreta_img"
                multiple
                required
                style={{ display: "none" }}
                onChange={handleLibretaImgChange}
              />

              <p className="text-xs font-semibold text-gray-600 text-center">
                Click aquí para cargar o{" "}
                <strong className="text-[#006084]">elegir archivos.</strong>
                <strong className="text-red-500 text-xl">
                  {validationErrors.libreta_img}
                </strong>
              </p>
              {validationErrors.libreta_img && (
                <p className="text-red-500"></p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                className="mt-4 bg-red-600 w-36 font-bold text-white rounded-lg p-2 hover:bg-opacity-75"
                onClick={() => setModalConyugueIsOpen(false)}
              >
                Cerrar
              </button>
              <button
                className="mt-4 bg-[#006084] w-36 font-bold text-white rounded-lg p-2 hover:bg-opacity-75"
                onClick={handleRegister}
              >
                Confirmar
              </button>
            </div>
          </Modal>
          
      {err && <p className='text-red-500 font-bold'>{err}</p>}
     
      

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
