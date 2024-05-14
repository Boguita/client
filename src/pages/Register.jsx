import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from '../assets/img/logo.png'
import Input from "../components/Input";
import BgRegister from '../assets/img/bg-register.jpg'
import api from "../common/Axiosconfig";
import {BsCheck2Circle} from 'react-icons/bs'

const Register = () => {
  const [inputs, setInputs] = useState({
    nombre: "",
    nacionalidad: "",
    sexo: "",
    dni: "",
    cuit: "",
    provincia: "",
    ciudad: "",
    domicilio: "",
    tel: "",
    email: "",
    password: "",
    repeat_password: "",
     // Agregar el estado para la provincia seleccionada
  });
  const [err, setError] = useState(null);
  const [provincias, setProvincias] = useState([]); // Estado para almacenar las provincias
  const [ciudades, setCiudades] = useState([]);
  const [paises, setPaises] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs)

    if (e.target.name === "provincia") {
    try {
      const res = await axios.get(
        `https://apis.datos.gob.ar/georef/api/localidades?provincia=${e.target.value}&campos=id,nombre&max=100`
      );
      setCiudades(res.data.localidades);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }
  };

  useEffect(() => {
    axios.get("https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre").then((res) => {
      setProvincias(res.data.provincias);
       // Almacenar las provincias en el estado
    });
    axios.get("https://restcountries.com/v3.1/all?fields=name").then((res) => {
      const commonNames = res.data.map((country) => country.name.common);
      setPaises(commonNames);
       // Almacenar las provincias en el estado
    }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", inputs);
      if(res.status === 200)
      setCurrentStep(currentStep +1);
    setError(null)
      // navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen" style={{ backgroundImage:`url(${BgRegister})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(235, 235, 235, 0.7), rgba(235, 235, 235, 0.7))' }}>
        <div className="p-5 bg-[#006084]">
          <div onClick={()=> {navigate("/login")}} className="logo-register cursor-pointer">
                <img className="w-1/6" src={Logo} alt="LOGO UATRE"></img>
              </div>

        </div>
        <div className="flex justify-center pt-4 w-full ">
          <div className="w-[65%]  h-full rounded-3xl bg-white">
            <div className="form-container ">
              { currentStep === 1 && (
                <>
              <div className="flex flex-col justify-center items-center">

              <h3 className="pb-4 text-[#006084] text-4xl font-extrabold">Registro de Administrador</h3>
              <p className="pb-6 text-base w-2/3 font-semibold text-gray-500">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
enim ad minim veniam, quis nos</p>
              </div>
              <form className="grid grid-cols-2 gap-x-8">
                <div className="">
                  <Input
                    required
                    type="text"
                    placeholder="Nombre y Apellido"
                    name="nombre"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="">
                  <Input
                    required
                    type="text"
                    placeholder="DNI"
                    name="dni"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                 <div className="">
                  <Input
                    required
                    type="text"
                    placeholder="CUIT/CUIL/CDI"
                    name="cuit"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                 
                <div className="py-3 mb-6 !border-l-4 !border-[#006084] bg-[#F0F0F0]">
                  <select
                    id="nacionalidad"
                    name="nacionalidad"
                   
                    value={inputs.nacionalidad}
                    onChange={handleChange}
                    className=" bg-[#F0F0F0] pl-3 text-sm font-semibold focus:text-[#808080] focus:outline-none w-full"
                  >
                    <option value="" disabled selected>Nacionalidad</option>
                    {paises.map((pais, index) => (
                      <option key={index} value={pais}>
                        {pais}
                      </option>
                    ))}
                  </select>
                </div>

                 <div className="py-3 mb-6 !border-l-4 !border-[#006084] bg-[#F0F0F0]">
                  <select
                    id="sexo"
                    name="sexo"
                    required
                    value={inputs.sexo}
                    onChange={handleChange}
                    className=" bg-[#F0F0F0] pl-3 text-sm font-semibold   focus:outline-none w-full"
                  >
                    <option value="" disabled selected>Sexo</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                    
                  </select>
                </div>

                {/* <div className="">
                  <Input
                    required
                    type="date"
                    placeholder="Fecha de Nacimiento"
                    name="username"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div> */}


                 

                
                
                               
                <div className="py-3 mb-6 !border-l-4 !border-[#006084] bg-[#F0F0F0]">
                  <select
                    id="provincia"
                    name="provincia"
                    required
                    value={inputs.provincia}
                    onChange={handleChange}
                    className=" bg-[#F0F0F0] pl-3 text-sm font-semibold focus:text-[#808080] focus:outline-none w-full"
                  >
                    <option value="" disabled selected>Provincia</option>
                    {provincias.map((provincia) => (
                      <option key={provincia.id} value={provincia.nombre}>
                        {provincia.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="py-3 mb-6 !border-l-4 !border-[#006084] bg-[#F0F0F0]">
                    <select
                      id="ciudad"
                      name="ciudad"
                      value={inputs.ciudad}
                      onChange={handleChange}
                      className=" bg-[#F0F0F0] pl-3 text-sm font-semibold focus:text-[#808080] focus:outline-none w-full"
                    >
                      <option value="" disabled selected>
                        Ciudad
                      </option>
                      {ciudades.map((ciudad) => (
                        <option key={ciudad.id} value={ciudad.nombre}>
                          {ciudad.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                     <div className="">
                  <Input
                    required
                    type="text"
                    placeholder="Domicilio"
                    name="domicilio"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="">
                  <Input
                    required
                    type="text"
                    placeholder="Teléfono"
                    name="tel"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <Input
                    className="form-control"
                    required
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <Input
                    className="form-control"
                    required
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                 <div className="form-group">
                  <Input
                    className="form-control"
                    required
                    type="password"
                    placeholder="Repetir Contraseña"
                    name="repeat_password"
                    onChange={handleChange}
                  />
                </div>

                
              </form>
              <div className="justify-center items-center flex flex-col">
              <button className="btn  w-1/3" onClick={handleSubmit}><span>REGISTRARME</span></button>
                {err && <p className="text-red-500 pt-1">{err}</p>}
                </div>
                </>
               )}

               {currentStep === 2 && (
                 <>
                 <div className="flex flex-col h-[40rem] justify-center items-center space-y-4">
                  <BsCheck2Circle className="text-[8rem] text-[#006084]"/>
                  <p className="font-extrabold text-3xl text-[#006084]">Gracias por registrarte.</p>
                  <p className="font-bold text-xl text-gray-500">Muy pronto confirmaremos tu usuario por mail.</p>

                  </div>
                  <div className="justify-center items-center flex">
              <button className="btn  w-1/3" onClick={() => navigate('/login')}><span>VOLVER</span></button>
                {err && <p>{err}</p>}
                </div>
                  </>
                  )
                  }
            </div>
            
          </div>
        </div>
      </div>
              
      <footer className="flex justify-center items-center bg-[#E5E5E5] w-full h-20">
        <div className="flex">
          <p className="text-[#006084] text-sm font-semibold">© 2023 UATRE - Unión Argentina de Trabajadores Rurales y Estibadores</p>
          </div>
      </footer>
    </div>
  );
};

export default Register;


//     <div className="auth">
//       <h1>Register</h1>
//       <form>
//         <input
//           required
//           type="text"
//           placeholder="username"
//           name="username"
//           onChange={handleChange}
//         />
//         <input
//           required
//           type="email"
//           placeholder="email"
//           name="email"
//           onChange={handleChange}
//         />
//         <input
//           required
//           type="password"
//           placeholder="password"
//           name="password"
//           onChange={handleChange}
//         />
//         <button onClick={handleSubmit}>Register</button>
//         {err && <p>{err}</p>}
//         <span>
//           Do you have an account? <Link to="/login">Login</Link>
//         </span>
//       </form>
//     </div>
//   );
// };
