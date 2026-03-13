/** @format */

import express from "express";
const app = express();
import cors from "cors";
import ENV from "./config/env.ts";
import { clerkMiddleware } from "@clerk/express";

// middlewares
app.use(express.json()); // parse json payloads  Converts JSON → req.body
app.use(express.urlencoded({ extended: true })); // parse form submissions Converts form fields → req.body
app.use(clerkMiddleware()); // Identifying loggedIn users

app.use(
	cors({
		origin: ENV.ALLOWED_FRONTEND_URL,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	}),
);
app.get("/health", (req, res) => {
	console.log("hey from baceknd");
	res.status(200).json({ message: "Server is running..." });
});

// START SERVER
app.listen(ENV.PORT, () => {
	console.log("Starting Server....");
	console.log(`Server is running at http://localhost:${ENV.PORT}`);
});

// SHUTDOWN
const gracefulShutdown = async (reason: string, error: unknown) => {
	if (error) console.error(error, reason);
	console.log(`${reason} received`);
	console.log("Shutting down server...");
	try {
		console.log("DB disconnected Successfully");
		console.log("Shutdown completed Successfully");
		process.exit(0);
	} catch (error) {
		console.error("Shutdown failed", error);
		process.exit(1);
	}
};
process.on("SIGINT", () => gracefulShutdown("SIGINT", null));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM", null));
process.on("unhandledRejection", (err) =>
	gracefulShutdown("unhandledRejection", err),
);
process.on("uncaughtException", (err) =>
	gracefulShutdown("uncaughtException", err),
);
