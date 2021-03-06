import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { AppActionsTypes, BAD_STATUS } from "..";
import { CLEAR_ERROR, SET_ERROR } from "../error/types";
import { AppState } from "../reducer";
import { async_func_data } from "../utils/helperfunctions";
import { LOGIN_FAIL, LOGIN_SUCCESS, USER_LOADED } from "./types";

import jwt_decode from "jwt-decode";

export const login_user =
  (email: string, password: string, type: string) =>
  async (
    dispatch: Dispatch<AppActionsTypes>,
    getState: () => AppState
  ): Promise<AxiosResponse<any>> => {
    try {
      const res = await async_func_data(
        "/api/user/login",
        { email, password, type },
        "post",
        false
      );

      const response = res;

      console.log(response);

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
        await dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token: response.data.token,
            userData: {
              ...response.data.user,
              type,
            },
          },
        });

        const decoded: any = jwt_decode(response.data.token);

        const { _id, userType } = decoded;

        await dispatch(getUser(_id, userType));

        await dispatch({
          type: CLEAR_ERROR,
        });
      }

      return res;
    } catch (err) {
      console.log(err);
    }
  };

export const getUser: any =
  (_id: any, type: string) => async (dispatch: any, getState: any) => {
    try {
      const res = await async_func_data(
        type === "student"
          ? "/api/user/getUser/student"
          : "/api/user/getUser/faculty",
        { _id, type },
        "get",
        true
      );

      const {
        name,
        email,
        roll_no,
        registration_id,
        year,
        branch,
        subjects,
        batch,
        div,
      } = res.data?.userData;

      const data: any = {
        name,
        email,
        roll_no,
        registration_id,
        year,
        branch,
        subjects,
        batch,
        div,
      };

      await dispatch({
        type: USER_LOADED,
        payload: {
          token: localStorage.getItem("vl-token"),
          userData: {
            ...data,
            type,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
