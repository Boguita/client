import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { loadKitMaternal } from "../../../store/kitMaternal";
import { rechazarBeneficio } from "./Service";
import { useState } from "react";

const RechazarBeneficio = ({ row }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleOk = async ({ id }) => {
    setLoading(true);
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
          dispatch(loadKitMaternal({ params: 'refresh' }));
        }
      }
      setLoading(false);
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
