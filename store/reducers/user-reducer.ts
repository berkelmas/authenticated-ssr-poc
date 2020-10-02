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
import { HYDRATE } from "next-redux-wrapper";
import { Reducer } from "redux";

type IUserReducer = {
  loginLoading: boolean;
  registerLoading: boolean;
  verifyLoginLoading: boolean;
  username: string | null;
  role: string | null;
  accessToken: string | null;
};

const initialState: IUserReducer = {
  loginLoading: false,
  registerLoading: false,
  verifyLoginLoading: false,
  username: null,
  role: null,
  accessToken: null,
};

const UserReducer: Reducer<IUserReducer> = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.UserReducer,
      };
    case START_LOGIN:
      return {
        ...state,
        loginLoading: true,
      };
    case SUCCESS_LOGIN:
      return {
        ...state,
        loginLoading: false,
        username: action.payload.username,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
      };
    case FAILED_LOGIN:
      return {
        ...state,
        loginLoading: false,
      };
    case START_REGISTER:
      return {
        ...state,
        registerLoading: true,
      };
    case SUCCESS_REGISTER:
      return {
        ...state,
        registerLoading: false,
        username: action.payload.username,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
      };
    case FAILED_REGISTER:
      return {
        ...state,
        registerLoading: false,
      };
    case START_VERIFY_LOGIN:
      return {
        ...state,
        verifyLoginLoading: true,
      };
    case SUCCESS_VERIFY_LOGIN:
      return {
        ...state,
        verifyLoginLoading: false,
        username: action.payload.username,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
      };
    case FAILED_VERIFY_LOGIN:
      return {
        ...state,
        verifyLoginLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        loginLoading: false,
        registerLoading: false,
        verifyLoginLoading: false,
        username: null,
        role: null,
        accessToken: null,
      };
    default:
      return state;
  }
};

export default UserReducer;
