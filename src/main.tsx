import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import { SoundProvider } from "./components/utils/context/context.tsx";

import "./index.scss";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SoundProvider>
            <App />
        </SoundProvider>
    </StrictMode>
);
