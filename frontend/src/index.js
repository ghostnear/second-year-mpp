import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";

const root = createRoot(document.getElementById("app"))
root.render(
    <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </StrictMode>
);