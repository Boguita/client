import { apiCallBegan } from "./api";

import slice from "./store.actions";

const { postsRequested, postsReceived, postsRequestFailed } =
  slice("usuario.eliminar").actions;

export const removeUser =
  ({ username, email }) =>
  (dispatch) => {
    return dispatch(
      apiCallBegan({
        url: "users/delete",
        method: "delete",
        data: {
          username,
          email,
        },
        onStart: postsRequested.type,
        onSuccess: postsReceived.type,
        onError: postsRequestFailed.type,
      })
    );
  };
export const selectUserRemove = (state) => state.users.remove;
export default slice("usuario.eliminar").reducer;
