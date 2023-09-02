import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { AuthContext } from "../context/authContext";
import { IoDocumentTextOutline } from "react-icons/io5";
import api from "../common/Axiosconfig";
import Modal from "react-modal";
import { CiEdit } from "react-icons/ci";
import Checkbox from "../components/Checkbox";
import { FiDownload } from "react-icons/fi";
import Files from "../components/Files";
import Libro from "../assets/img/libro-abierto.png";
import Loader from "../components/Loader";
import Input from "../components/Input";
import {PiBackpackDuotone} from 'react-icons/pi'
import {TbTools} from 'react-icons/tb'
import {TbJacket} from 'react-icons/tb'

const KitEscolar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [dni, setDni] = useState("");
  const [beneficiosOtorgados, setBeneficiosOtorgados] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todosBeneficiosOtorgados, setTodosBeneficiosOtorgados] =
    useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFamiliares, setSelectedFamiliares] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [beneficio, setBeneficio] = useState({});
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showButton, setShowButton] = useState(true);

  const [formData, setFormData] = useState({
    id_afiliado: "",
    name: "",
    categoria: "Hijo/a",
    dni: "",
    tel: "1234",
    fecha_de_nacimiento: "",
    dni_img_familiar: null,
  });

  const [familiares, setFamiliares] = useState([]);

  // const handleFamiliarSelection = (selectedOptions) => {
  //   const selectedFamiliarIds = selectedOptions.map((option) => option.value);
  //   setSelectedFamiliares(selectedFamiliarIds);
  // };

  const handleNextStep = async () => {
    if (!selectedFamiliares.length) return;

    if (currentStep === 2) {
      const hasSelectedItems = selectedFamiliares.every((familiarId) => {
        const familiar = beneficio[familiarId];
        return familiar.mochila || familiar.utiles || familiar.guardapolvo;
      });

      const hasSelectedAñoEscolar = selectedFamiliares.every((familiarId) => {
        const familiar = beneficio[familiarId];
        return !!familiar.año_escolar;
      });

      if (!hasSelectedItems) {
        setError(
          "Debes elegir al menos un ítem a entregar para cada familiar."
        );
        return;
      }

      if (!hasSelectedAñoEscolar) {
        setError(
          "Debes elegir el año escolar antes de continuar para cada familiar."
        );
        return;
      }
    }

    setError(null); // Limpiar cualquier error previo
    setCurrentStep(currentStep + 1);
  };

  const handleBackStep = async () => {
    setCurrentStep(currentStep - 1);
    const resetBeneficio = { ...beneficio };
    selectedFamiliares.forEach((familiarId) => {
      resetBeneficio[familiarId].mochila = false;
      resetBeneficio[familiarId].utiles = false;
      resetBeneficio[familiarId].guardapolvo = "";
      resetBeneficio[familiarId].año_escolar = "";
    });
    setBeneficio(resetBeneficio);
  };

  useEffect(() => {
    // Obtener el dni de location.state y almacenarlo en el estado local al cargar el componente
    setDni(location.state?.dni);
  }, []);

  const handleInputChange = async (e, familiarId) => {
    const numericFamiliarId = parseInt(familiarId);
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setBeneficio((prevBeneficios) => ({
      ...prevBeneficios,
      [numericFamiliarId]: {
        ...prevBeneficios[numericFamiliarId],
        [name]: inputValue,
      },
    }));
  };

  const handleDniImgChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      dni_img_familiar: filesArray,
    }));
    console.log(formData.dni_img_familiar);
  };

  const handleChangeHijo = (e) => {
    const { name, value } = e.target;
    if (name === "dni" && !/^[0-9]*$/.test(value)) {
      setError("Ingresa solo números en el campo DNI");
    } else {
    setError(null)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  };

  const validateFields = () => {
    setValidationErrors({}); // Limpiar cualquier error de validación previo
    const requiredFields = {
      formData: ["name", "dni", "fecha_de_nacimiento", "dni_img_familiar"],
    };

    const errors = {};

    Object.entries(requiredFields).forEach(([fieldGroup, fieldNames]) => {
      fieldNames.forEach((fieldName) => {
        if (formData[fieldName] === "" && fieldGroup === "formData") {
          errors[fieldName] = "*";
        }
      });
    });
    if (!formData.dni_img_familiar || formData.dni_img_familiar.length === 0) {
      errors.dni_img_familiar = "*";
    }

    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      setValidationErrors(errors);
      setIsLoading(false);
      return;
    }

    const res = await api.post("users/registro-familiar", formData);
    if (res.status === 200) {
      handleImageUpload();
      setModalIsOpen(false);
      handleAfiliadoSearch(dni);
      setIsLoading(false);
      setError(null);
    }
  };

  const handleImageUpload = async () => {
    const imgFormaData = new FormData();
    imgFormaData.append("dni", formData.dni);
    formData.dni_img_familiar.forEach((dniImg) => {
      imgFormaData.append("dni_img_familiar", dniImg);
    });
    // await Promise.all(formData.dni_img.map(loadImage));
    const responseDni = await api.post(
      "/uploads/images-dni-familiar",
      imgFormaData
    );
  };

