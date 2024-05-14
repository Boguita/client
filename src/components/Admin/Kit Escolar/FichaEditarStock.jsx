import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { loadUsers } from "../../../store/users";
import { useState } from "react";
import { editarStockEscolar } from "./ServiceKitEscolar";
import { loadStock } from "../../../store/stock";
import { loadEnvios } from "../../../store/envios";

const FichaEditarStock = (props) => {
    const [formData, setFormData] = useState({
    funcion: "",
    mochila: 0,
    utiles_Jardín: 0,
    utiles_Primario: 0,
    utiles_Secundario: 0,   
    talle6:0,
    talle8: 0,
    talle10: 0,
    talle12: 0,
    talle14: 0,
    talle16: 0,
    talle18: 0,   
  });

  const dispatch = useDispatch();


  const { row, setVisible } = props;

  const handleEdit = async () => {
     const values = Object.values(formData);

  // Verificar si todos los campos (excepto 'funcion') son iguales a 0
  if (values.slice(1).every(value => value === 0) || !formData.funcion) {
    swal({
      title: 'Error',
      text: 'Por favor, complete al menos un campo y asegúrese de que la operación esté seleccionada.',
      icon: 'error',
    });
    return;
  }
    await editarStockEscolar(row, formData);
    swal({
      title: "Éxito!",
      text: `${row.nombre} - se ha editado.`,
      icon: "success",
    });
    dispatch(loadStock({ params: 'refresh' }));
    dispatch(loadEnvios({ params: 'refresh' }));
    setVisible(false);
  };

  // const handleRechazarUsuario = async () => {
  //   await putRechazarUsuario(row);
  //   swal({
  //     title: "Éxito!",
  //     text: `${row.username} - Rechazado`,
  //     icon: "success",
  //   });
  //   dispatch(loadUsers());
  //   setVisible(false);
  // };

  
  const handleChangeStock = (e) => {   
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="relative bg-white">
      
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Operación
          </label>
            <select
                    id="funcion"
                    name="funcion"
                    required
                    value={formData.funcion}
                    onChange={handleChangeStock}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="" disabled selected>Operación</option>

                        <option  value={"sumar"}>
                          Sumar
                        </option>
                          <option  value={"restar"}>
                          Restar
                        </option>


                  </select>
        </div>
        
            <label className="block mt-3  text-sm font-medium text-gray-900 mb-2" htmlFor="guardapolvo">
             Guardapolvo Talles
            </label> 
          <div className="grid gap-4 mb-4 sm:grid-cols-7">            
           <div className='flex-col '>
           <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
             T.6
            </label> 
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-16"
              id="talle6"
              type="number"
              required
              name="talle6"
              value={formData.talle6}
              onChange={handleChangeStock}
  
            />
             </div>
              <div className='flex-col '>
           <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
             T.8
            </label> 
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-16"
              id="talle8"
              type="number"
              required
              name="talle8"
              value={formData.talle8}
              onChange={handleChangeStock}
  
            />
             </div>
              <div className='flex-col '>
           <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
             T.10
            </label> 
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-16"
              id="talle10"
              type="number"
              required
              name="talle10"
              value={formData.talle10}
              onChange={handleChangeStock}
  
            />
             </div>
              <div className='flex-col '>
           <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
             T.12
            </label> 
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-16"
              id="talle12"
              type="number"
              required
              name="talle12"
              value={formData.talle12}
              onChange={handleChangeStock}
  
            />
             </div>
              <div className='flex-col '>
           <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
             T.14
            </label> 
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-16"
              id="talle14"
              type="number"
              required
              name="talle14"
              value={formData.talle14}
              onChange={handleChangeStock}
  
            />
             </div>
              <div className='flex-col '>
           <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
             T.16
            </label> 
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-16"
              id="talle16"
              type="number"
              required
              name="talle16"
              value={formData.talle16}
              onChange={handleChangeStock}
  
            />
             </div>
              <div className='flex-col '>
           <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="guardapolvo">
             T.18
            </label> 
            <input 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-16"
              id="talle18"
              type="number"
              required
              name="talle18"
              value={formData.talle18}
              onChange={handleChangeStock}
  
            />
             </div>
            </div>           
          <div className="grid gap-4 mb-4 sm:grid-cols-4 ">   
            <div className='flex-col '>  
             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mochila">
              Mochila
            </label>  
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-full"
              id="mochila"
              type="number"
              required
              name="mochila"
              value={formData.mochila}
              onChange={handleChangeStock}
            />
            </div>

               <div className='flex-col '>  
             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mochila">
              Ut. Jardín
            </label>  
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-full"
              id="utiles_Jardín"
              type="number"
              required
              name="utiles_Jardín"
              value={formData.utiles_Jardín}
              onChange={handleChangeStock}
            />
            </div>

             <div className='flex-col '>  
             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="utiles_Primario">
              Ut. Primario
            </label>  
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-full"
              id="utiles_Primario"
              type="number"
              required
              name="utiles_Primario"
              value={formData.utiles_Primario}
              onChange={handleChangeStock}
            />
            </div>

             <div className='flex-col '>  
             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="utiles_Secundario">
              Ut. Secundario
            </label>  
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-full"
              id="utiles_Secundario"
              type="number"
              required
              name="utiles_Secundario"
              value={formData.utiles_Secundario}
              onChange={handleChangeStock}
            />
            </div>
            
            
            </div>

              

        <div className="grid gap-4 mb-4 sm:grid-cols-2">      
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Provincia
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={row.provincia}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Dirección
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={row.direccion}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Delegación
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={row.delegacion}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Seccional
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={row.nombre}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
         <button
          type="submit"
          onClick={handleEdit}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          <i className="pi pi-check mr-1"></i>
          Confirmar
        </button>
        {/* <button
          type="button"
          onClick={handleRechazarUsuario}
          className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
        >
          <i className="pi pi-times mr-1"></i>
          Rechazar
        </button>  */}
      </div>
    </div>
  );
};

export default FichaEditarStock;
