import actionTypes from "./actions/types";

const initialState = {
  fetching: false,
  list: {
    items: [],
    total: 0,
  }
};

export default function bookingsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.fetch:
    console.log(action)
      return {
        ...state,
        fetching: false,
        list: {
          ...state.list,
          ...action.value
        }
      };
    case actionTypes.FETCHING:
      return {
        ...state,
        fetching: action.value
      };
    default:
      return state;
  }
}
