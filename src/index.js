import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "./styles/index.css";
import App from "./components/App";
import chatting from "./reducers";

// Define the logger middleware
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log("ACTION", action);
    return next(action);
  };

const store = createStore(chatting, applyMiddleware(logger, thunk));
console.log("state", store.getState());

export const StoreContext = createContext();

const user = {
  name: "Sparsh",
  mobile: 9301511759,
  profilePic: require("./assets/myPhoto.jpg"),
  contactId: 0,
};

const Provider = ({ userAndStore, children }) => {
  return (
    <StoreContext.Provider value={userAndStore}>
      {children}
    </StoreContext.Provider>
  );
};

const userAndStore = {
  user: user,
  store: store,
};

ReactDOM.render(
  <Provider userAndStore={userAndStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
