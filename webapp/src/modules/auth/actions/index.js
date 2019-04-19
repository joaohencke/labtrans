import actionTypes from "./types";
import { post, authorization } from "../../../utils/http";

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

      authorization(`Bearer ${res.access_token}`);
      
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
