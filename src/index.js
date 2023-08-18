import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import TemplateContextProvider from "./contexts/TemplateContext";
import AuthContextProvider from "./contexts/AuthContext";
import CreditContextProvier from "./contexts/CreditContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <TemplateContextProvider>
          <CreditContextProvier>
            <App />
          </CreditContextProvier>
        </TemplateContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
