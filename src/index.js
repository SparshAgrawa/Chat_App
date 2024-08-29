import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "./styles/index.css";
import App from "./components/App";
import chatting from "./reducers";

// Define the logger middleware
const logger = ({ dispatch, getState }) => (next) => (action) => {
  console.log("ACTION", action);
  return next(action);
};

// Create the Redux store with middleware
const store = createStore(chatting, applyMiddleware(logger, thunk));
console.log("state", store.getState());

// Create the StoreContext for passing the store and user information
export const StoreContext = createContext();

// Define user information
const user = {
  name: "Sparsh",
  mobile: 9301511759,
  profilePic: require("./assets/myPhoto.jpg"),
  contactId: 0, // like user id
};

// Define the Provider component
const Provider = ({ userAndStore, children }) => {
  return (
    <StoreContext.Provider value={userAndStore}>
      {children}
    </StoreContext.Provider>
  );
};

// Define the user and store context value
const userAndStore = {
  user: user,
  store: store,
};

// Render the App component wrapped in Provider
ReactDOM.render(
  <Provider userAndStore={userAndStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
