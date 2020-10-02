import {
  START_GETTING_USERS,
  SUCCESS_GETTING_USERS,
  FAILED_GETTING_USERS,
  CHANGE_PAGINATION,
} from "../types/user-crud-types";
import { getAllUsersService } from "../../services/user-service";

export const startGettingUsersAction = () => ({ type: START_GETTING_USERS });
export const successGettingUsersAction = (users, totalCount) => ({
  type: SUCCESS_GETTING_USERS,
  payload: { users, totalCount },
});
export const failedGettingUsersAction = () => ({ type: FAILED_GETTING_USERS });

export const changePaginationAction = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(startGettingUsersAction());
    dispatch({ type: CHANGE_PAGINATION, payload: currentPage });
    getAllUsersService(currentPage, pageSize)
      .then(({ data: res }) => {
        const {
          data: { items, totalCount },
        } = res;
        dispatch(successGettingUsersAction(items, totalCount));
      })
      .catch((e) => dispatch(failedGettingUsersAction()));
  };
};

export const reloadAllUsersAction = () => {
  return (dispatch, getState) => {
    const { currentPage } = getState().UserCrudReducer;
    dispatch(startGettingUsersAction());
    getAllUsersService(currentPage, 4)
      .then(({ data: res }) => {
        const {
          data: { items, totalCount },
        } = res;
        dispatch(successGettingUsersAction(items, totalCount));
      })
      .catch((e) => dispatch(failedGettingUsersAction()));
  };
};
