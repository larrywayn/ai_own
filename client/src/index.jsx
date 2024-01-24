import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { AIPI } from "./Functions/AIPI";
import { BlobStore } from "./StoreContainer/BlobStore";
import { setErrorAction } from "./StoreContainer/errorStore";
import { store } from "./StoreContainer/store";
import "./index.css";

export const RawStorage = new BlobStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
export const AIApi = new AIPI("http://localhost:8080/", (error) => {
  store.dispatch(setErrorAction(error));
  window.location.pathname = "/error";
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
