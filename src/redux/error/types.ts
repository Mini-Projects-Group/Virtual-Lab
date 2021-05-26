export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

export interface ErrorData {
  msg: string | null;
  status: number | null;
}

//action

export interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: ErrorData;
}

export interface ClearErrorAction {
  type: typeof CLEAR_ERROR;
}

export type ErrorActionsType = SetErrorAction | ClearErrorAction;
