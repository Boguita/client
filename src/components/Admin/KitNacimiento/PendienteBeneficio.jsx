import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { loadKitMaternal } from "../../../store/kitMaternal";
import { pendienteBeneficio } from "./Service";
import { useState } from "react";

const PendienteBeneficio = ({ row }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleOk = async ({ id }) => {
    setLoading(true);
    swal({
      title: "",
      text: "¿Estas seguro de mover este beneficio a pendientes?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const status = await pendienteBeneficio(id);
        if (status === 200) {
          swal({
            title: "Éxito!",
            text: "Beneficio movido a pendiente.",
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
      label="Pendiente"
      icon="pi pi-thumbs-down-fill"
      size="small"
      rounded
      outlined
      loading={loading}
      severity="info"
      onClick={() => handleOk(row)}
    />
  );
};

export default PendienteBeneficio;
