import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
// import './style.css';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import { NotificationProvider } from "./context/NotificationProvider";

ReactDOM.render(
  <BrowserRouter>
    <NotificationProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </NotificationProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
