import actionTypes from "./actions/types";
let session = window.sessionStorage.getItem("$appAuth")

session = (session && JSON.parse(session)) || undefined;

const initialState = {
  logged: !!session,
  credential: session,
  login: {
    username: "",
    password: "",
    submitting: false,
    error: undefined,
    validated: false
  }
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.login:
      window.sessionStorage.setItem("$appAuth", JSON.stringify(action.value));
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
