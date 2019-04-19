import actionTypes from "./actions/types";

const initialState = {
  logged: false,
  credential: undefined,
  login: {
    username: "",
    password: "",
    submitting: false,
    error: undefined,
    validated: false
  }
};

export default function authReducer(state = initialState, action) {
  console.log(state, action);
  switch (action.type) {
    case actionTypes.login:
      return {
        ...state,
        login: { ...initialState.login },
        logged: true,
        credential: action.value
      };
    case actionTypes.submitting:
      return {
        ...state,
        login: {
          ...state.login,
          error: "",
          submitting: action.value,
          validated: true
        }
      };
    case actionTypes.modelChange:
      return {
        ...state,
        login: {
          ...state.login,
          ...action.value
        }
      };
    case actionTypes.error: {
      return {
        ...state,
        login: {
          ...state.login,
          submitting: false,
          error: action.value
        }
      };
    }
    default:
      return state;
  }
}
