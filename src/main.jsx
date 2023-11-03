import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import "./index.css";

const containerStyle = {
  maxWidth: "80rem", // Equivalent to max-w-7xl in Tailwind CSS
  marginLeft: "auto", // Equivalent to mx-auto in Tailwind CSS
  marginRight: "auto", // Equivalent to mx-auto in Tailwind CSS
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <div style={containerStyle}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </div>
);
