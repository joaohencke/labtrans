import actionTypes from "./actions/types";

const initialState = {
  fetching: false,
  list: {
    items: []
  }
};

export default function bookingsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.fetch:
      return {
        ...state,
        fetching: false,
        list: {
          items: action.value
        }
      };
    case actionTypes.FETCHING:
      return {
        ...state,
        fetching: action.value
      };
    default:
    console.log(action)
      return state;
  }
}
