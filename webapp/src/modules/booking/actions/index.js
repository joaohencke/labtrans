import moment from 'moment';
import actionTypes from "./types";
import { get, _delete, post } from "../../../utils/http";

export function fetch() {
  return async dispatch => {
    try {
      const res = await get("/bookings");
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
      await _delete(`/bookings/${id}`);

      dispatch(fetch());
      return dispatch({ type: actionTypes.remove });
    } catch (error) {
      throw dispatch({ type: actionTypes.error, error });
    }
  };
}

async function create(entity) {
  const res = await post("/bookings", entity);
  return res;
}
async function update() {}

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
console.log(error);
      let msg = 'Problemas na requisição. Tente novamente.';

      if (error.message.includes('Expected a value of')) msg = 'Parâmetros inválidos';

      throw dispatch({ type: actionTypes.error, error: msg });
    }
  };
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
