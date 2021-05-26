import { AppState } from "../reducer";
import { Token } from "./types";

export const tokenSelector = (state: AppState): { token: Token } => ({
  token: state.userReducer.token,
});

export const authSelector = (
  state: AppState
): { isAuthenticated: boolean } => ({
  isAuthenticated:
    state.userReducer.token || localStorage.getItem("vl-token") ? true : false,
});

// export const adminSelector = (state: AppState): { isAdmin: boolean } => ({
//   isAdmin: state.userReducer.userData.isAdmin,
// });
