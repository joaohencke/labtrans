import actionTypes from "./types";
import { get } from "../../../utils/http";

export function fetch() {
  return async dispatch => {
    try {
      const res = await get("/bookings");
        console.log(res);
      const { items } = res;
      return dispatch({ type: actionTypes.fetching, value: items });
    } catch (error) {
      return dispatch({ type: actionTypes.error, error });
    }
  };
}

export function setFetching(fetching) {
  return { type: actionTypes.fetching, value: fetching };
}
