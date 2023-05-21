import React from "react";
import App from "./App";
import "./index.css";
import ReactDOM from "react-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
 
// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Provider>,
//   document.getElementById("root")
// );

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
