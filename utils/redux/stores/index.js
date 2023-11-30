const { combineReducers, applyMiddleware, createStore } = require("redux");
import cartReducer from "../reducers/cart";
import searchReducer from "../reducers/search";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const combinedReducers = combineReducers({
  cart: cartReducer,
  search: searchReducer,
});
const persistedReducer = persistReducer(
  { key: "root", storage: storage },
  combinedReducers
);
// const store = createStore(combinedReducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor, persistedReducer, combinedReducers };
