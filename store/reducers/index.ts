import { combineReducers } from "redux";

// REDUCERS
import UserReducer from "./user-reducer";
import RestaurantReducer from "./restaurant-reducer";
import ReviewReducer from "./review-reducer";
import ReplyReducer from "./reply-reducer";
import UserCrudReducer from "./user-crud-reducer";

export const createRootReducer = () =>
  combineReducers({
    UserReducer,
    RestaurantReducer,
    ReviewReducer,
    ReplyReducer,
    UserCrudReducer,
  });

export type RootState = ReturnType<typeof createRootReducer>;
