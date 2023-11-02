import React, { useState, useEffect } from 'react';
import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from 'recharts';
import api from '../common/Axiosconfig';
import axios from 'axios';
import { PiBackpackDuotone } from "react-icons/pi";
import { TbTools } from "react-icons/tb";
import { TbJacket } from "react-icons/tb";
import Loader from './Loader';
import Input from './Input';
import { IoCloseOutline } from 'react-icons/io5';
import Modal from 'react-modal';
import Select from 'react-select';
import '../style.css';

const COLORS = ['#006084', '#23A1D8', '#0E6F4B'];

const GraphicsStock = () => {
  const [data, setData] = useState(null); // Cambié el estado inicial a null
  const [sumasData, setSumasData] = useState(null); // Cambié el estado inicial a null
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mostrarTalles, setMostrarTalles] = useState(false);
  const [ciudades, setCiudades] = useState([]);
  const [provincias, setProvincias] = useState(null);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null); // Estado para almacenar la provincia seleccionada
  const [seccionales, setSeccionales] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSeccionales, setSelectedSeccionales] = useState([]);
  const [error, setError] = useState(null);
  const [openModalMultiple, setOpenModalMultiple] = useState(false);
  const [idSeccional, setIdSeccional] = useState(null);
    const [seccionalesFiltradas, setSeccionalesFiltradas] = useState([]);
    const [activeTab, setActiveTab] = useState('seccional');
  const [inputs, setInputs] = useState({
    provincia: "",
    ciudad: "",
    seccional: [],
  });
  const [formData, setFormData] = useState({
    id: idSeccional,
    funcion: "",
    guardapolvo: 0,
    talles:[],
    mochila: 0,
    utiles: 0,
  });



   const handleTabClick = (tab) => {
    setActiveTab(tab);
    // onTabChange(tab); // Llama a la función para cambiar el gráfico con el tipo de pestaña seleccionado
  };

  
  const handleChangeStock = (e) => {   
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

const handleChangeTalles = (selectedOptions) => {
  // Obtén un array de strings con los nombres de las columnas de talle
  const columnasTalle = selectedOptions.map(talle => talle.value);

  // Actualiza el formData con el array de columnas de talle
  setFormData({ ...formData, talles: columnasTalle });
};


useEffect(() => {
  console.log(formData);
}, [formData]);
  
  const handleSeccionalChange = (selectedOptions) => {
    setSelectedSeccionales(selectedOptions);
  };

  const handleSeccionalSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);   
      const ids = selectedSeccionales.map((seccional) => seccional.value);
      const res = await api.put(`/tasks/stock-escolar/${ids}`, formData);
       res.status === 200 && setSuccess(res.data.message);      
      setError(null);
      setIsLoading(false);
      refreshData(1);
      
           
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };
      // 
      

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const res = await api.put(`/tasks/stock-escolar/${id}`, formData);
      res.status === 200 && setSuccess(res.data.message);      
      setError(null);
      setIsLoading(false);
      refreshData(id);

      
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  const handleChange = async (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs)

    if (e.target.name === "provincia") {
      setSeccionalesFiltradas(null); 
      setIdSeccional(null);
    try {
      const res = await axios.get(
        `https://apis.datos.gob.ar/georef/api/localidades?provincia=${e.target.value}&campos=id,nombre&max=100`
      );
      setCiudades(res.data.localidades);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }
           if (e.target.name === "ciudad") {
            setIdSeccional(null);
    // Filtrar las seccionales por la ciudad seleccionada
    const ciudadInput = e.target.value;
    const filteredSeccionales = seccionales.filter((seccional) => seccional.ciudad === ciudadInput); 
    setSeccionalesFiltradas(filteredSeccionales); 
    setError(null);
    setIsLoading(false);
  }

  if (e.target.name === "seccional") {
    // Obtener el ID de la seccional seleccionada y actualizar el gráfico
    const selectedSeccionalId = parseInt(e.target.value);
    setIdSeccional(selectedSeccionalId);
  }
};
  

 const refreshData = async (id) => {
  
      try {
        const res = await api.get(`tasks/stock-escolar/${id}`);
        const apiData = res.data;

        // Ahora apiData contiene la información de seccional y stock
        setData(apiData.seccional);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        setIsLoading(false);
      }
    }
  
   useEffect(() => {
    axios.get("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre").then((res) => {
      setProvincias(res.data.provincias);
       // Almacenar las provincias en el estado
    });
    
  }, []);


   const handleAffiliateDataRequest = async () => {  
  
  try {
    setIsLoading(true);
    const res = await api.get(`/tasks/seccionales`);
    // Almacenar los datos recibidos de la API
    const seccionales = res.data;
    
    setSeccionales(seccionales);
    setSeccionalesFiltradas(seccionales);
    setError(null);
    setIsLoading(false);
     // Restablecer el estado del error si la solicitud tiene éxito
  } catch (error) {
    
    setSeccionales(null);
    console.log(error.response.data.message)
    setError(error.response.data.message);
    setIsLoading(false);
  }
   setIsLoading(false);
};

