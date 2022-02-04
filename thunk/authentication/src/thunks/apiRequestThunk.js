import * as actions from "../store/requestsSlice";
import { tokenSelector } from "../store";

/**
 * App Server URL
 * @constant
 */
const serverUrl = process.env.REACT_APP_SERVER_URL;

const getErrorMessage = async (response) => {
  let text;
  try {
    text = await response.text();
    return JSON.parse(text).message;
  } catch (e) {
    return text || response.statusText;
  }
};

const apiRequestThunk = (path, opts) => async (dispatch, getState) => {

  dispatch(actions.request({ path }));

  const authToken = tokenSelector(getState());
  try {
    const response = await window.fetch([serverUrl, path].join("/"), {
      ...opts,
      headers: {
        ...opts?.headers,
        ...(authToken ? { "Authorization": ["Bearer", authToken].join(" ") } : [])
      }
    });

    if (!response.ok) {
      throw { statusCode: response.status, message: (await getErrorMessage(response)) };
    }

    dispatch(actions.success(
      { path, statusCode: response.status, data: await response.json() }
    ));
  } catch (err) {
    const { statusCode, message } = err;
    dispatch(actions.error(
      { path, statusCode, errorMessage: message }
    ));
  }

};

export default apiRequestThunk;