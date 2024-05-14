import { apiCallBegan } from "./api";
import slice from "./store.actions";

const handleSlice = slice("KitMaternal");
const { postsRequested, postsReceived, postsRequestFailed } =
  handleSlice.actions;

export const loadKitMaternal = (params) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "tasks/kit-maternal",
      onStart: postsRequested.type,
      onSuccess: postsReceived.type,
      onError: postsRequestFailed.type,
      slice: "kitMaternal",
      params: params,
    })
  );
};

export const selectAllKitMaternal = (state) => state.kitMaternal;
export default handleSlice.reducer;
