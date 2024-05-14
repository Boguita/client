import React, { useState } from "react";
import { AuthContext } from "../context/authContext";
import { useContext, useEffect } from "react";
import api from "../common/Axiosconfig";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const Ayuda = () => {
  const [success, setSuccess] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  // Estado para controlar qué acordeón está abierto
  const [acordeonAbierto, setAcordeonAbierto] = useState(null);

  // Función para manejar el clic en un acordeón
  const handleAcordeonClick = (index) => {
    setAcordeonAbierto(index === acordeonAbierto ? null : index);
  };

  // Datos de ejemplo, podrías obtenerlos de la API según tus necesidades
  const tutoriales = [
    { titulo: "¿Cómo registrame de aministrador?", videoUrl: "https://www.youtube.com/embed/VRU3V4kMP_g?si=mixHrprxycAKmEoK" },
    { titulo: "¿Cómo hacer el Login de administrador?", videoUrl: "https://www.youtube.com/embed/fP_JcfG-030?si=a1JL6HgqFuRs9JVU" },
    { titulo: "¿Cómo registrar un trabajador?", videoUrl: "https://www.youtube.com/embed/bcf1P92sBBs?si=SKjKUqnk6jM4YC-g" },
    { titulo: "¿Cómo registrar la gestion del beneficio de Luna de Miel?", videoUrl: "https://www.youtube.com/embed/ALzWPnuHpzM?si=ym1R20969j0p6saX" },
    { titulo: "¿Cómo registrar la gestion del beneficio de Kit de Nacimiento?", videoUrl: "https://www.youtube.com/embed/cj4W61IAhYM?si=PYOZSvx9eIKIQkTF" },
    { titulo: "¿Cómo registrar la gestion del beneficio de Kit Escolar?", videoUrl: "https://www.youtube.com/embed/aMdexgxETUg?si=QbsZqMhNafLmCUSo" },
    // Agrega más tutoriales según sea necesario
  ];

  return (
    <div className="md:ml-64 p-4 sm:p-12 sm:pt-52 max-sm:pt-36 w-screen h-full flex justify-center">
      
      <div className="max-w-6xl max-xl:max-w-3xl max-lg:max-w-lg bg-white p-8 rounded shadow w-full">
        <h2 className="text-2xl font-semibold text-[#006084] mb-4">Accede a los videos tutoriales dando click en el titulo.</h2>

        {/* Mapeo de tutoriales para crear acordeones */}
        {tutoriales.map((tutorial, index) => (
          <div key={index} className="mb-4">
             <div
                className="cursor-pointer bg-gray-200 p-4 rounded-md flex items-center justify-between"
                onClick={() => handleAcordeonClick(index)}
              >
                <h2 className="text-lg font-semibold">{tutorial.titulo}</h2>
                <IoIosArrowDown />
              </div>


            {/* Contenido del acordeón (video) */}
            {acordeonAbierto === index && (
              <div className="mt-2 flex items-center justify-center">
                <iframe width="560" height="315" src={`${tutorial.videoUrl}`} 
                title="YouTube video player"
                 frameborder="0" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>

                </iframe>
              </div>
            )}
          </div>
        ))}
        <p className="text-md text-gray-500"> ¿Aún tienes dudas? Evacuá tu consulta con nuestro <Link to={"/soporte"} className="text-[#23A1D8]">Soporte.</Link> </p>
      </div>
    </div>
  );
};

export default Ayuda;
