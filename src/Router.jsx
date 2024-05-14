import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Navigate,
  Outlet,
  redirect,
} from "react-router-dom";
import DashboardAdmin from "./pages/DashboardAdmin";
import Benefits from "./pages/Benefits";
import HomeInfo from "./pages/HomeInfo";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Soporte from "./pages/Soporte";
import KitEscolar from "./pages/KitEscolar";
import KitMaternal from "./pages/KitMaternal";
import LunaDeMiel from "./pages/LunaDeMiel";
import { Layout } from "./common/Layout";
import { LayoutAdmin } from "./common/LayoutAdmin";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ImageUpload from "./pages/ImageUpload";
import RegisterAfiliate from "./pages/RegisterAfiliate";
import LoginAdmin from "./pages/LoginAdmin";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Afiliados from "./pages/Afiliados";
import Administradores from "./pages/Administradores";
import LunaDeMielAdmin from "./pages/LunaDeMielAdmin";
import BenefitsAdmin from "./pages/BenefitsAdmin";
import KitMaternalAdmin from "./pages/KitMaternalAdmin";
import KitEscolarAdmin from "./pages/KitEscolarAdmin";
import Seccionales from "./pages/SeccionalesAdmin";
import ListBenefits from "./components/ListBenefits";
import ProfileAfilliate from "./pages/ProfileAfiliatte";
import Ayuda from "./pages/Ayuda";
import EnviosTotales from "./pages/EnvíosTotales";
import PageAdministradores from "./components/Admin/Administradores/PageAdministradores";
import PageLunaMiel from "./components/Admin/LunaMiel/PageLunaMiel";
import PageKitEscolar from "./components/Admin/Kit Escolar/PageKitEscolar";
import PageSeccionales from "./components/Admin/Seccionales/PageSeccionales";
import PageKitNacimiento from "./components/Admin/KitNacimiento/PageKitNacimiento";

const PrivateRoute = ({ children, redirectTo = "/" }) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser?.username) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};

const AdminRoute = ({ children, redirectTo = "/admin/login" }) => {
  const { currentUser } = useContext(AuthContext);

  // Verifica si el usuario no es administrador (area no existe o es null)
  const isNotAdmin = !currentUser?.area || currentUser?.area !== "admin";

  if (isNotAdmin) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/homeInfo" element={<HomeInfo />} />
            <Route path="/home/:dniparams?" element={<Home />} />
            <Route path="/registro-afiliado" element={<RegisterAfiliate />} />
            <Route path="/beneficios" element={<Benefits />} />
            <Route path="/kit-escolar" element={<KitEscolar />} />
            <Route path="/kit-maternal" element={<KitMaternal />} />
            <Route path="/luna-de-miel" element={<LunaDeMiel />} />
            <Route path="/upload-images" element={<ImageUpload />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/soporte" element={<Soporte />} />
          </Route>
        </Route>
        {/* ROUTE ADMIN */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route element={<AdminRoute />}>
          <Route
            path="/admin/kit-escolar/listado-pendientes"
            element={<EnviosTotales />}
          />
          <Route path="/" element={<LayoutAdmin />}>
            <Route path="/admin/:dniparams?" element={<ProfileAfilliate />} />
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
            <Route path="/admin/beneficios" element={<BenefitsAdmin />} />
            <Route path="/admin/luna-de-miel" element={<PageLunaMiel />} />
            <Route
              path="/admin/kit-nacimiento"
              element={<PageKitNacimiento />}
            />

            <Route path="/admin/kit-escolar" element={<PageKitEscolar />} />
            <Route path="/admin/afiliados" element={<Afiliados />} />
            <Route
              path="/admin/administradores"
              element={<PageAdministradores />}
            />
            <Route path="/admin/seccionales" element={<PageSeccionales />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/soporte" element={<Soporte />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
