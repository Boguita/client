import { apiCallBegan } from "./api";
import slice from "./store.actions";

const handleSlice = slice("LunaDeMiel");
const { postsRequested, postsReceived, postsRequestFailed } =
  handleSlice.actions;

export const loadLunaMiel = (params) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "tasks/luna-de-miel",
      onStart: postsRequested.type,
      onSuccess: postsReceived.type,
      onError: postsRequestFailed.type,
      slice: "lunaMiel",
      params: params,
    })
  );
};

export const selectAllLunaMiel = (state) => state.lunaMiel;
export default handleSlice.reducer;
