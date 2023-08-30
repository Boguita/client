
import { useState,  useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from '../assets/img/logo.png'

import '../css/auth.css';


const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)      
      navigate("/home");
    } catch (err) {
      console.log(err)
      setError(err);
    }
    
  };
  return (
    <div className="form-bg ">
        
      
    <div className="container-login flex">
      
          <div className="flex flex-col w-[50%] h-full">
             <div className="absolute justify-start p-8">
              <img className="flex h-20 w-auto" src={Logo}/> 
            </div>

           
            <div className="flex flex-col justify-center h-full items-center">
            <h2 className="text-white font-bold text-2xl">Ingreso al Portal Delegados</h2>      
            <h2 className="text-white font-bold text-8xl">BIENVENIDO</h2>
            <p className="w-[50%] py-2 text-white font-semibold text-l"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique odit aliquid saepe quidem aliquam sed repudiandae magni nam doloribus explicabo minima pariatur debitis qui quos, vero blanditiis reiciendis quia asperiores!</p>
            </div>
          </div>
     

        <div className="row flex flex-col w-[50%] h-full justify-center items-center">         
             
              

                <div className="form-container h-[12rem]">

                  <div className="flex flex-col items-center p-8 ">
                     <h3 className="title font-extrabold text-4xl text-[#006084]">Ingresar</h3>
                     <p className="mt-4 max-w-[450px] text-[#787779] font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque repudiandae, quibusdam deserunt quidem optio dignissimos excepturi voluptate alias similique provident, totam soluta aut eum recusandae.</p>
                  </div>
                 
                    <form className="form-horizontal">
                        <div className="form-group relative">
                            <div className="absolute left-0 top-0 h-full w-1 bg-[#006084]"></div>
                            <input 
                                required
                                type="text"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                className='form-control p-2 bg-[#d8d8d8] font-semibold text-gray-800 w-80 mt-4 pl-6 pr-4'
                            />
                        </div>
                        <div className="form-group relative">
                            <div className="absolute left-0 top-0 h-full w-1 bg-[#006084]"></div>
                            <input 
                                
                                required
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                onChange={handleChange}
                                className='form-control p-2 bg-[#d8d8d8] font-semibold text-gray-800 w-80 mt-4 pl-6 pr-4'
                            />
                            
                        </div>
                        

                        <div className="flex flex-col justify-center items-center align-middle">
                          
                          <button className="btn" onClick={handleSubmit}><span>INICIAR SESIÓN</span></button>
                        </div>
                        
                        {error && <p className="flex justify-center text-[#797777] mt-2 ">{error}</p>}
                          <span className="forgot-password">
                             <Link className="hi" to="/recuperar-contraseña">He olvidado mi contraseña</Link>
                          </span>
                          <span className="">
                             <Link className="flex justify-center text-[#787779] mt-2" to="/register">¿Todavia no tienes una cuenta?<strong className="text-[#006084] font-bold ml-1 text-[15px]"> Regístrate.</strong></Link>
                          </span>
                    </form>
                </div>
            </div>
        
    </div>
</div>
  );
};

export default Login;
