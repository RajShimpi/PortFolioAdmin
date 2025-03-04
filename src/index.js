import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DataProvider } from "./useContext/usecontext"; // Import the provider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DataProvider>
    {" "}
    {/* Wrap your app with the provider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DataProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