const handleFamiliarCheckboxChange = (e) => {
  const { value } = e.target;
  const familiarId = parseInt(value, 10); // Convertir el valor a número
  setSelectedFamiliares((prevSelectedFamiliares) => {
    if (prevSelectedFamiliares.includes(familiarId)) {
      return prevSelectedFamiliares.filter(
        (familiarId) => familiarId !== familiarId
      );
    } else {
      return [...prevSelectedFamiliares, familiarId];
    }
  });
};

  // const handleEditFamiliar = (familiarId) => {
  //   const familiar = familiares.find((familiar) => familiar.id === familiarId);
  //  console.log(familiar)
  //   setModalIsOpen(true);

  // }

  const handleFamiliarNameChange = (e) => {
    const { value } = e.target;
    setFamiliares((prevFamiliares) => ({
      ...prevFamiliares,
      name: value,
    }));
  };

  const handleAfiliadoSearch = async (dni) => {
    try {
      const res = await api.get(`users/afiliados/${dni}`);
      const familiaresDisponibles = res.data.familiares;
      const afiliadoId = res.data.idafiliados;

      setFormData((prevFormData) => ({
        ...prevFormData,
        id_afiliado: afiliadoId,
      }));

      // Filtrar solo los familiares con categoría "Hijo/a"

      if (
        (familiaresDisponibles === null) |
        (familiaresDisponibles === undefined)
      ) {
        setError("No hay datos de Hijos/as asociados al afiliado");
        setIsLoading(false);
        return;
      }

      const familiaresHijos = familiaresDisponibles.filter(
        (familiar) => familiar.categoria === "Hijo/a"
      );

      if(familiaresHijos.length === 0){
           setError("No hay datos de Hijos/as asociados al afiliado");
        setIsLoading(false);
        return;
      }
      
      setFamiliares(familiaresHijos);

      comprobarBeneficios(familiaresHijos.map((familiar) => familiar.id));

      const initialBeneficios = familiaresHijos.reduce((acc, familiar) => {
        acc[familiar.id] = {
          usuario_otorgante: currentUser?.username,
          id: "",
          tipo: "Kit escolar",
          estado: "",
          afiliado_id: res.data.idafiliados,
          familiar_id: familiar.id,
          detalles: "",
          mochila: false,
          guardapolvo: "",
          utiles: false,
          año_escolar: "",
        };
        return acc;
      }, {});

      setBeneficio(initialBeneficios);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBeneficioOtorgado = async () => {
    

    try {
      const beneficioFamiliarSeleccionado = selectedFamiliares.map(
        (familiarId) => beneficio[familiarId]
      );
      const res = await api.post("/tasks/", beneficioFamiliarSeleccionado);
      const nuevoBeneficioIds = res.data.ids;

      // Actualizar el estado "beneficio" con la ID para cada familiar otorgado
      const updatedBeneficio = { ...beneficio };
      selectedFamiliares.forEach((familiarId, index) => {
        updatedBeneficio[familiarId].id = nuevoBeneficioIds[index];
      });

      setBeneficio(updatedBeneficio);
      handleNextStep();
      console.log(res.data);
      return res

      // Realizar acciones adicionales después de otorgar el beneficio
    } catch (err) {
      setError(err.response.data.message);
      console.log(err);
    }
  };

  const comprobarBeneficios = async (familiarIds) => {
    try {
      const queryParams = familiarIds.join(","); // Convertir a cadena separada por comas
      const res = await api.get(`/tasks/verified-kit-escolar/${queryParams}`);

      setBeneficiosOtorgados(res.data);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const areTodosBeneficiosOtorgados = (familiarId) => {
    const numericFamiliarId = parseInt(familiarId);

    const beneficiosDelFamiliar = beneficiosOtorgados.filter(
      (beneficio) => beneficio.familiar_id === numericFamiliarId
    );

    const mochilaOtorgada = beneficiosDelFamiliar.some(
      (beneficio) => beneficio.mochila
    );
    const guardapolvoOtorgado = beneficiosDelFamiliar.some(
      (beneficio) => beneficio.guardapolvo
    );
    const utilesOtorgados = beneficiosDelFamiliar.some(
      (beneficio) => beneficio.utiles
    );

    return mochilaOtorgada && guardapolvoOtorgado && utilesOtorgados;
  };

  const isBeneficioOtorgado = (familiarId, tipoBeneficio) => {
    const numericFamiliarId = parseInt(familiarId, 10);
    const beneficiosDelFamiliar = beneficiosOtorgados.filter(
      (beneficio) => beneficio.familiar_id === numericFamiliarId
    );

    switch (tipoBeneficio) {
      case "mochila":
        return beneficiosDelFamiliar.some((beneficio) => beneficio.mochila);
      case "guardapolvo":
        return beneficiosDelFamiliar.some(
          (beneficio) => beneficio.guardapolvo !== ""
        );
      case "utiles":
        return beneficiosDelFamiliar.some((beneficio) => beneficio.utiles);
      default:
        return false; // Tipo de beneficio no reconocido
    }
  };

  useEffect(() => {
    if (dni) {
      // Si hay un DNI válido en el estado local, realizar la búsqueda del afiliado
      handleAfiliadoSearch(dni);
    }
  }, [dni]);

    useEffect(() => {
  if (familiares.length < 5) {
    setShowButton(true);
    console.log("Mostrar botón: true");
    console.log(familiares.length)
  } else {
    setShowButton(false);
    console.log("Mostrar botón: false");
  }
}, [familiares]);

useEffect(() => {
  console.log(selectedFamiliares);
}, [selectedFamiliares]);


  return (
    <div className="bg-gray-200 h-screen w-screen sm:pl-80 ml-5">
      <div className="flex mb-10 mt-32 h-20">
        <img className=" w-12 h-12" src={Libro}></img>
        <div className="flex flex-col pl-4">
          <h2 className=" text-black text-3xl font-extrabold">
            Solicitar Beneficio: Kit Escolar
          </h2>
          <p className="p-2 font-bold text-[#757678]">
            Elige los hijos a los que quieras otorgarle un beneficio <br /> o
            añade uno si es necesario{" "}
          </p>
        </div>
      </div>

      <div className="flex justify-center bg-gray-200">
        <div className="sm:w-2/4 min-h-[35em] bg-white flex p-4 rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            currentStep === 1 && (
              // Step 1: Seleccionar hijos
              <div className="rounded w-full">
                <h3 className="text-black text-2xl font-bold">
                  Paso 1: Seleccionar Hijos/as
                </h3>
                {/* Display familiares checkboxes here */}
                {error && <p className="text-red-500">{error}</p>}
                {familiares.map((familiar) => (
                  <div key={familiar.id} className="flex justify-center">
                    <div className="flex justify-center items-center flex-col w-[95%]">
                      <div
                        key={`div_${familiar.id}`}
                        className={`flex items-center justify-between mt-10 border-l-4 border-[#006084] w-[95%] bg-gray-200  ${
                          areTodosBeneficiosOtorgados(familiar.id)
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <label
                          htmlFor={`familiar_${familiar.id}`}
                          className="font-semibold text-black p-3 cursor-pointer"
                        >
                          {familiar.name}
                        </label>

                        <div className="flex items-center pr-4  ">
                          {/* Checkbox for selecting familiar */}
                          <input
                            type="checkbox"
                            name="familiar_ids"
                            id={`familiar_${familiar.id}`}
                            value={familiar.id}
                            className="cursor-pointer custom-checkbox"
                            checked={selectedFamiliares.includes(familiar.id)}
                            onChange={handleFamiliarCheckboxChange}
                            disabled={areTodosBeneficiosOtorgados(familiar.id)}
                          />
                          <label
                            htmlFor={`familiar_${familiar.id}`}
                            className="check"
                          >
                            <svg className="w-18 h-18" viewBox="0 0 18 18">
                              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                              <polyline points="1 9 7 14 15 4"></polyline>
                            </svg>
                          </label>

                          {/* Estilizar el checkbox nativo */}
                          {/* <Checkbox selected={selectedFamiliares.includes(familiar.id)} /> */}
                        </div>
                      </div>

                      {
                        <div
                          key={familiar.id}
                          className="flex justify-around pt-1"
                        >
                          <PiBackpackDuotone className="text-gray-400"/>
                          <p
                            className={`px-1 text-xs font-semibold text-gray-400`}
                          >
                            
                           Útiles:{" "}
                            <strong
                              className={`px-1 text-xs font-semibold ${
                                isBeneficioOtorgado(familiar.id, "utiles")
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {isBeneficioOtorgado(familiar.id, "utiles")
                                ? "ENTREGADO"
                                : "SIN ENTREGAR"}
                            </strong>
                          </p>
                              <TbTools className="text-gray-400"/>
                          <p
                            className={`px-1 text-xs font-semibold text-gray-400`}
                          >
                            Mochila:{" "}
                            <strong
                              className={`px-1 text-xs font-semibold ${
                                isBeneficioOtorgado(familiar.id, "mochila")
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {isBeneficioOtorgado(familiar.id, "mochila")
                                ? "ENTREGADO"
                                : "SIN ENTREGAR"}
                            </strong>
                          </p>
                            <TbJacket className="text-gray-400"/>
                          <p
                            className={`px-1 text-xs font-semibold text-gray-400`}
                          >
                            Guardapolvo:{" "}
                            <strong
                              className={`px-1 text-xs font-semibold ${
                                isBeneficioOtorgado(familiar.id, "guardapolvo")
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {isBeneficioOtorgado(familiar.id, "guardapolvo")
                                ? "ENTREGADO"
                                : "SIN ENTREGAR"}
                            </strong>
                          </p>
                        </div>
                      }
                    </div>
                  </div>
                ))}

                <div className="flex w-full h-2/7 justify-between items-end pt-4 px-4">
                  { showButton ? (
                  <button
                    className="mt-4 bg-[#006084] w-36 font-bold text-white rounded-lg p-2 hover:bg-opacity-75"
                    onClick={() => setModalIsOpen(true)}
                  >
                    + Cargar Hijo/a
                  </button>
                  ) : (
                      <p className="text-[#006084] font-bold">Limite de hijos/as alcanzado.</p>
                  )
                    }
                  
                  <button
                    className="mt-4 bg-[#23A1D8] w-36 font-bold text-white rounded-lg p-2 hover:bg-opacity-75"
                    onClick={handleNextStep}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )
          )}

          {currentStep === 2 && (
            // Step 2: Detalles de productos
            <div className="rounded w-full">
              <h3 className="text-black text-2xl font-bold">
                Paso 2: Items a Entregar
              </h3>
              {/* Display product details for selected familiares */}
              {selectedFamiliares.map((familiarId) => {
                const familiar = familiares.find((f) => f.id === familiarId);
                return (
                  <div className="pt-10 px-10  " key={familiar.id}>
                    <h4 className="text-black text-lg uppercase w-max pb-1 font-semibold">
                      {familiar.name}:
                    </h4>
                    <div className="flex flex-col justify-between">
                      <div className="flex justify-between items-center border-l-4 border-[#006084] bg-gray-100 mt-2 px-8 h-10">
                        <label className="font-semibold text-gray-600">
                          Año Escolar
                        </label>
                        <select
                          name="año_escolar"
                          value={beneficio.año_escolar}
                          onChange={(e) => handleInputChange(e, familiarId)}
                          required
                          className="cursor-pointer bg-gray-100"
                        >
                          <option disabled selected value="">
                            Seleccionar Año
                          </option>
                          <option value="Pre-Jardin">Pre-Jardin</option>
                          <option value="Jardín">Jardin</option>
                          <option value="1° A 3° Grado">1° A 3° Grado</option>
                          <option value="4° A 6° Grado">4° A 6° Grado</option>
                        </select>
                      </div>

                      <div
                        className={`flex items-center justify-between border-l-4 ${
                          isBeneficioOtorgado(familiar.id, "mochila")
                            ? "border-red-700"
                            : "border-[#006084]"
                        } bg-gray-100 mt-2 px-8 h-10`}
                      >
                       
                        <label
                          htmlFor={`checkbox_mochila${familiar.id}`}
                          className={`mr-2 flex items-center font-semibold ${
                            isBeneficioOtorgado(familiar.id, "mochila")
                              ? "text-gray-300"
                              : "text-gray-600"
                          } `}
                        >
                          <span className="mr-2">
                            <PiBackpackDuotone />
                          </span>
                          
                          Mochila
                        </label>
                        <div className="flex">
                        <input
                          id={`checkbox_mochila${familiar.id}`}
                          name="mochila"
                          type="checkbox"
                          className={`custom-checkbox ${
                            isBeneficioOtorgado(familiar.id, "mochila")
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          disabled={isBeneficioOtorgado(familiar.id, "mochila")}
                          checked={beneficio.mochila}
                          onChange={(e) => handleInputChange(e, familiarId)}
                        />
                        <label
                          className="check"
                          htmlFor={`checkbox_mochila${familiar.id}`}
                        >
                          <svg className="w-18 h-18" viewBox="0 0 18 18">
                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                          </svg>
                        </label>
                        </div>
                      </div>

                      <div
                        className={`flex items-center justify-between border-l-4 ${
                          isBeneficioOtorgado(familiar.id, "utiles")
                            ? "border-red-700"
                            : "border-[#006084]"
                        }  bg-gray-100 mt-2 px-8 h-10`}
                      >
                        <label
                        htmlFor={`checkbox_utiles${familiar.id}`}
                          className={`mr-2 flex items-center font-semibold ${
                            isBeneficioOtorgado(familiar.id, "utiles")
                              ? "text-gray-300"
                              : "text-gray-600"
                          } `}
                        >
                           <span className="mr-2">
                            <TbTools />
                          </span>
                          Útiles
                        </label>
                        <div className="flex">
                        <input
                          id={`checkbox_utiles${familiar.id}`}
                          name="utiles"
                          type="checkbox"
                          className={`custom-checkbox ${
                            isBeneficioOtorgado(familiar.id, "utiles")
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          disabled={isBeneficioOtorgado(familiar.id, "utiles")}
                          checked={beneficio.utiles}
                          onChange={(e) => handleInputChange(e, familiarId)}
                        />
                        <label
                          className="check"
                          htmlFor={`checkbox_utiles${familiar.id}`}
                        >
                          <svg className="w-18 h-18" viewBox="0 0 18 18">
                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                          </svg>
                        </label>
                        </div>
                      </div>
                      <div
                        className={`flex items-center justify-between border-l-4 ${
                          isBeneficioOtorgado(familiar.id, "guardapolvo")
                            ? "border-red-700"
                            : "border-[#006084]"
                        }  bg-gray-100 mt-2 px-8 h-10`}
                      >
                        <label
                          className={`mr-2 flex items-center font-semibold ${
                            isBeneficioOtorgado(familiar.id, "guardapolvo")
                              ? "text-gray-300"
                              : "text-gray-600"
                          } `}
                        >
                          <span className="mr-2">
                            <TbJacket />
                          </span>
                          Guardapolvo
                        </label>
                        <select
                          name="guardapolvo"
                          className={`bg-gray-100 ${
                            isBeneficioOtorgado(familiar.id, "guardapolvo")
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          disabled={isBeneficioOtorgado(
                            familiar.id,
                            "guardapolvo"
                          )}
                          value={beneficio.guardapolvo}
                          onChange={(e) => handleInputChange(e, familiarId)}
                          required
                        >
                          <option selected value="">
                            Ninguno
                          </option>
                          <option value="XS">XS</option>
                          <option value="S">S</option>
                          <option value="M">M</option>
                          <option value="M">L</option>
                          <option value="M">XL</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex w-full h-2/6 justify-between items-end pt-6 px-4">
                <button
                  className="mt-4 bg-gray-500 py-2 hover:bg-gray-900 w-36 font-bold text-white rounded-lg p-2 hover:bg-opacity-75"
                  onClick={handleBackStep}
                >
                  Volver
                </button>
                <button
                  className="mt-4 bg-[#23A1D8] w-36 font-bold text-white rounded-lg p-2 hover:bg-opacity-75"
                  onClick={handleNextStep}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
         
         {currentStep === 3 && (
  // Step 3: Resumen y Otorgar Beneficios
  <div className="rounded w-full">
    <h3 className="text-black font-bold text-3xl">Paso 3: Resumen de Entrega</h3>
    {selectedFamiliares.map((familiarId) => {
      const familiar = familiares.find((f) => f.id === familiarId);
      const beneficioIndividual = beneficio[familiarId]; // Obtener el beneficio individual para este familiar
      return (
        <div key={familiar.id} className="bg-gray-100 border-b-2 border-[#006084] shadow-lg rounded p-4 mt-4">
          <h4 className="text-black text-2xl uppercase font-semibold">
            {familiar.name}:
          </h4>
          <p className="text-gray-600 text-lg mt-2">
            - Año Escolar:{" "}
            <span className="font-normal">
              {beneficioIndividual.año_escolar
                ? beneficioIndividual.año_escolar
                : "Omitió cargar el año escolar"}
            </span>
          </p>
          {beneficioIndividual.mochila && (
            <p className="text-gray-600 text-lg mt-2">
              - Mochila:{" "}
              <span className="text-green-500 font-bold">Entregar</span>
            </p>
          )}
          {beneficioIndividual.guardapolvo && (
            <p className="text-gray-600 text-lg mt-2">
              - Guardapolvo:{" "}
              <span className="text-green-500 font-bold">
                Entregar Talle {beneficioIndividual.guardapolvo}
              </span>
            </p>
          )}
          {beneficioIndividual.utiles && (
            <p className="text-gray-600 text-lg mt-2">
              - Útiles:{" "}
              <span className="text-green-500 font-bold">Entregar</span>
            </p>
          )}
        </div>
                );
              })}
             <div className="flex w-full h-2/6 justify-between items-end pt-6 px-4">
                <button
                  className="mt-4 bg-gray-500 py-2 hover:bg-gray-900 w-36 font-bold text-white rounded-lg p-2 hover:bg-opacity-75"
                  onClick={handleBackStep}
                >
                  Volver
                </button>
                <button
                  className="mt-4 bg-[#23A1D8] w-36 font-bold text-white rounded-lg p-2 hover:bg-opacity-75"
                  onClick={handleNextStep}
                >
                  Siguiente
                </button>
              </div>
               
                    
              {/* <div className="flex w-full h-full justify-between items-end pt-6 px-4">
                
              
              </div> */}
            </div>
              
              
         
            
          )}

           {currentStep === 5 && (
            <>
              {error ? (
                <>
                  <div className="flex flex-col h-full w-full justify-center items-center space-y-4">
                    {/* <BiError className="text-[8rem] justify-center items-center text-[#006084]" /> */}
                    <p className="font-extrabold text-3xl align-middle justify-center items-center text-red-500">
                      Ocurrio un error durante la carga de datos, por favor verificar los datos antes de reintentar:<br></br>
                      {error}
                    </p>
                     <button
                      className="btn w-1/3"
                      onClick={() => navigate("/home")}
                    >
                      <span>VOLVER</span>
                    </button>
                  </div>
                  
               
                </>
              ) : (
                <>
                  <div className="flex flex-col h-full w-full justify-center items-center space-y-4">
                    <img className="w-[4rem] text-[#006084]" src={Libro} />
                    <p className="font-extrabold text-3xl text-[#006084]">
                      El beneficio ha sido registrado con éxito.
                    </p>
                    <p className="font-bold text-xl w-3/4 text-gray-500">
                      Por favor, verifique si se cargaron los datos
                      correctamente y haga entrega de los items seleccionados.
                    </p>
                     
                    <div>
                  <h3 className="font-bold text-lg text-[#006084]">Resumen de entrega:</h3>
                  <ul className="list-disc pl-6 mt-2">
                    {selectedFamiliares.map((familiarId) => {
                      const familiar = familiares.find((f) => f.id === familiarId);
                      const beneficioIndividual = beneficio[familiarId];
                      return (
                        <ul key={familiarId} className="py-1">
                          <div className="flex items-center">
                            <svg className="w-4 h-2 mr-2 fill-current text-[#006084]" viewBox="0 0 20 20">
                              <circle cx="10" cy="10" r="9" />
                            </svg>
                            <span>{familiar.name}</span>
                          </div>
                          <p className="ml-6 text-sm text-gray-500">
                            Número de seguimiento: {beneficioIndividual.id}
                          </p>
                           <p className="ml-6 font-semibold text-sm text-gray-500">
                            Items: 
                          </p>
                          <p className="ml-6 text-sm text-gray-500">
                            {beneficioIndividual.mochila == true ? `Mochila ${beneficioIndividual.año_escolar}` : ""}
                          </p>
                          <p className="ml-6 text-sm text-gray-500">
                            {beneficioIndividual.utiles == true ? `Utiles` : ""}
                          </p>
                          <p className="ml-6 text-sm text-gray-500">
                            {beneficioIndividual.guardapolvo ? `Guardapolvo talle: ${beneficioIndividual.guardapolvo}` : ""}
                          </p>
                        </ul>
                      );
                    })}
                  </ul>
                  </div>
                  <div className="h-full w-full items-end pb-10 justify-center flex">
                    <button
                      className="btn w-1/3"
                      onClick={() => navigate("/home")}
                    >
                      <span>VOLVER</span>
                    </button>
                    </div>
                  </div>
                  
                </>
              )}
            </>
          )}


          {currentStep === 4 && (
            // Step 4: Estado de Carga del Beneficio Otorgado
            <div className="w-full space-y-6">
              <h3 className=" font-bold text-3xl text-black">
                Paso 4: Estado de Carga del Beneficio.
              </h3>
              <p className="font-semibold text-lg text-[#006084]">Debes solicitar al trabajador que firme el remito por los items que se entregan en el momento, los que no seleccionaste quedaran pendientes para retirar.</p>
              <div className="flex flex-col w-full mt-4 justify-center items-center px-4">
                <Files
                    label="Subir foto de REMITO DE ENTREGA"
                    instructions="Recuerde que debe estar firmada por el trabajador."
                    
                    onUpload={handleBeneficioOtorgado}
                  />
                  <button
                  className="mt-4 bg-gray-500 py-2 hover:bg-gray-900 w-36 font-bold text-white rounded-lg p-2 hover:bg-opacity-75"
                  onClick={handleBackStep}
                >
                  Volver
                </button>
                  </div>
           
            </div>
          )}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Editar Familiares"
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                border: "none",
                background: "white",
                color: "black",
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                padding: "2rem",
                width: "80%",
                maxWidth: "40rem",
              },
            }}
          >
            <h2 className="text-2xl font-bold mb-4">Añadir Hijos</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-2">
              <label className="block font-bold mb-1">
                Nombre y Apellido{" "}
                <strong className="text-red-500 text-sm">
                  {validationErrors.name}
                </strong>
              </label>
              <Input
                required
                name="name"
                className="w-full"
                type="text"
                value={formData.name}
                onChange={handleChangeHijo}
              />
            </div>

            <div className="mb-2">
              <label className="block font-bold mb-1">
                DNI{" "}
                <strong className="text-red-500 text-sm">
                  {validationErrors.dni}
                </strong>
              </label>
              <Input
                required
                name="dni"
                className="w-full"
                type="text"
                value={formData.dni}
                onChange={handleChangeHijo}
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-1">
                Fecha de Nacimiento{" "}
                <strong className="text-red-500 text-sm">
                  {validationErrors.fecha_de_nacimiento}
                </strong>
              </label>
              <Input
                required
                name="fecha_de_nacimiento"
                className="w-full"
                type="date"
                value={formData.fecha_de_nacimiento}
                onChange={handleChangeHijo}
              />
            </div>

            <div className="flex flex-col justify-center items-center mt-4 rounded-xl min-h-[6rem] w-[100%] bg-gray-200 p-2">
              <p className="font-bold">Subir foto de DNI:</p>
              <p className="text-sm font-semibold text-gray-600 max-w-[80%] text-center mt-1">
                Frente y Dorso.
              </p>

              <label
                htmlFor="dni_img_familiar"
                className="cursor-pointer mt-auto mb-2"
              >
                <FiDownload className="text-5xl text-[#23A1D8]" />
              </label>

              <input
                type="file"
                name="dni_img_familiar"
                id="dni_img_familiar"
                multiple
                required
                style={{ display: "none" }}
                onChange={handleDniImgChange}
              />

              <p className="text-xs font-semibold text-gray-600 text-center">
                Click aquí para cargar o{" "}
                <strong className="text-[#006084]">elegir archivos.</strong>
                <strong className="text-red-500 text-xl">
                  {validationErrors.dni_img_familiar}
                </strong>
              </p>
              {validationErrors.dni_img_familiar && (
                <p className="text-red-500"></p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                className="mt-4 bg-red-600 w-36 font-bold text-white rounded-lg p-2 hover:bg-opacity-75"
                onClick={() => setModalIsOpen(false)}
              >
                Cerrar
              </button>
              <button
                className="mt-4 bg-[#006084] w-36 font-bold text-white rounded-lg p-2 hover:bg-opacity-75"
                onClick={handleRegister}
              >
                Confirmar
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default KitEscolar;

{
  /* // return ( */
}
{
  /* //     <div className="ml-5 sm:pl-64 h-screen w-screen bg-black"> */
}
//       {/* ...Resto del código... */}

//       {/* FORMULARIO PARA OTORGAR BENEFICIO */}
{
  /* //       <div className="sm:w-[85vw] p-4">
//         <form className="p-4 rounded-lg dark:border-gray-700">
//           <h3 className="text-white">Nuevo Beneficio</h3>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="text-white">Tipo de Beneficio: Kit Escolar</label>
            
//             </div>
//             <div>
//               <label className="text-white">DNI del Afiliado</label>
//               <input */
}
{
  /* //                 type="text"
//                 name="afiliado_dni"
//                 value={dni}
//                 disabled={true}
//                 required
//               />
//             </div>
//             <div>
//               <label className="text-white">Familiar Beneficiario</label>
//               <select */
}
{
  /* //                 name="familiar_id" */
}
{
  /* //                 value={//beneficio.familiar_id} */
}
{
  /* //                 onChange={//handleInputChange} */
}
{
  /* //                 required
//               > */
}
{
  /* //                 <option value="">Seleccionar Hijo/a</option>
//                 {//familiares.map((familiar) => (
//                   <option key={familiar.id} value={familiar.id}> */
}
{
  /* //                     {familiar.name} - {familiar.dni}
//                   </option>
//                 ))}
//               </select>
//             </div> */
}

{
  /* //             <div>
//               <label className="text-white">Útiles</label>
//               <input
//                 name="utiles"
//                 type="checkbox"
//                 disabled={beneficiosOtorgados.some((beneficio) => beneficio.utiles)}
//                 checked={beneficio.utiles}
//                 onChange={handleInputChange}
//                /> */
}
{
  /* //             </div>
//             <div>
//               <label className="text-white">Mochila</label>
//               <input
//                 name="mochila"
//                 type="checkbox"
//                 disabled={beneficiosOtorgados.some((beneficio) => beneficio.mochila)}
//                 checked={beneficio.mochila}
//                 onChange={handleInputChange}
//                /> */
}
{
  /* //             </div>

//        <div>
//   <label className="text-white">Guardapolvo</label>
//   <select */
}
{
  /* //     name="guardapolvo"
//     disabled={beneficiosOtorgados.some((beneficio) => beneficio.guardapolvo !== "")}
//     value={beneficio.guardapolvo}
//     onChange={handleInputChange}
//     required
//   >
//     <option value="">Seleccionar Talle</option>
//     <option value="XS">XS</option>
//       <option value="S">S</option>
//       <option value="M">M</option>
//   </select>
// </div> */
}
{
  /* 
//              <div>
//                   <label className="text-white">Año Escolar</label>
//                   <select
//                     name="año_escolar"
//                     value={beneficio.año_escolar}
//                     onChange={handleInputChange}
//                     required
//                   > */
}
{
  /* //                     <option value="">Seleccionar Año</option>
//                     <option value="Pre-Jardin">Pre-Jardin</option>
//                       <option value="Jardín">Jardin</option>
//                       <option value="1° A 3° Grado">1° A 3° Grado</option>
//                       <option value="4° A 6° Grado">4° A 6° Grado</option>
//                   </select>
//           </div> */
}

{
  /* //             <div>
//               <label className="text-white">Detalles</label>
//               <textarea
//                 name="detalles"
//                 value={beneficio.detalles}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           <p className="text-white">
//  {todosBeneficiosOtorgados && (
//   <p className="text-white">Todos los items ya han sido otorgados.</p>
// )}
// </p> */
}

{
  /* //           </div> */
}
{
  /* //           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             onClick={handleBeneficioOtorgado}
//             disabled={
//           beneficiosOtorgados.some((beneficio) => beneficio.mochila) &&
//           beneficiosOtorgados.some((beneficio) => beneficio.guardapolvo !== "") &&
//           beneficiosOtorgados.some((beneficio) => beneficio.utiles)
//             }
//           > */
}
{
  /* //             Otorgar Beneficio */
}
{
  /* //           </button>
//         </form> */
}
{
  /* //       </div> */
}
//        {/* Modal para mostrar el resumen */}
{
  /* //       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={() => setModalIsOpen(false)} */
}
{
  /* //         contentLabel="Resumen del Beneficio"
//         style={{ */
}
{
  /* //           overlay: {
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//           },
//           content: { */
}
{
  /* //             border: "none",
//             background: "white",
//             color: "black",
//             top: "50%",
//             left: "50%",
//             right: "auto",
//             bottom: "auto",
//             marginRight: "-50%",
//             transform: "translate(-50%, -50%)",
//           },
//         }}
//       > */
}
{
  /* //         <h3 className="text-black">Resumen del Beneficio Otorgado</h3>
//         <pre>
//           {formatResumen(beneficio, familiares.find((f) => f.id === beneficio.familiar_id, dni))}
//         </pre>
//         <button 
//          onClick={() => setModalIsOpen(false)} */
}
{
  /*           
//          >Cerrar</button>
//       </Modal>
//     </div>
//   ); */
}
