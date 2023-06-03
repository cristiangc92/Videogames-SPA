import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReduce from "../reduce";

export const store = createStore(
  rootReduce,
  composeWithDevTools(applyMiddleware(thunk))
);
