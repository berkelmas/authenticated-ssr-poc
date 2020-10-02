import {
  START_LOGIN,
  START_REGISTER,
  SUCCESS_LOGIN,
  SUCCESS_REGISTER,
  FAILED_LOGIN,
  FAILED_REGISTER,
  START_VERIFY_LOGIN,
  SUCCESS_VERIFY_LOGIN,
  FAILED_VERIFY_LOGIN,
  LOGOUT,
} from "../types/user-types";
// import { push } from "connected-react-router";

export const startLoginAction = () => ({ type: START_LOGIN });
export const startRegisterAction = () => ({ type: START_REGISTER });
export const startVerifyLoginAction = () => ({ type: START_VERIFY_LOGIN });

export const successLoginAction = (userData) => ({
  type: SUCCESS_LOGIN,
  payload: userData,
});
export const successRegisterAction = (userData) => ({
  type: SUCCESS_REGISTER,
  payload: userData,
});
export const successVerifyLoginAction = (userData) => ({
  type: SUCCESS_VERIFY_LOGIN,
  payload: userData,
});

export const failedLoginAction = () => ({
  type: FAILED_LOGIN,
});
export const failedRegisterAction = () => ({
  type: FAILED_REGISTER,
});
export const failedVerifyLoginAction = () => ({
  type: FAILED_VERIFY_LOGIN,
});

export const logoutAction = () => ({ type: LOGOUT });
