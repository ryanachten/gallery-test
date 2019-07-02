import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";
import product from "./product";

const rootReducer = combineReducers({
  product
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));
export default store;
