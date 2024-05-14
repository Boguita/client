import swal from "sweetalert";
// import { putAprobarUsuario, putRechazarUsuario } from "./ServiceAdministrador";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { editarSeccional } from "./ServiceSeccionales";
import { loadSeccionales } from "../../../store/seccionales";

const FichaEditarSeccional = (props) => {
  const { row, setVisible } = props;
  const [formData, setFormData] = useState({
    nombre: row.nombre,
    delegacion: row.delegacion,
    provincia: row.provincia,
    direccion: row.direccion
  });

  const comprobarCambios = (row) => {
    return (
    row.nombre === formData.nombre &&
    row.delegacion === formData.delegacion &&
    row.provincia === formData.provincia &&
    row.direccion === formData.direccion
    )
}


  const dispatch = useDispatch();

  
  const handleEdit = async () => {
     const comprobacion = comprobarCambios(row);
  if (comprobacion) {
    swal({
      title: "Error!",
      text: `No se han realizado cambios`,
      icon: "error",
    });
    return; // Agrega un return para salir de la función en caso de que no haya cambios
  }
    await editarSeccional(row, formData);
    swal({
      title: "Éxito!",
      text: `${row.nombre} - ha sido editada.`,
      icon: "success",
    });
    dispatch(loadSeccionales({ params: 'refresh' }));
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
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData)
  }
  ,[formData])

  return (
    <div className="relative bg-white">
      <div className="grid gap-4 mb-4 sm:grid-cols-2">        
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Provincia
          </label>
          <input
            type="text"
            name="provincia"
            id="provincia"
            value={formData.provincia}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Delegación
          </label>
          <input
            type="text"
            name="delegacion"
            id="delegacion"
            value={formData.delegacion}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Seccional
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            
          />
        </div>
         <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Dirección
          </label>
          <input
            type="text"
            name="direccion"
            id="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"     
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
          onClick={handleEdit}
          className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
        >
          <i className="pi pi-times mr-1"></i>
          Rechazar
        </button> */}
      </div>
    </div>
  );
};

export default FichaEditarSeccional;
