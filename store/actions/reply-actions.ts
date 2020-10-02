import {
  START_GETTING_REPLY,
  SUCCESS_GETTING_REPLY,
  FAILED_GETTING_REPLY,
} from "../types/reply-types";
import { getAllReplies } from "../../services/reply-service";

export const startGettingReplyAction = () => {
  return (dispatch) => {
    dispatch({ type: START_GETTING_REPLY });
    getAllReplies()
      .then(({ data: result }) => {
        const { data } = result;
        dispatch({ type: SUCCESS_GETTING_REPLY, payload: data });
      })
      .catch((e) => dispatch({ type: FAILED_GETTING_REPLY }));
  };
};

export const reloadAllReplyAction = () => {
  return (dispatch) => {
    dispatch({ type: START_GETTING_REPLY });
    getAllReplies()
      .then(({ data: result }) => {
        const { data } = result;
        dispatch({ type: SUCCESS_GETTING_REPLY, payload: data });
      })
      .catch((e) => dispatch({ type: FAILED_GETTING_REPLY }));
  };
};
