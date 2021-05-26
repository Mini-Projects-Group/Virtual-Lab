import { CLEAR_ERROR, ErrorData, SET_ERROR } from "./types";

const initialstate: ErrorData = {
  msg: null,
  status: null,
};

export default (state = initialstate, action): ErrorData => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_ERROR:
      return {
        msg: null,
        status: null,
      };
    default:
      return state;
  }
};
