import actionTypes from "./actions/types";

const initialState = {
  fetching: false,
  list: {
    items: [],
    total: 0
  },
  put: {
    $isCreation: false,
    submitting: false,
    fetching: false,
    validated: false,
    model: {
      _id: "",
      description: "",
      place: "",
      room: "",
      responsible: "",
      people: 0,
      coffee: false,
      begin: new Date(),
      end: new Date()
    }
  }
};

export default function bookingsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.fetch:
      return {
        ...state,
        fetching: false,
        list: {
          ...state.list,
          ...action.value
        }
      };
    case actionTypes.fetching:
      return {
        ...state,
        fetching: action.value
      };
    case actionTypes.setPut:
      return {
        ...state,
        put: {
          ...state.put,
          ...action.value
        }
      };
    case actionTypes.resetModel:
    case actionTypes.put: {
      return {
        ...state,
        put: {
          ...initialState.put
        }
      };
    }
    case actionTypes.get: {
      return {
        ...state,
        put: {
          ...state.put,
          fetching: false,
          model: {
            ...action.value
          }
        }
      };
    }
    case actionTypes.modelChange:
      return {
        ...state,
        put: {
          ...state.put,
          model: {
            ...state.put.model,
            ...action.value
          }
        }
      };
    default:
      return state;
  }
}
