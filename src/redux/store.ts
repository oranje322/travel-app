import { applyMiddleware, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/reducer";
import { ActionsTypes } from "./actions/actionsTypes";
import { IState } from "./reducers/reducerTypes";

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => (
  createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  )
);

const store: Store<IState, ActionsTypes> = configureStore();

export default store;