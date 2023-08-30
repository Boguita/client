import { useState } from "react";


const Soporte = () => {
  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    type: 'Consulta',
    benefit: 'Otro',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el formulario al servidor Node.js para manejar la solicitud de soporte
    console.log(formData);
  };

  return (
    <div className="ml-64 w-screen h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-3xl bg-white p-8 rounded shadow w-full">
        <h1 className="text-2xl font-semibold mb-4">Soporte</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="type">
              Tipo de Consulta
            </label>
            <select
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="Consulta">Consulta</option>
              <option value="Error de Datos">Error de Datos</option>
              <option value="Eliminar Datos">Eliminar Datos</option>
              <option value="Modificar">Modificar</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="dni">
              Número de DNI del Afiliado
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dni"
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleInputChange}
              placeholder="Número de DNI"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="benefit">
              Tipo de Beneficio
            </label>
            <select
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="benefit"
              name="benefit"
              value={formData.benefit}
              onChange={handleInputChange}
            >
              <option value="Modificar">Otro</option>
              <option value="Consulta">Kit Escolar</option>
              <option value="Error de Datos">Kit Maternal</option>
              <option value="Eliminar Datos">Luna de Miel</option>
              
            </select>
          </div>
          <div className="mb-4">
            <label className="block  text-gray-700 font-bold mb-2" htmlFor="message">
              Mensaje Detallado
            </label>
            <textarea
              className="appearance-none resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje detallado aquí..."
              rows="4"
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Soporte;