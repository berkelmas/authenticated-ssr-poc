import { Reducer } from "redux";
import {
  START_GETTING_USERS,
  SUCCESS_GETTING_USERS,
  FAILED_GETTING_USERS,
  CHANGE_PAGINATION,
} from "../types/user-crud-types";
import { LOGOUT } from "../types/user-types";

export type IUserCrudReducer = {
  loadingUsers: boolean;
  users: any[];
  totalCount: number | null;
  currentPage: number;
};

const initialState: IUserCrudReducer = {
  loadingUsers: false,
  users: [],
  totalCount: null,
  currentPage: 1,
};

const UserCrudReducer: Reducer<IUserCrudReducer> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case START_GETTING_USERS:
      return { ...state, loadingUsers: true };
    case SUCCESS_GETTING_USERS:
      return {
        ...state,
        loadingUsers: false,
        users: action.payload.users,
        totalCount: action.payload.totalCount,
      };
    case FAILED_GETTING_USERS:
      return { ...state, loadingUsers: false };
    case CHANGE_PAGINATION:
      return { ...state, currentPage: action.payload };
    case LOGOUT:
      return {
        ...state,
        loadingUsers: false,
        users: [],
        totalCount: null,
        currentPage: 1,
      };
    default:
      return state;
  }
};

export default UserCrudReducer;
