import {
  LOGIN_SUCCESS,
  UserState,
  USER_LOADED,
  USER_LOADING,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  GENERAL_USER_REDUCER,
  AUTH_ERROR,
  UserActionsType,
} from "./types";
const initialState: UserState = {
  token: null,
  userData: null,
  session_expired: false,
  isLoading: false,
  // _id: null,
  // userType: null,
};

export default (state = initialState, action: UserActionsType): UserState => {
  switch (action.type) {
    case GENERAL_USER_REDUCER:
      return {
        ...state,
        ...action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        userData: action.payload.userData,
        token: action.payload.token,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("vl-token", action.payload.token);
      //localStorage.setItem("vl-type", action.payload.userData.type);
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        userData: action.payload.userData,
        // userType: action.payload.userType,
        // _id: action.payload._id,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
      localStorage.removeItem("vl-token");
      localStorage.removeItem("vl-type");
      return {
        ...state,
        userData: null,
        token: null,
        isLoading: false,
        session_expired: false,
      };
    default:
      return state;
  }
};
