import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { removeUser } from "../../../store/users.eliminar";
import { loadUsers } from "../../../store/users";

const EliminarAfiliado = ({ row }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.usersRemove);

  const handleEliminar = async ({ username, email }) => {
    swal({
      title: "",
      text: "¿Estas seguro que deseas eliminar este usuario?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        dispatch(removeUser({ username, email }));
        swal({
          title: "Éxito!",
          text: "Afiliado eliminado.",
          icon: "success",
        });
      }
      dispatch(loadUsers({ params: 'refresh' }));
    });
  };
  return (
    <Button
      icon="pi pi-trash"
      size="small"
      rounded
      outlined
      severity="danger"
      loading={loading}
      onClick={() => handleEliminar(row)}
    />
  );
};

export default EliminarAfiliado;
