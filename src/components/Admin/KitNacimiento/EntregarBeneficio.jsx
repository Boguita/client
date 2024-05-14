import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { loadKitMaternal } from "../../../store/kitMaternal";
import { aprobarBeneficio } from "./Service";
import { useState } from "react";

const EntregarBeneficio = ({ row }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleOk = async ({ id }) => {
    setLoading(true);
    swal({
      title: "",
      text: "¿Estas seguro que deseas aprobar este beneficio?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const status = await aprobarBeneficio(id);
        if (status === 200) {
          swal({
            title: "Éxito!",
            text: "Beneficio enviado.",
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
      className="mr-1"
      label="Enviar"
      icon="pi pi-thumbs-up-fill"
      size="small"
      rounded
      outlined
      loading={loading}
      onClick={() => handleOk(row)}
    />
  );
};

export default EntregarBeneficio;
