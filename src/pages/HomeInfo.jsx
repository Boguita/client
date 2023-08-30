import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../common/Axiosconfig';
import Input from '../components/Input';
import Avatar from '../assets/img/avatar.png';
import {FiDownload} from 'react-icons/fi'
import Avion from '../assets/img/plane.png'
import Mono from '../assets/img/mono.png'
import Libro from '../assets/img/libro-abierto.png'

const HomeInfo = () => {
  const navigate = useNavigate();

  return (
  <div className="h-screen py-36 pl-80 w-full">
    <div className="flex flex-col justify-center space-y-7">
    <h2 className="text-black font-bold text-4xl">DOCUMENTACIÓN NECESARIA PARA SOLICITAR
UN BENEFICIO:</h2>
    <h3 className="text-gray-500 font-bold text-2xl">PARA PODER ENTREGAR UN BENEFICIO EN NECESARIO PRESENTAR
FISICAMENTE LA SIGUIENTE DOCUMENTACION</h3>
<h3 className="text-gray-500 font-bold text-2xl">EN TODOS LOS CASOS:
</h3>
    <ul className="text-gray-400 font-semibold text-2xl">
      <li>- El Beneficio solo puede ser solicitado por un trabajador rural;</li>
      <li>- El trabajador debe presentar su DNI fisicamente;</li>
      <li>- El trabajador debe presentar su recibo de sueldo fisicamente;</li>
      <li>- El trabajador debera firmar la DDJ delante del arministrador;</li>  
   </ul>
  
  <div className='flex'>
   <img className='h-10 pr-4' src={Avion}></img>
   <h3 className="text-gray-500 font-bold text-2xl">LUNA DE MIEL:
  </h3>
   </div>
    <ul className="text-gray-400 font-semibold text-2xl">
      <li>- Libreta de matrimonio física;</li>
      <li>- DNI físico del conyugue;</li>
   </ul>

  <div className='flex'>
   <img className='h-10 pr-4' src={Mono}></img>
   <h3 className="text-gray-500 font-bold text-2xl">KIT DE NACIMIENTO:
  </h3>
   </div>
    <ul className="text-gray-400 font-semibold text-2xl">
      <li>- DNI físico de la madre;</li>
      <li>- Certificado médico fÍsico con indicación de tiempo de gestación;</li>
   </ul>

  <div className='flex'>
   <img className='h-10 pr-4' src={Libro}></img>
   <h3 className="text-gray-500 font-bold text-2xl">KIT ESCOLAR:
  </h3>
   </div>
    <ul className="text-gray-400 font-semibold text-2xl">
      <li>- DNI físcio de cada hijo;</li>
   </ul>

    </div>
    <div className='flex px-20 justify-end w-full'>
    <button 
              onClick={() => {
                // Redirigir a la ruta correspondiente si el usuario está autenticado
                
                  navigate('/home'); // Agregamos /beneficios/ al inicio de la ruta
                
                  
                 
              }}
             className='mt-4 bg-[#006084] w-40 font-bold text-white rounded-lg p-1 hover:bg-opacity-75'>
               COMENZAR
             </button>
    </div>
  </div>
  )
}

export default HomeInfo;