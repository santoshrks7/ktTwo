import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewMore from "./components/ViewMore";
import Edited from "./components/Edited";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/posts" element={<App />} />
        <Route path="/posts/:id" element={<ViewMore />} />
        <Route path="/edit/:id" element={<Edited />} />
        {/* <App /> */}
      </Routes>
    </Provider>
  </BrowserRouter>
);
