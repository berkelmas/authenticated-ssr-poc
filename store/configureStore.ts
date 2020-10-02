import { applyMiddleware, createStore } from "redux";
import { createRootReducer } from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";

function configureStore(preloadedState = {}) {
  const store = createStore(
    createRootReducer(), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        thunk
        // ... other middlewares ...
      )
    )
  );

  return store;
}

const makeStore = (context) => configureStore();

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