useEffect(() => {
  handleAffiliateDataRequest();
}, []); // Ejec

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`tasks/stock-escolar/${idSeccional === null ? 16 : idSeccional}`);
        const apiData = res.data;
        console.log(apiData.seccional)
        // Ahora apiData contiene la información de seccional y stock
        setData(apiData.seccional);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [idSeccional]);

  if (isLoading || !data) {
    return <div>Cargando datos...</div>;
  }

  const talle6 = parseInt(data.talle6, 10) || 0;
const talle8 = parseInt(data.talle8, 10) || 0;
const talle10 = parseInt(data.talle10, 10) || 0;
const talle12 = parseInt(data.talle12, 10) || 0;
const talle14 = parseInt(data.talle14, 10) || 0;
const talle16 = parseInt(data.talle16, 10) || 0;
const talle18 = parseInt(data.talle18, 10) || 0;

const totalTalles = talle6 + talle8 + talle10 + talle12 + talle14 + talle16 + talle18;

  const chartData = [
    { name: 'Guardapolvo', value: totalTalles },
    { name: 'Mochila', value: data.mochila },
    { name: 'Útiles', value: data.utiles },
    {name: 'Talles', value:[data.talle6, data.talle8, data.talle10, data.talle12, data.talle14, data.talle16, data.talle18]}
  ];

  const options = [
  { value: "talle6", label: "6" },
  { value: "talle8", label: "8" },
  { value: "talle10", label: "10" },
  { value: "talle12", label: "12" },
  { value: "talle14", label: "14" },
  { value: "talle16", label: "16" },
  { value: "talle18", label: "18" }
];


 const comprobarStockProvincia = async (provincia) => {
    try {
      const response = await api.get(`/tasks/stock-escolar-provincia/${provincia}`);      
      // Calcular las sumas aquí usando la respuesta de la API
      const tallesSum =
        response.data.sumas.talle6 +
        response.data.sumas.talle8 +
        response.data.sumas.talle10 +
        response.data.sumas.talle12 +
        response.data.sumas.talle14 +
        response.data.sumas.talle16 +
        response.data.sumas.talle18;
        const tallesIndividuales = [
        response.data.sumas.talle6,
        response.data.sumas.talle8,
        response.data.sumas.talle10,
        response.data.sumas.talle12,
        response.data.sumas.talle14,
        response.data.sumas.talle16,
        response.data.sumas.talle18
      ];

      setSumasData({
        mochila: response.data.sumas.mochila,
        utiles: response.data.sumas.utiles,
        talles: tallesSum,
        talles_individual: tallesIndividuales
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

 



// const sumasData = {
//     mochila: response.data.sumas.mochila,
//     utiles: response.data.sumas.utiles,
//     talles: response.data.sumas.talle6 + response.data.sumas.talle8 + 
//             response.data.sumas.talle10 + response.data.sumas.talle12 + 
//             response.data.sumas.talle14 + response.data.sumas.talle16 + 
//             response.data.sumas.talle18
//   };




  return (
    <div className="bg-white w-full rounded-lg p-4">
      <h3 className='font-semibold'>Stock disponible</h3>
         

              <div className="flex items-center mb-3 mt-1">
                 {activeTab === 'provincia' &&
                
                 <select                                    
                   
                    required
                    value={provinciaSeleccionada}
                    onChange={(e) => { setProvinciaSeleccionada(e.target.value)
                      comprobarStockProvincia(e.target.value)
                    
                    }
                  }
                           className="bg-white focus:outline-none pl-5 py-1 rounded-lg "
                  >
                    <option value="" disabled selected>Provincias</option>
                  {provincias && provincias
                      .sort((a, b) => a.nombre.localeCompare(b.nombre))
                      .map((provincia) => (
                        <option key={provincia.id} value={provincia.nombre}>
                         {provincia.nombre}
                        </option>
                      ))}

                  </select>
                 }
                {activeTab === 'seccional' &&
                <>
                 <select                                    
                    id="provincia"
                    name="provincia"
                    required
                    value={inputs.provincia}
                    onChange={handleChange}
                           className="bg-white focus:outline-none pl-5 py-1 rounded-lg "
                  >
                    <option value="" disabled selected>Provincias</option>
                  {provincias && provincias
                      .sort((a, b) => a.nombre.localeCompare(b.nombre))
                      .map((provincia) => (
                        <option key={provincia.id} value={provincia.nombre}>
                         {provincia.nombre}
                        </option>
                      ))}

                  </select>
                  
                
                   <select                                    
                    id="ciudad"
                    name="ciudad"
                    required
                    value={inputs.ciudad}
                    onChange={handleChange}
                           className="bg-white focus:outline-none pl-5 py-1 rounded-lg "
                  >
                    <option value="" disabled selected>Ciudades</option>
                  {ciudades
                      .sort((a, b) => a.nombre.localeCompare(b.nombre))
                      .map((provincia) => (
                        <option key={provincia.id} value={provincia.ciudad}>
                         {provincia.nombre}
                        </option>
                      ))}

                  </select>
                     <select
                      id="seccional"
                      name="seccional"
                      required
                      value={idSeccional} // Usa el estado idSeccional en lugar de inputs.seccional
                      onChange={handleChange}
                      className="bg-white focus:outline-none pl-5 py-1 rounded-lg"
                    >
                      <option value=""  selected>
                        Seccional
                      </option>
                      {seccionalesFiltradas &&
                        seccionalesFiltradas
                          .sort((a, b) => a.nombre.localeCompare(b.nombre))
                          .map((seccional) => (
                            <option key={seccional.idseccionales} value={seccional.idseccionales}>
                              {seccional.nombre}
                            </option>
                          ))}
                    </select>
                    </>
                  }

                   <div className='flex ml-3 justify-between w-[20%]'>         
                    {/* <button
                    className="p-1 w-32 font-bold text-white rounded-lg bg-[#006084] hover:bg-opacity-60"

                          onClick={() => {
                            if(!idSeccional) return setError('Selecciona una seccional')
                            if(!inputs.provincia) return setError('Selecciona una provincia')
                            if(!inputs.ciudad) return setError('Selecciona una ciudad')
                            setError(null)
                            setSuccess(null)
                            setOpenModal(true)
                            
                          }}
                    
                    >
                      Editar Stock
                    </button> */}
                    <button
                    className="p-1 w-32 font-bold text-white rounded-lg bg-[#006084] hover:bg-opacity-60"

                          onClick={() => {         
                            setError(null)
                            setSuccess(null)
                            setOpenModalMultiple(true)                            
                          }}
                    
                    >
                      Editar Stock
                    </button>
                    </div>
                        



                     
                     
                        
                        </div>
                         <div className="flex">
             <div
                className={`tab ${activeTab === 'seccional' ? 'active' : ''}`}
                onClick={() => handleTabClick('seccional')}
              >
                Por Seccional
              </div>
              <div
                className={`tab ${activeTab === 'provincia' ? 'active' : ''}`}
                onClick={() => handleTabClick('provincia')}
              >
                Por Provincia
              </div>
            </div>
                        
                        
     { activeTab === 'seccional' &&
      <div className="flex">
        <div className="aspect-auto w-4/6 mt-8">
          <h2>{data.provincia}, {data.ciudad}, <span className='font-bold'>{data.nombre}</span></h2>
           {error && <p className="text-red-500 font-semibold">{error}</p>}  
          <ResponsiveContainer aspect={2}>
            
            <PieChart>
              
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                fill="#82ca9d"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              
              <Tooltip />
              
            </PieChart>
            
          </ResponsiveContainer>
          
        </div>
        <div className="w-1/3">
            <ul className='flex flex-col justify-around w-full h-full'>
              <li className={`text-[${COLORS[1]}] font-bold`}>
                <PiBackpackDuotone className='inline-block mr-2'/> Mochilas: {chartData[1].value}
              </li>
              <li className={`text-[${COLORS[2]}] font-bold`}>
                <TbTools className='inline-block mr-2'/> Útiles: {chartData[2].value}
              </li>
              <li className={`text-[${COLORS[0]}] font-bold`}>
                <TbJacket className='inline-block mr-2'/> Guardapolvos: {chartData[0].value}
          <button className='text-xs pl-2' onClick={() => setMostrarTalles(!mostrarTalles)}>
        {mostrarTalles ? 'Ocultar Talles' : 'Ver Talles'}
      </button>
     {mostrarTalles && (
  <div className="absolute z-10 w-24 p-2 bg-gray-200 right-64 mt-2 rounded-lg shadow-lg">
    {chartData[3].value.map((talle, index) => (
      <div className='' key={`talle-${index}`}>
        <span className='block text-center text-xs'>
          Talle {options[index].label}: {talle}
        </span>
      </div>
    ))}
  </div>
)}



              </li>
            </ul>
          </div>
         
      </div>
}

  {!sumasData ? "" : activeTab === 'provincia' && (
        <div className="flex">
          <div className="aspect-auto w-4/6 mt-8">
            <h2 className='font-bold'>{provinciaSeleccionada}</h2>
            {error && <p className="text-red-500 font-semibold">{error}</p>}
            <ResponsiveContainer aspect={2}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Mochilas', value: sumasData.mochila },
                    { name: 'Útiles', value: sumasData.utiles },
                    { name: 'Guardapolvos', value: sumasData.talles },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#82ca9d"
                >
                  {[
                    { color: COLORS[1] },
                    { color: COLORS[2] },
                    { color: COLORS[0] },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/3">
            <ul className='flex flex-col justify-around w-full h-full'>
              <li className={`text-[${COLORS[1]}] font-bold`}>
                <PiBackpackDuotone className='inline-block mr-2'/> Mochilas: {sumasData.mochila}
              </li>
              <li className={`text-[${COLORS[2]}] font-bold`}>
                <TbTools className='inline-block mr-2'/> Útiles: {sumasData.utiles}
              </li>
              <li className={`text-[${COLORS[0]}] font-bold`}>
                <TbJacket className='inline-block mr-2'/> Guardapolvos: {sumasData.talles}
          <button className='text-xs pl-2' onClick={() => setMostrarTalles(!mostrarTalles)}>
        {mostrarTalles ? 'Ocultar Talles' : 'Ver Talles'}
      </button>
      {mostrarTalles && (
        <div className="absolute z-10 w-24 p-2 bg-gray-200 right-64 mt-2 rounded-lg shadow-lg">
          {Object.keys(sumasData.talles_individual).map((talle, index) => (
            <div className='' key={`talle-${index}`}>
              <span className='block text-center text-xs'>
                Talle {options[index].label}: {sumasData.talles_individual[talle]}
              </span>
            </div>
          ))}
        </div>
      )}


              </li>
            </ul>
          </div>
        </div>
      )}

      <Modal isOpen={openModal}
            onRequestClose={() => setOpenModal(false)}
            contentLabel="Editar Varios"
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
    <div className="max-w-xl max-xl:max-w-xl max-lg:max-w-lg p-3 rounded-2xl w-full">
      <div onClick={() => setOpenModal(false)} className="flex items-end justify-end">
      <IoCloseOutline className="cursor-pointer text-2xl"  />
      </div>
        <h1 className="text-2xl font-semibold mb-4">Editar Stock</h1>
        <h2 className="text-md text-gray-500 font-semibold mb-4">{data.provincia}, {data.ciudad}, {data.nombre}</h2>
        <form onSubmit={(e) => handleSubmit(e, data.idseccionales)}>  
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="funcion">
             Elige una función
            </label> 
        <div className="py-3 mb-3 !border-l-4 !border-[#006084] bg-gray-200">
        
                  <select
                    id="funcion"
                    name="funcion"
                    required
                    value={formData.funcion}
                    onChange={handleChangeStock}
                    className=" bg-gray-200 pl-3 text-sm font-semibold focus:text-[#808080] focus:outline-none w-full"
                  >
                    <option value="" disabled selected>Operación</option>
                
                        <option key={data.idseccionales} value={"sumar"}>
                          Sumar
                        </option>
                          <option key={data.idseccionales} value={"restar"}>
                          Restar
                        </option>
                   

                  </select>
                </div>   
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
              Guardapolvo
            </label>          
            <Input
              className="form-control py-3 w-full"
              id="guardapolvo"
              type="number"
              required
              name="guardapolvo"
              value={formData.guardapolvo}
             onChange={handleChangeStock}
              placeholder="Guardapolvo"
            />
          </div>
           <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mochila">
              Mochila
            </label>          
            <Input
              className="form-control py-3 w-full"
              id="mochila"
              type="number"
              required
              name="mochila"
              value={formData.mochila}
             onChange={handleChangeStock}
              placeholder="Mochila"
            />
          </div>

 <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="utiles">
              Útiles
            </label>          
            <Input
              className="form-control py-3 w-full"
              id="utiles"
              type="text"
              required
              name="utiles"
              value={formData.utiles}
             onChange={handleChangeStock}
              placeholder="Útiles"
            />
          </div>


        
                
                
                  {isLoading ? <Loader/> :
          <div className="flex flex-col items-center justify-center">
        {/* {success && <p className="text-green-500  font-semibold">{success}</p>} */}
        {error && <p className="text-red-500 font-semibold">{error}</p>}
        {success && <p className="text-green-500 font-semibold">{success}</p>}

          <button
                className="p-1 w-32 font-bold text-white rounded-lg bg-[#006084]"
            type="submit"
          >
            Confirmar
          </button>
          
          </div>
                  }
                 
        </form>

              
      </div>

                              </Modal>

          <Modal isOpen={openModalMultiple}
            onRequestClose={() => setOpenModalMultiple(false)}
            contentLabel="Editar Stock"
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
    <div className="max-w-xl max-xl:max-w-xl max-lg:max-w-lg p-3 rounded-2xl w-full">
      <div onClick={() => setOpenModalMultiple(false)} className="flex items-end justify-end">
      <IoCloseOutline className="cursor-pointer text-2xl"  />
      </div>
        <h1 className="text-2xl font-semibold mb-4">Editar Múltiples Stocks</h1>
        <h2 className="text-md text-gray-500 font-semibold mb-4">Selecciona varias seccionales y carga un stock en común</h2>
        <form onSubmit={(e) => handleSeccionalSubmit(e)}> 
        <div className='mb-3'>
          <select                                    
                    id="provincia"
                    name="provincia"
                    required
                    value={inputs.provincia}
                    onChange={handleChange}
                           className="bg-white focus:outline-none pl-5 py-1 rounded-lg "
                  >
                    <option value="" disabled selected>Provincias</option>
                  {provincias && provincias
                      .sort((a, b) => a.nombre.localeCompare(b.nombre))
                      .map((provincia) => (
                        <option key={provincia.id} value={provincia.nombre}>
                         {provincia.nombre}
                        </option>
                      ))}

                  </select>
                   <select                                    
                    id="ciudad"
                    name="ciudad"
                 
                    value={inputs.ciudad}
                    onChange={handleChange}
                           className="bg-white focus:outline-none pl-5 py-1 rounded-lg "
                  >
                    <option value="" disabled selected>Ciudades</option>
                  {ciudades
                      .sort((a, b) => a.nombre.localeCompare(b.nombre))
                      .map((provincia) => (
                        <option key={provincia.id} value={provincia.ciudad}>
                         {provincia.nombre}
                        </option>
                      ))}

                  </select>
                  
           <Select
    required
    value={selectedSeccionales}
    isMulti
    onChange={handleSeccionalChange}
    options={seccionales
      .filter(
        (seccional) =>
          seccional.provincia === inputs.provincia ||
          seccional.ciudad === inputs.ciudad
      )
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
      .map((seccional) => ({
        value: seccional.idseccionales,
        label: `${seccional.provincia}, ${seccional.ciudad}, ${seccional.nombre}`,
      }))
    }
  />      
          </div> 
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="funcion">
             Elige una función
            </label> 
        <div className="py-3 mb-3 !border-l-4 !border-[#006084] bg-gray-200">
        
                  <select
                    id="funcion"
                    name="funcion"
                    required
                    value={formData.funcion}
                    onChange={handleChangeStock}
                    className=" bg-gray-200 pl-3 text-sm font-semibold focus:text-[#808080] focus:outline-none w-full"
                  >
                    <option value="" disabled selected>Operación</option>
                
                        <option key={data.idseccionales} value={"sumar"}>
                          Sumar
                        </option>
                          <option key={data.idseccionales} value={"restar"}>
                          Restar
                        </option>
                   

                  </select>
                </div>   
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
             Cantidad Guardapolvo
            </label>          
            <Input
              className="form-control py-3 w-full"
              id="guardapolvo"
              type="number"
              required
              name="guardapolvo"
              value={formData.guardapolvo}
             onChange={handleChangeStock}
              placeholder="Guardapolvo"
            />
            </div>
        
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="talles">
             Talles
            </label>   
                  <Select
  required
  isMulti
  options={options}
  value={options.filter(option => formData.talles.includes(option.value))} // Filtra las opciones seleccionadas
  onChange={(selectedOptions) => handleChangeTalles(selectedOptions)}
  className="text-sm font-semibold focus:text-[#808080] focus:outline-none w-full"
/>

       
             <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mochila">
              Mochila
            </label>          
            <Input
              className="form-control py-3 w-full"
              id="mochila"
              type="number"
              required
              name="mochila"
              value={formData.mochila}
             onChange={handleChangeStock}
              placeholder="Mochila"
            />
          </div>

 <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="utiles">
              Útiles
            </label>          
            <Input
              className="form-control py-3 w-full"
              id="utiles"
              type="text"
              required
              name="utiles"
              value={formData.utiles}
             onChange={handleChangeStock}
              placeholder="Útiles"
            />
          </div>


        
                
                
                  {isLoading ? <Loader/> :
          <div className="flex flex-col items-center justify-center">
        {/* {success && <p className="text-green-500  font-semibold">{success}</p>} */}
        {error && <p className="text-red-500 font-semibold">{error}</p>}
        {success && <p className="text-green-500 font-semibold">{success}</p>}

          <button
                className="p-1 w-32 font-bold text-white rounded-lg bg-[#006084]"
            type="submit"
          >
            Confirmar
          </button>
          
          </div>
                  }
                 
        </form>

              
      </div>

                              </Modal>
    </div>
  );
};

export default GraphicsStock;
