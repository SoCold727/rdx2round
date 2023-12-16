import { applyMiddleware, combineReducers, compose } from "redux";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./user/reducer";
import notesReducer from "./notes/reducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ user: userReducer, notes: notesReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = (persistedReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);
export { store, persistor };
