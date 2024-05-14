import swal from "sweetalert";
import api from "../../../common/Axiosconfig";

export async function getList() {
  try {
    const res = await api.get(`/users/afiliados`);
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
