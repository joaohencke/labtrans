import actionTypes from "./types";
import { get } from "../../../utils/http";

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
