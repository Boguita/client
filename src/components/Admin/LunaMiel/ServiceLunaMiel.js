import swal from "sweetalert";
import api from "../../../common/Axiosconfig";

export async function aprobarBeneficio(id) {
  try {
    const res = await api.put(`/tasks/${id}`, {
      estado: "Entregado",
      fechaEntrega: new Date(),
    });
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

export async function rechazarBeneficio(id) {
  try {
    const res = await api.put(`/tasks/${id}`, {
      estado: "Rechazado",
    });
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
