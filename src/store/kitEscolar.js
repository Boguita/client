import { apiCallBegan } from "./api";
import slice from "./store.actions";

const handleSlice = slice("KitEscolar");
const { postsRequested, postsReceived, postsRequestFailed } =
  handleSlice.actions;

export const loadKitEscolar = (params) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "tasks/kit-escolar",
      onStart: postsRequested.type,
      onSuccess: postsReceived.type,
      onError: postsRequestFailed.type,
      slice: "kitEscolar",
      params: params,
    })
  );
};

export const selectAllKitEscolar = (state) => state.kitEscolar;
export default handleSlice.reducer;
