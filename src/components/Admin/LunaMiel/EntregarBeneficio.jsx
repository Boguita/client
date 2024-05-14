import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { loadLunaMiel } from "../../../store/lunaDeMiel";
import { aprobarBeneficio } from "./ServiceLunaMiel";

const EntregarBeneficio = ({ row }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.usersRemove);

  const handleOk = async ({ id }) => {
    swal({
      title: "",
      text: "¿Estas seguro que deseas entregar este beneficio?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const status = await aprobarBeneficio(id);
        if (status === 200) {
          swal({
            title: "Éxito!",
            text: "Beneficio aprobado.",
            icon: "success",
          });
          dispatch(loadLunaMiel({ params: 'refresh' }));
        }
      }
    });
  };
  return (
    <Button
      className="mr-1"
      label="Aprobar"
      icon="pi pi-check"
      size="small"
      rounded
      outlined
      loading={loading}
      onClick={() => handleOk(row)}
    />
  );
};

export default EntregarBeneficio;
