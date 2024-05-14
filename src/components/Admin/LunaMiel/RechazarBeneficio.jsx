import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { loadLunaMiel } from "../../../store/lunaDeMiel";
import { rechazarBeneficio } from "./ServiceLunaMiel";

const RechazarBeneficio = ({ row }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.usersRemove);

  const handleOk = async ({ id }) => {
    swal({
      title: "",
      text: "¿Estas seguro que deseas rechazar este beneficio?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const status = await rechazarBeneficio(id);
        if (status === 200) {
          swal({
            title: "Éxito!",
            text: "Beneficio rechazado.",
            icon: "success",
          });
          dispatch(loadLunaMiel({ params: 'refresh' }));
        }
      }
    });
  };
  return (
    <Button
      label="Rechazar"
      icon="pi pi-times"
      size="small"
      rounded
      outlined
      severity="danger"
      loading={loading}
      onClick={() => handleOk(row)}
    />
  );
};

export default RechazarBeneficio;
