import { apiCallBegan } from "./api";
import slice from "./store.actions";

const { postsRequested, postsReceived, postsRequestFailed } =
  slice("usuarios").actions;

export const loadUsers = (params) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "users",
      onStart: postsRequested.type,
      onSuccess: postsReceived.type,
      onError: postsRequestFailed.type,
      slice: "users",
      params: params,
    })
  );
};

export const selectAllUsers = (state) => state.users;
export default slice("usuarios").reducer;
