//Types
export const USER_LOADING = "USER_LOADING";
export const USER_LOADED = "USER_LOADED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const GENERAL_USER_REDUCER = "GENERAL_USER_REDUCER";
export const AUTH_ERROR = "AUTH_ERROR";

// State
export interface UserData {
  name: string;
  email: string;
  id: string;
  createdAt: string | null;
  registration_id: string;
  roll_no: number;
  type: string;
}

export type Token = string | null;

export interface UserState {
  token: Token;

  userData: UserData | null;
  session_expired: boolean;

  isLoading: boolean;
  // _id: string;
  // userType: string;
}

//Action

export type GeneralPayload = Partial<UserState>;
export type UserDataPayload = UserData;

export interface GeneralUserAction {
  type: typeof GENERAL_USER_REDUCER;
  payload: GeneralPayload;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { token: Token; userData: UserData };
}

export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
}

export interface LoginFailAction {
  type: typeof LOGIN_FAIL;
}

export interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
}

export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export interface AuthErrorAction {
  type: typeof AUTH_ERROR;
}

export interface UserLoadedAction {
  type: typeof USER_LOADED;
  payload: {
    userData: UserDataPayload;
    token: Token;
  };
}
export interface UserLoadingAction {
  type: typeof USER_LOADING;
}

export type UserActionsType =
  | GeneralUserAction
  | LoginSuccessAction
  | RegisterSuccessAction
  | UserLoadedAction
  | LoginFailAction
  | RegisterFailAction
  | LoginSuccessAction
  | LogoutSuccessAction
  | AuthErrorAction
  | UserLoadingAction;
