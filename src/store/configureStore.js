import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import api from "./middleware/api";
import usersEliminar from "./users.eliminar";
import lunaDeMiel from "./lunaDeMiel";

import kitEscolar from "./kitEscolar";
import envios from "./envios";
import stock from "./stock";
import seccionales from "./seccionales";
import kitMaternal from "./kitMaternal";

export default function store() {
  return configureStore({
    reducer: {
      users: usersReducer,
      usersRemove: usersEliminar,
      lunaMiel: lunaDeMiel,
      kitEscolar: kitEscolar,
      envios: envios,
      stock: stock,
      seccionales: seccionales,
      kitMaternal: kitMaternal,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
  });
}
