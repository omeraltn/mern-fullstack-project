import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk"; // thunk paketini de ekledik
import authReducer from "./reducers/auth";
import modalReducer from "./reducers/modal";
import postReducer from "./reducers/post";

// 3. Başlangıç state'i
const initialState = {
  auth: null,
  modal: false,
};
// 2. Reducer'ları birleştiriyoruz
const reducers = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  posts: postReducer,
});

// 4. Store'u oluşturuyoruz (legacy_createStore sayesinde çizgi çıkmaz)
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
