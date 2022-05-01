import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap/dist/js/bootstrap.min";
import "./../node_modules/@popperjs/core/";

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById("root")
);
