import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { loadKitMaternal } from "../../../store/kitMaternal";
import { eliminarBeneficio } from "./Service";
import { useState } from "react";

const EliminarBeneficio = ({ row }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleOk = async ({ id }) => {
    setLoading(true);
    swal({
      title: "",
      text: "¿Estas seguro que deseas eliminar este beneficio?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const status = await eliminarBeneficio(id);
        if (status === 200) {
          swal({
            title: "Éxito!",
            text: "Beneficio eliminado.",
            icon: "success",
          });
          dispatch(loadKitMaternal({ params: 'refresh' }));
        }
      }
      setLoading(false);
    });
  };
  return (
    <Button
      icon="pi pi-trash"
      label="Eliminar"
      size="small"
      rounded
      outlined
      severity="danger"
      loading={loading}
      onClick={() => handleOk(row)}
    />
  );
};

export default EliminarBeneficio;
