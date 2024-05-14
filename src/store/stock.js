import { apiCallBegan } from "./api";
import slice from "./store.actions";

const handleSlice = slice("Stock");
const { postsRequested, postsReceived, postsRequestFailed } =
  handleSlice.actions;

export const loadStock = (params) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "tasks/stock",
      onStart: postsRequested.type,
      onSuccess: postsReceived.type,
      onError: postsRequestFailed.type,
      slice: "stock",
      params: params,
    })
  );
};

export const selectAllStock = (state) => state.stock;
export default handleSlice.reducer;
