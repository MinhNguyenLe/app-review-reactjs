import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  //redux del tool
);

export const persistor = persistStore(store);

export default { store, persistor };
