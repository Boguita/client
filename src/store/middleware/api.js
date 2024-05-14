import axios from "axios";
import * as actions from "../api";

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError, slice, params } = action.payload;

    if (!slice) {
      console.error("Slice name is required in the apiCallBegan payload.");
      return;
    }

    if (onStart) dispatch({ type: onStart });

    const state = getState();
    const existingData = state[slice].list;
    console.log("valor de params", params);
    if (params?.params !== "refresh") {
      if (existingData && existingData.length > 0) {
        if (onSuccess) {
          dispatch({ type: onSuccess, payload: existingData });
        }
        return dispatch({
          type: actions.apiCallSuccess.type,
          payload: existingData,
        });
      }
    }

    next(action);

    try {
      const { VITE_API: baseURL } = import.meta.env;
      const apiAxios = axios.create({
        baseURL,
        withCredentials: true,
      });

      const response = await apiAxios.request({
        url,
        method,
        data,
      });
      // Si se realiza un cambio en los datos, puedes despachar una acción específica
      // para actualizar el estado en el componente
      if (data && onSuccess) {
        dispatch({ type: onSuccess, payload: data });
      } else {
        // Si no hay cambios, puedes seguir despachando la acción success con los datos de la API
        dispatch({ type: actions.apiCallSuccess.type, payload: response.data });
        if (onSuccess) {
          dispatch({ type: onSuccess, payload: response.data });
        }
      }
    } catch (error) {
      //General
      dispatch(actions.apiCallFailed(error.message));
      //Specific
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
