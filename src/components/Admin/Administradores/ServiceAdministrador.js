import swal from "sweetalert";
import api from "../../../common/Axiosconfig";

export async function getList() {
  try {
    const res = await api.get(`/users`);
    return res.data;
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

export async function getBeneficioOtorgado(id) {
  try {
    const res = await api.get(`/tasks/beneficio-otorgado/${id}`);
    return res.data;
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

export async function putAprobarUsuario({ username, email }) {
  try {
    const res = await api.put(`/users/approved`, { username, email });
    return res.data;
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

export async function putRechazarUsuario({ username, email }) {
  try {
    const res = await api.put(`/users/decline`, { username, email });
    return res.data;
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

export async function removeAfiliado(id) {
  try {
    const res = await api.delete(`/users/afiliados/${id}`);
    return res.status;
  } catch (error) {
    swal({
      title: "Error!",
      text: error.response.data.error,
      icon: "error",
    });
  }
}
