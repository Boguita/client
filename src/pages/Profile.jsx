import { useContext, useEffect, useState } from "react"
import api from "../common/Axiosconfig"
import Avatar from "../assets/img/avatar.png"
import { AuthContext } from "../context/authContext"
import { FiDownload } from "react-icons/fi"
import Input from "../components/Input"



export const Profile = () => {
    const [avatar, setAvatar] = useState("")
    const { currentUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
     const [userData, setUserData] = useState({
    email: "",
    domicilio: "",
    seccional: "",
    tel: "",
  });

  useEffect(() => {
  // Solo realiza la consulta si hay un usuario autenticado
  if (currentUser?.id) {
    api.get(`/users/users/${currentUser.id}`).then((res) => {
      // Verifica si la consulta devuelve los datos correctamente
      if (res.data && res.data.length > 0) {
        // Desestructurar los datos de la respuesta
        const { email, domicilio, seccional, tel } = res.data[0];
        // Actualiza el estado con los datos del usuario, utilizando el operador de fusión nula para asignar un valor predeterminado si un campo viene vacío
        setUserData({
          email: email ?? "",
          domicilio: domicilio ?? "",
          seccional: seccional ?? "",
          tel: tel ?? "",
        });
      } else {
        // Si los datos vienen vacíos desde la base de datos, inicializa el estado con valores vacíos
        setUserData({
          correo: "",
          domicilio: "",
          seccional: "",
          tel: "",
        });
      }
    });
  }
}, [currentUser?.id]);
  
  const handleChangue = (e) => {
    if (isEditing) {
      const { name, value } = e.target;
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };

const handleSave = () => {
    api
      .post(`/users/users/update/${currentUser.id}`, userData)
      .then((res) => {
        if (res.status === 200) {
          // Desactiva el modo edición
          setIsEditing(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


const handleEdit = () => {
  setIsEditing(true);
};


   
   


  return (
    <div className="flex sm:pl-80 pt-40 w-screen h-screen  ">
      
      <h2 className="text-3xl font-bold text-gray-800">Perfil</h2>
      
      <div className="flex justify-around">
      
            <div className="flex flex-col rounded-2xl w-[23%] mt-4 ">
         
        
         <img className='mb-[-5px]' src={Avatar}>
              </img>


            <div className='flex flex-col p-5 bg-white rounded-b-2xl'> 
            
              <p className='mt-2 text-gray-800 font-semibold'><strong>{userData.name}</strong> </p>
               <p className='mt-2 text-gray-800 font-semibold'><strong>DNI:</strong> {userData.dni} {userData.dni_img && (
        <div>
          
         
        </div>
      )}</p>
       
      </div>

        <div className='flex h-28'>
               
          <div onClick={""}  className='flex flex-col cursor-pointer justify-center items-center w-full rounded-2xl mt-5 h-[80%] bg-white'>
                
            <FiDownload className='text-5xl text-[#23A1D8]'></FiDownload>
            <p className='text-[#727272] hover:underline font-semibold'>Ver foto del DNI</p> 
           
            
          </div>
          
        </div>
    </div>
   <div className="flex-col bg-white p-8 rounded-2xl w-3/5 h-max mt-4 grid grid-cols-2">
  <div className="flex flex-col space-y-2 p-8 border-r-2">
    
    <label className="font-semibold">CUIT:</label>
    <Input>{userData.cuit}</Input>

    <label className="font-semibold">Nacionalidad:</label>
    <Input>{userData.nacionalidad}</Input>

    <label className="font-semibold">Sexo:</label>
    <Input>{userData.sexo}</Input>

    <label className="font-semibold">Domicilio:</label>
    <Input
    value={userData.domicilio}
    />
  </div>
  
  <div className="flex flex-col space-y-2 p-8">
    <label className="font-semibold">Estado Civil:</label>
    <Input
    value={userData.estado_civil}
    />

    
    <label className="font-semibold">Fecha de Nacimiento:</label>
    <Input>{userData.fecha_de_nacimiento}</Input>
    <label className="font-semibold">Teléfono:</label>
    <Input>{userData.tel}</Input>
    <label className="font-semibold">Email:</label>
    <Input>{userData.correo}</Input>
  </div>
</div>



        </div>
    </div>
  );
  }

export default Profile


// <div className="flex w-3/5 h-3/5 lg:w-4/5 lg:h-4/5 justify-center items-center max-w-lg bg-white rounded-lg shadow dark:bg-[#1D1D1D]">
//         <div className="flex flex-col items-center pb-10">
//           <Avatar />
//           <span className="text-sm text-gray-500 dark:text-gray-400">Delegado de UATRE.</span>
//           <input
//             type="text"
//             name="domicilio"
//             value={userData.domicilio}
//             onChange={handleChangue}
//             placeholder="Domicilio"
//             className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none"
//             disabled={!isEditing}
//           />
//           {/* Resto de los campos de entrada */}
//           {isEditing ? (
//             <div className="flex mt-4 space-x-3 md:mt-6">
//               <button
//                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//             </div>
//           ) : (
//             <div className="flex mt-4 space-x-3 md:mt-6">
//               <button
//                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 onClick={handleEdit}
//               >
//                 Editar
//               </button>
//             </div>
//           )}
//         </div>
//       </div>