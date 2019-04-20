import actionTypes from "./types";
import {
  post,
  authorization,
  addInterceptor,
  instance
} from "../../../utils/http";
import store from "../../../store";

const client_id = "5cb63d828ab85bebe7527f13";
const client_secret = "labtrans";

export function login({ username, password }) {
  return async dispatch => {
    try {
      const res = await post("/auth/token", {
        client_id,
        client_secret,
        username,
        password,
        grant_type: "password"
      });

      authorization(`${res.token_type} ${res.access_token}`);

      return dispatch({ type: actionTypes.login, value: res });
    } catch (e) {
      let value;
      switch (e.error_description) {
        case "invalid_password":
          value = "Credenciais inválidas";
          break;
        default:
          value = "Problemas na requisição.";
      }
      return dispatch({ type: actionTypes.error, value });
    }
  };
}

export function setSubmitting(submitting) {
  return { type: actionTypes.submitting, value: submitting };
}

export function modelChange(args) {
  return { type: actionTypes.modelChange, value: args };
}

export function token({ refresh_token }) {
  return async dispatch => {
    try {
      const res = await post("/auth/token", {
        client_id,
        client_secret,
        grant_type: "refresh_token",
        refresh_token
      });

      return dispatch({ type: actionTypes.refreshToken, value: res });
    } catch (e) {
      throw dispatch({ type: actionTypes.error });
    }
  };
}

addInterceptor("response")(null, async args => {
  const { response } = args;
  const { data, config } = response;

  if (response.status !== 401 || data.error !== "invalid_token")
    throw response.error;

  const { refresh_token } = store.getState().auth.credential;
  try {
    const result = await store.dispatch(token({ refresh_token }));
    const { access_token: accessToken, token_type: tokenType } = result.value;
    config.headers.Authorization = `${tokenType} ${accessToken}`;
    return instance.request(config);
  } catch (e) {
    sessionStorage.clear();
    window.location.reload();
  }
});
