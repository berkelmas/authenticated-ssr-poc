import { Reducer } from "redux";
import {
  START_GETTING_REPLY,
  SUCCESS_GETTING_REPLY,
  FAILED_GETTING_REPLY,
} from "../types/reply-types";
import { LOGOUT } from "../types/user-types";

type IReplyReducer = {
  loadingReplies: boolean;
  replies: any[];
};

const initialState: IReplyReducer = {
  loadingReplies: false,
  replies: [],
};

const ReplyReducer: Reducer<IReplyReducer> = (state = initialState, action) => {
  switch (action.type) {
    case START_GETTING_REPLY:
      return { ...state, loadingReplies: true };
    case SUCCESS_GETTING_REPLY:
      return { ...state, loadingReplies: false, replies: action.payload };
    case FAILED_GETTING_REPLY:
      return { ...state, loadingReplies: false };
    case LOGOUT:
      return { ...state, loadingReplies: false, replies: [] };
    default:
      return state;
  }
};

export default ReplyReducer;
