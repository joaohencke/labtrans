import moment from "moment";
import actionTypes from "./types";
import * as $http from "../../../utils/http";

export function fetch() {
  return async dispatch => {
    try {
      const res = await $http.get("/bookings");
      const { items, total } = res;
      return dispatch({ type: actionTypes.fetch, value: { items, total } });
    } catch (error) {
      return dispatch({ type: actionTypes.error, error });
    }
  };
}

export function setFetching(fetching) {
  return { type: actionTypes.fetching, value: fetching };
}

export function remove(id) {
  return async dispatch => {
    try {
      await $http._delete(`/bookings/${id}`);

      dispatch(fetch());
      return dispatch({ type: actionTypes.remove });
    } catch (error) {
      throw dispatch({ type: actionTypes.error, error });
    }
  };
}

async function create(entity) {
  const res = await $http.post("/bookings", entity);
  return res;
}
async function update({ _id, ...entity }) {
  const res = await $http.put(`/bookings/${_id}`, entity);
  return res;
}

export function put(entity) {
  return async dispatch => {
    try {
      const method = !!entity._id ? update : create;
      await method({
        ...entity,
        beginTs: moment(entity.begin).valueOf(),
        endTs: moment(entity.end).valueOf()
      });

      dispatch(fetch());
      return dispatch({ type: actionTypes.put });
    } catch (error) {
      let msg = "Problemas na requisição. Tente novamente.";

      if (error.message.includes("Expected a value of"))
        msg = "Parâmetros inválidos";
      else if (error.message.includes("time_conflict"))
        msg = "O horário informado entra em conflito com algum já cadastrado";

      throw dispatch({ type: actionTypes.error, error: msg });
    }
  };
}

export function resetModel() {
  return { type: actionTypes.resetModel };
}

export function setPut(value) {
  return {
    value,
    type: actionTypes.setPut
  };
}

export function modelChange(value) {
  return {
    value,
    type: actionTypes.modelChange
  };
}

export function get(id) {
  return async dispatch => {
    try {
      const res = await $http.get(`/bookings/${id}`);
      return dispatch({
        type: actionTypes.get,
        value: {
          ...res,
          begin: new Date(res.beginTs),
          end: new Date(res.endTs)
        }
      });
    } catch (error) {
      throw dispatch({ type: actionTypes.error, error });
    }
  };
}
