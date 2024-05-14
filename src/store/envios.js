import { apiCallBegan } from "./api";
import slice from "./store.actions";

const handleSlice = slice("Envíos");
const { postsRequested, postsReceived, postsRequestFailed } =
  handleSlice.actions;

export const loadEnvios = (params) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "tasks/stock-enviado",
      onStart: postsRequested.type,
      onSuccess: postsReceived.type,
      onError: postsRequestFailed.type,
      slice: "envios",
      params: params,
    })
  );
};

export const selectAllEnvios = (state) => state.envios;
export default handleSlice.reducer;
