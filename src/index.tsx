import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import "./App.less";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/reducer";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
