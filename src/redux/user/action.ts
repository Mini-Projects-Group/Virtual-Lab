import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { AppActionsTypes, BAD_STATUS } from "..";
import { SET_ERROR } from "../error/types";
import { AppState } from "../reducer";
import { async_func_data } from "../utils/helperfunctions";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "./types";

import jwt_decode from "jwt-decode";

export const login_user =
  (email: string, password: string) =>
  async (
    dispatch: Dispatch<AppActionsTypes>,
    getState: () => AppState
  ): Promise<AxiosResponse<any>> => {
    try {
      const res = await async_func_data(
        "/api/student/login",
        { email, password },
        "post",
        false
      );

      const response = res;

      if (res.status === BAD_STATUS || res.data?.error) {
        await dispatch({
          type: LOGIN_FAIL,
        });

        await dispatch({
          type: SET_ERROR,
          payload: {
            msg: response?.data?.message,
            status: response?.status,
          },
        });
      } else {
        let decoded = jwt_decode(response.data.token);
        console.log(decoded);

        await dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token: response.data.token,
            userData: response.data.user,
            // userType,
            // _id,
          },
        });
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  };

// export const getUser = () => async (dispatch, getState) => {
//   try {
//     const res = await async_func_data(
//       "/api/student/getUser",
//       null,
//       "get",
//       true
//     );

//     const {
//       name,
//       email,
//       roll_no,
//       registration_id,
//       year,
//       branch,
//       subjects,
//       batch,
//       div,
//     } = res.data;

//     const data: UserData = {
//       name,
//       email,

//       roll_no,
//       registration_id,
//       year,
//       branch,
//       subjects,
//       batch,
//       div,
//     };

//     await dispatch({
//       type: USER_LOADED,
//       payload: {
//         token: localStorage.getItem("vl-token"),
//         userData: data,
//       },
//     });

//     console.log(res);
//   } catch (err) {
//     console.log(err);
//   }
// };
