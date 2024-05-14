import { apiCallBegan } from "./api";
import slice from "./store.actions";

const handleSlice = slice("Seccionales");
const { postsRequested, postsReceived, postsRequestFailed } =
  handleSlice.actions;

export const loadSeccionales = (params) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "tasks/seccionales",
      onStart: postsRequested.type,
      onSuccess: postsReceived.type,
      onError: postsRequestFailed.type,
      slice: "seccionales",
      params: params,
    })
  );
};

export const selectAllSeccionales = (state) => state.seccionales;
export default handleSlice.reducer;
