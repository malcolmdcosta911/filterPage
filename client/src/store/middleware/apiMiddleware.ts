import axios, { AxiosError } from "axios";
import * as actions from "../api";

const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    // console.log(action.type != actions.apiCallBegin.type);
    if (action.type != actions.apiCallBegin.type) return next(action);

    const {
      url,
      onSuccess,
      data: dataToPass,
      method,
      params,
      onStart,
      onError,
    } = action.payload;
    if (onStart) {
      dispatch({ type: onStart });
    }
    next(action);

    try {
      const { data } = await axios.request({
        baseURL: import.meta.env.VITE_APP_API_URL,
        timeout: 10000,
        url,
        method,
        params,
        data: dataToPass,
        //headers: { "X-Custom-Header": "foobar" },
      });
      // console.log(data);
      //dispatched 2 actions

      //testing
      dispatch({ type: actions.apiCallSuccess.type, payload: data });

      //general
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: data });
      }
    } catch (error) {
      const axiosError = error as AxiosError; // Type assertion

      // console.error(error);
      //testing
      dispatch({
        type: actions.apiCallFailed.type,
        payload: axiosError.message,
      });

      //general
      if (onError) {
        dispatch({ type: onError, payload: axiosError.message });
      }
    }
  };

export default apiMiddleware;
