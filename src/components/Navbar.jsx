import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from '../assets/img/logo.png'
import Avatar from "./Avatar";
import NavBG from '../assets/img/navbg.jpg'
import {AiFillHome} from 'react-icons/ai'
import {BsFillFileEarmarkBarGraphFill, BsFillPeopleFill} from 'react-icons/bs'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();   
  const location = useLocation();
  const [fix, setFix] = useState(false)

  const onScroll = () => {
      if(window.scrollY >= 100) {
      setFix(true)
      } else {
         setFix(false)
      }
  }
  console.log(fix)
  console.log(location.pathname)
  window.addEventListener("scroll", onScroll)

  return (
    <>
    {/* Barra horizontal superior */}
      <div className={`fixed top-0 left-0 w-full z-40  px-4 py-2 bg-[#23A1D8] text-white ${fix ? 'shadow-md' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={Logo} className="h-8 mr-2" alt="Logo" />
            {/* <span className="text-lg font-semibold">Nombre de la Aplicación</span> */}
          </div>
          {currentUser && (
            <div className="flex items-center">
              <span className="mr-2">{currentUser.name}</span>
              <Avatar />
            </div>
          )}
        </div>
      </div>

<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="logo-sidebar" className="fixed justify-center z-50 left-0 top-0  w-30 lg:w-72 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-cover bg-center bg-[51rem]" style={{ backgroundImage: `url(${NavBG})` }} aria-label="Sidebar">
   <div className="flex flex-col space-y-2 h-screen px-3 py-4 overflow-y-auto relative  bg-[#0d4668] bg-opacity-80"
    >
      
      <div className="h-full w-full">
       <Link to="/homeInfo" className={`flex items-center p-2 rounded-lg dark:text-white   ${
              location.pathname === '/dashboard' ? 'text-blue-500' : 'text-gray-700'
            }`}>
          <img src={Logo} className="h-full mt-6 mb-6 mr-3 sm:h-full w-full" alt="UATRE Logo" />
       </Link>
        <ul className="space-y-5 font-medium ">
            <li>
              <p  className={`flex items-center p-2 text-gray-900 ${/^\/homeInfo(\/\w+)?$/.test(location.pathname)  ? 'text-blue-500 bg-gray-700' : 'text-white'} rounded-lg `}>
                   <span className="flex-shrink-0 text-white text-2xl transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white">
                  1°
                  </span>
                  <span className={`ml-3 ${/^\/homeInfo(\/\w+)?$/.test(location.pathname)  ? 'text-blue-500' : 'text-white'}`}>Paso</span>
              </p>
          </li>

             <li>
               <p  className={`flex items-center p-2 text-gray-900 ${/^\/home(\/\w+)?$/.test(location.pathname) || location.pathname === '/registro-afiliado'  ? 'text-blue-500 bg-gray-700' : 'text-white'} rounded-lg  `}>
                    <span className="flex-shrink-0 text-white text-2xl transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white">
                  2°
                  </span>
                   <span className={`ml-3 ${/^\/home(\/\w+)?$/.test(location.pathname) || location.pathname === '/registro-afiliado' ? 'text-blue-500' : 'text-white'}`}>Paso</span>
                  {/* <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Gold</span> */}
               </p>
            </li>

          <li>
               <p  className={`flex items-center p-2 text-gray-900 ${location.pathname === '/beneficios' ? 'text-blue-500 bg-gray-700' : 'text-white'} rounded-lg  `}>
                    <span className="flex-shrink-0 text-white text-2xl transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white">
                  3°
                  </span>
                   <span className={`ml-3 ${location.pathname === '/beneficios' | '/home' ? 'text-blue-500' : 'text-white'}`}>Paso</span>
                  {/* <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Gold</span> */}
               </p>
            </li>

           <li>
               <p className={`flex items-center p-2 text-gray-900 ${location.pathname === '/luna-de-miel' || location.pathname === '/kit-escolar' || location.pathname === '/kit-maternal' ? 'text-blue-500 bg-gray-700' : 'text-white'} rounded-lg `}>
                  <span className="flex-shrink-0 text-white text-2xl transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white">
                  4°
                  </span>
                   <span className={`ml-3 ${location.pathname === '/luna-de-miel' || location.pathname === '/kit-escolar' || location.pathname === '/kit-maternal' ? 'text-blue-500 ' : 'text-white'}`}>Paso</span>
                  {/* <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Gold</span> */}
               </p>
            </li>

        
            
            
            {/* <li>
               <Link to='/profile' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                   <span className={`ml-3 ${location.pathname === '/profile' ? 'text-blue-500' : 'text-white'}`}>Perfil</span>
               </Link>
            </li> */}
            <li>
               <Link to="/soporte" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                   <span className={`ml-3 ${location.pathname === '/soporte' ? 'text-blue-500' : 'text-white'}`}>Soporte</span>
                  {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
               </Link>
            </li>
            {/* <li>
               <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                   <BsFillFileEarmarkBarGraphFill className="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white"/>
                  <span class="flex-1 ml-3 whitespace-nowrap">Reportes</span>
               </a>
            </li> */}
            <li>
               <Link to="/">
               <span className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-white transition duration-75 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>                
                  {(<span onClick={logout} class="flex-1 ml-3 whitespace-nowrap">Salir</span>)}           
               </span>
               </Link>
            </li>  
             <li >
               <Link className="flex justify-center"  to="/homeInfo" > 
                  <button className="btn just mt-8">                                 
                  {(<span>Nueva Solicitud</span>)}           
                  </button>
               </Link>
               
            </li>                 
         </ul> 
       </div>     
     
      

     </div> 
     
</aside>
</>

  //   <div className="navbar">
  //     <div className="container">
  //       <div className="logo">
  //         <Link to="/">
  //         <img src={Logo} alt="" />
  //         </Link>
  //       </div>
  //       <div className="links">
  //         <Link className="link" to="/?cat=web">
  //           <h6>YOUR WEBSITE</h6>
  //         </Link>
  //         <Link className="link" to="/?cat=social">
  //           <h6>SOCIAL MEDIA</h6>
  //         </Link>
  //         <Link className="link" to="/?cat=graphic">
  //           <h6>GRAPHIC DESIGN</h6>
  //         </Link>
  //         <Link className="link" to="/?cat=other">
  //           <h6>OTHER</h6>
  //         </Link>
  //         <span>{currentUser?.username}</span>
  //         {currentUser ? (
  //           <span onClick={logout}>Logout</span>
  //         ) : (
  //           <Link className="link" to="/login">
  //             Login
  //           </Link>
  //         )}
  //         <span className="write">
  //           <Link className="link" to="/request">
  //             Write
  //           </Link>
  //         </span>
  //       </div>
  //     </div>
  //   </div>
   );
};

export default Navbar;
