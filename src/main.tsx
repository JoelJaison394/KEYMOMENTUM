import React from "react";
import ReactDOM from "react-dom/client";
import { SettingsProvider } from "./context/SettingsContext";
import { StatsProvider } from "./context/StatsContext.tsx";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsProvider>
      <StatsProvider>
        <App />
      </StatsProvider>
    </SettingsProvider>
  </React.StrictMode>
);
