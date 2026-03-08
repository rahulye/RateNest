/** @format */

import express from "express";
const app = express();
import cors from "cors";
import ENV from "./config/env";
app.use(express.json());
app.use(
	cors({
		origin: process.env.ALLOWED_FRONTEND_URL || "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	}),
);
app.get("/", (req, res) => {
	res.status(200).json({ message : "Server is running..." });
});



// START SERVER
app.listen(ENV.PORT, () => {
	console.log("Success  stServers....");
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
process.on("SIGINT", () => gracefulShutdown("SIGINT", Error));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM", Error));
process.on("unhandledRejection", (err) =>
	gracefulShutdown("unhandledRejection", err),
);
process.on("uncaughtException", (err) =>
	gracefulShutdown("uncaughtException", err),
);
