import swal from "sweetalert";
import { putAprobarUsuario, putRechazarUsuario } from "./ServiceAdministrador";
import { useDispatch } from "react-redux";
import { loadUsers } from "../../../store/users";

const FichaAfiliado = (props) => {
  const dispatch = useDispatch();

  const { row, setVisible } = props;

  const handleAprobar = async () => {
    await putAprobarUsuario(row);
    swal({
      title: "Éxito!",
      text: `${row.username} - aprobado.`,
      icon: "success",
    });
    dispatch(loadUsers({ params: 'refresh' }));
    setVisible(false);
  };

  const handleRechazarUsuario = async () => {
    await putRechazarUsuario(row);
    swal({
      title: "Éxito!",
      text: `${row.username} - Rechazado`,
      icon: "success",
    });
    dispatch(loadUsers({ params: 'refresh' }));
    setVisible(false);
  };

  return (
    <div className="relative bg-white">
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            DNI
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={row.dni}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            CUIT
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={row.cuit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nacionalidad
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={row.nacionalidad}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Teléfono
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={row.tel}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sexo
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={row.sexo}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={row.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
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
            Domicilio
          </label>
          <input
            type="text"
            name="brand"
            id="brand"
            value={row.domicilio}
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
            value={row.seccional}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            disabled={true}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          onClick={handleAprobar}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          <i className="pi pi-check mr-1"></i>
          Aprobar
        </button>
        <button
          type="button"
          onClick={handleRechazarUsuario}
          className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
        >
          <i className="pi pi-times mr-1"></i>
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default FichaAfiliado;
