import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../common/Axiosconfig';
import {IoIosAddCircle} from 'react-icons/io';
import Libro from '../assets/img/libro-abierto.png';
import Graphics from './Graphics';
import Calendar from "react-calendar";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import Sample from './Calendar';
import TableUsers from '../components/TableUsers';
import SimplePieCharts from '../components/SimplePieCharts';
import Input from '../components/Input';
import Loader from '../components/Loader';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import TableKitEscolar from '../components/TableKitEscolar';
import GraphicsStock from '../components/GraphicsStock';
import { RxExternalLink } from 'react-icons/rx';
import TableStockEnviado from '../components/TableStockEnviado';
import ListBenefits from '../components/ListBenefits';
import Logo from '../assets/img/logo.png';
import Avatar from '../components/Avatar';
import { AuthContext } from '../context/authContext';


const EnviosTotales = () => {
  const [stockEnviado, setStockEnviado] = useState(null);
  const [stockEnviadoTotal, setStockEnviadoTotal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

 const agruparEnvios = (envios) => {
  const enviosAgrupados = {};

  envios.forEach((envio) => {
    const key = envio.idseccionales.toString();

    if (enviosAgrupados[key]) {
      enviosAgrupados[key].total += 1; // Incrementa el total de envíos
      // Suma los valores de cada campo
      enviosAgrupados[key].mochila += parseInt(envio.mochila, 10) || 0;
      enviosAgrupados[key].utiles_Jardín += parseInt(envio.utiles_Jardín, 10) || 0;
      enviosAgrupados[key].utiles_Primario += parseInt(envio.utiles_Primario, 10) || 0;
      enviosAgrupados[key].utiles_Secundario += parseInt(envio.utiles_Secundario, 10) || 0;
      enviosAgrupados[key].talle6 += parseInt(envio.talle6, 10) || 0;
      enviosAgrupados[key].talle8 += parseInt(envio.talle8, 10) || 0;
      enviosAgrupados[key].talle10 += parseInt(envio.talle10, 10) || 0;
      enviosAgrupados[key].talle12 += parseInt(envio.talle12, 10) || 0;
      enviosAgrupados[key].talle14 += parseInt(envio.talle14, 10) || 0;
      enviosAgrupados[key].talle16 += parseInt(envio.talle16, 10) || 0;
      enviosAgrupados[key].talle18 += parseInt(envio.talle18, 10) || 0;
      


      // Agrega más campos según tus necesidades
    } else {
      enviosAgrupados[key] = {
        total: 1,
         provincia: envio.provincia,
        delegacion: envio.delegacion,
        nombre: envio.nombre,        
        direccion: envio.direccion,
        mochila: parseInt(envio.mochila, 10) || 0,
        utiles_Jardín: parseInt(envio.utiles_Jardín, 10) || 0,
        utiles_Primario: parseInt(envio.utiles_Primario, 10) || 0,
        utiles_Secundario: parseInt(envio.utiles_Secundario, 10) || 0,
        talle6: parseInt(envio.talle6, 10) || 0,
        talle8: parseInt(envio.talle8, 10) || 0,
        talle10: parseInt(envio.talle10, 10) || 0,
        talle12: parseInt(envio.talle12, 10) || 0,
        talle14: parseInt(envio.talle14, 10) || 0,
        talle16: parseInt(envio.talle16, 10) || 0,
        talle18: parseInt(envio.talle18, 10) || 0,

        // Agrega más campos según tus necesidades
      };
    }
  });

  return Object.values(enviosAgrupados);
};

const agruparEnviosTotales = (envios) => {
  const enviosAgrupados = {
    total: 0,
    mochila: 0,
    utiles_Jardín: 0,
    utiles_Primario: 0,
    utiles_Secundario: 0,
    talle6: 0,
    talle8: 0,
    talle10: 0,
    talle12: 0,
    talle14: 0,
    talle16: 0,
    talle18: 0,
  };

  envios.forEach((envio) => {
    enviosAgrupados.total += 1;
    enviosAgrupados.mochila += parseInt(envio.mochila, 10) || 0;
    enviosAgrupados.utiles_Jardín += parseInt(envio.utiles_Jardín, 10) || 0;
    enviosAgrupados.utiles_Primario += parseInt(envio.utiles_Primario, 10) || 0;
    enviosAgrupados.utiles_Secundario += parseInt(envio.utiles_Secundario, 10) || 0;
    enviosAgrupados.talle6 += parseInt(envio.talle6, 10) || 0;
    enviosAgrupados.talle8 += parseInt(envio.talle8, 10) || 0;
    enviosAgrupados.talle10 += parseInt(envio.talle10, 10) || 0;
    enviosAgrupados.talle12 += parseInt(envio.talle12, 10) || 0;
    enviosAgrupados.talle14 += parseInt(envio.talle14, 10) || 0;
    enviosAgrupados.talle16 += parseInt(envio.talle16, 10) || 0;
    enviosAgrupados.talle18 += parseInt(envio.talle18, 10) || 0;
    // Puedes agregar más campos según tus necesidades
  });

  return [enviosAgrupados];
};


  const handleAffiliateDataRequest = async () => {
    try {
      setIsLoading(true);

      const res2 = await api.get(`/tasks/stock-enviado`);
      const stockEnviado = res2.data;

      const stockEnviadoAgrupado = agruparEnvios(stockEnviado);
      const stockEnviadoTotal = agruparEnviosTotales(stockEnviado);

      setStockEnviado(stockEnviadoAgrupado);
      setStockEnviadoTotal(stockEnviadoTotal);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleAffiliateDataRequest();
  }, []);

  return (
    <div className="flex-col w-screen h-screen container-fluid">
      {/* Barra horizontal superior */}
      <div className={`fixed top-0 left-0 w-full z-40  px-4 py-2 bg-[#006084] text-white ${ 'shadow-md'  }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={Logo} className="h-8 mr-2" alt="Logo" />
            {/* <span className="text-lg font-semibold">Nombre de la Aplicación</span> */}
          </div>
          {currentUser && (
            <div className="flex items-center">
              <span className="mr-2">{currentUser.name}</span>
              <Avatar path={true} />
            </div>
          )}
        </div>
      </div>
       <div className="flex-col py-28">
        <div className="flex-col ">
          <h1 className="text-center text-3xl font-bold mb-6">Stock Enviados Totales</h1>
         <div className="flex w-full items-center justify-center">
          <table className="table-auto   bg-white rounded-lg w-2/4 divide-y-4 divide-[#006084]">
            <thead >
              <tr>               
                <th className="px-2  py-3  text-left text-md leading-4 font-extrabold text-black uppercase tracking-wider">
                  Mochila
                </th>     
                 <th className="px-2  py-3  text-left text-md leading-4 font-extrabold text-black uppercase tracking-wider">
                  Útiles Jardín
                </th>
                <th className="px-2  py-3  text-left text-md leading-4 font-extrabold text-black uppercase tracking-wider">
                  Útiles Primario
                </th>
                <th className="px-2  py-3  text-left text-md leading-4 font-extrabold text-black uppercase tracking-wider">
                  Útiles Secundario
                </th>          
                <th className="px-2  py-3  text-left text-md leading-4 font-extrabold text-black uppercase tracking-wider">
                  T.6
                </th>
                 <th className="px-2  py-3  text-left text-md leading-4 font-extrabold text-black uppercase tracking-wider">
                  T.8
                </th>     
                  <th className="px-2  py-3  text-left text-md leading-4 font-extrabold text-black uppercase tracking-wider">
                  T.10
                </th>         
                <th className="px-2  py-3  text-left text-md leading-4 font-extrabold text-black uppercase tracking-wider">
                  T.12
                </th>
                
                <th className="px-2  py-3  text-left text-md leading-4 font-extrabold text-black uppercase tracking-wider">
                  T.14
                </th>
                 <th className="px-2  py-3  text-left text-md leading-4 font-extrabold text-black uppercase tracking-wider">
                  T.16
                </th>
                <th className="px-2  py-3  text-left text-md leading-4 font-extrabold text-black uppercase tracking-wider">
                  T.18
                </th>            
              </tr>

            </thead>

            <tbody>

              {stockEnviadoTotal?.map((envio, index) => (

                <tr key={index} className="bg-[#EFF1F3]">

                  <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                    {envio.mochila}
                  </td>
                  <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                    {envio.utiles_Jardín}
                  </td>
                  <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                    {envio.utiles_Primario}
                  </td>
                  <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                    {envio.utiles_Secundario}
                  </td>
                  <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                    {envio.talle6}
                  </td>
                  <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                    {envio.talle8}
                  </td>
                  <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                    {envio.talle10}
                  </td>
                  <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                    {envio.talle12}
                  </td>
                  <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                    {envio.talle14}
                  </td>
                  <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                    {envio.talle16}
                  </td>
                  <td className="px-2 py-4 whitespace-no-wrap text-sm leading-5 text-black">
                    {envio.talle18}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

        </div>
      </div>

     
              
      <div className="flex-col m-[-3em]">
        <h2 className="text-center text-3xl font-bold mb-2 ">Stock Enviado por Seccional</h2>

        <div className="row">
          <div className="px-20 col-12">
            <TableStockEnviado none={true} initialData={stockEnviado} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnviosTotales;
