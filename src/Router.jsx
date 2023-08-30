import {
  createBrowserRouter,
  RouterProvider,
  Route,Routes, Navigate,
  Outlet, redirect
} from "react-router-dom";

import Benefits from "./pages/Benefits";
import HomeInfo from "./pages/HomeInfo";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Soporte from "./pages/Soporte";
import KitEscolar from "./pages/KitEscolar";
import KitMaternal from "./pages/KitMaternal";
import LunaDeMiel from "./pages/LunaDeMiel";
import {Layout} from './common/Layout'
import {AuthContext} from './context/authContext'
import { useContext } from "react";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ImageUpload from "./pages/ImageUpload";
import RegisterAfiliate from "./pages/RegisterAfiliate";

import Home from "./pages/Home";


const PrivateRoute = ({children, redirectTo="/"}) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser?.username) {
    return <Navigate to={redirectTo} />
  }  
    return ( children ? children : 
   <Outlet/>
  );  
};

// const AdminRoute = ({children, redirectTo="/admin"}) => {
//   // const { currentUser } = useContext(AuthContext);
//   // if (currentUser?.username !== "ADMIN") {
//   //   return <Navigate to={redirectTo} />
//   // }  
//   //   return ( children ? children : 
//   //  <Outlet/>
//   // );  
// };




export const AppRouter = () => { 

  return (
    <>
  <Routes>

    <Route index element={<Login/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />   
    <Route element={<PrivateRoute/>}>
      <Route path='/' element={<Layout/>}>      
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/homeInfo' element={<HomeInfo/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/registro-afiliado' element={<RegisterAfiliate/>} />
        <Route path='/beneficios' element={<Benefits />} />
        <Route path='/kit-escolar' element={<KitEscolar />} />
        <Route path='/kit-maternal' element={<KitMaternal />} />
        <Route path='/luna-de-miel' element={<LunaDeMiel />} />
        <Route path='/upload-images' element={<ImageUpload />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/soporte' element={<Soporte />} />
       
      </Route>
    </Route> 

    
  </Routes>

    </>
    
   
  )
  };


{/* ROUTE ADMIN */ }
    {/* <Route path='/admin' element={<LoginAdmin/>} />     */}
    {/* <Route element={<AdminRoute/>}>  */}
    {/* <Route path='/' element={<Layout/>}>      
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/tickets' element={<Tasks />} />
        <Route path='/tickets/:id' element={<Single />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/request' element={<Request />} />        
        <Route path='/register' element={<Register/>} />      
      </Route>       */}
    {/* </Route> */}