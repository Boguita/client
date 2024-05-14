import swal from "sweetalert";
import api from "../../../common/Axiosconfig";

export async function editarSeccional({ id }, formData) {
  try {
    const res = await api.put(`/tasks/seccionales/${id}`, formData);
    return res.status;
  } catch (error) {
    console.log(error);
    swal({
      title: "Error!",
      text: error.response.data.error,
      icon: "error",
    });
    return error.response;
  }
}

export  async function crearSeccional(formData) {
  try {
    const res = await api.post("/tasks/seccional", formData);
    return res.status;
  } catch (error) {
    console.log(error);
    swal({
      title: "Error!",
      text: error.response.data.error,
      icon: "error",
    });
    return error.response;
  }
}

export async function eliminarSeccional({ id }) {
  try {
    const res = await api.delete(`/tasks/seccionales/${id}`);
    return res.status;
  } catch (error) {
    console.log(error);
    swal({
      title: "Error!",
      text: error.response.data.error,
      icon: "error",
    });
    return error.response;
  }
}