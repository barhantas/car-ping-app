/* global window */
import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";

import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";
import thunk from "redux-thunk";
import reducers from "../reducers";

import memberService from "../services/memberService";



const reduxPersistConfig = { key: "root", storage, blacklist: [] };

const reducer = persistCombineReducers(reduxPersistConfig, reducers);


const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
const enhancers = [applyMiddleware(sagaMiddleware), applyMiddleware(thunk)];
const combinedServices = [memberService];


  const composeEnhancers =
    (process.env.NODE_ENV !== "production" &&
      typeof window === "object" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(reducer, composeEnhancers(...enhancers));

  const persistor = persistStore(store, null, () => {
    store.getState();
  });
  combinedServices.forEach(service => sagaMiddleware.run(service));

  return { persistor, store };
};

export default configureStore;
