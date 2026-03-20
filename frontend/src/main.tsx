/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/react";
import { BrowserRouter } from "react-router";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) throw new Error("Missing publish Key");

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ClerkProvider publishableKey={publishableKey}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ClerkProvider>
	</StrictMode>,
);
