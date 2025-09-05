// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./Components/common/ErrorBoundary.jsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ErrorBoundary fallback="there was an error">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ErrorBoundary>
  // </StrictMode>
);
