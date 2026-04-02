"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const env_1 = __importDefault(require("./config/env"));
const express_2 = require("@clerk/express");
const index_1 = require("./db/index");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const commentRoutes_1 = __importDefault(require("./routes/commentRoutes"));
// middlewares
app.use(express_1.default.json()); // parse json payloads  Converts JSON → req.body
app.use(express_1.default.urlencoded({ extended: true })); // parse form submissions Converts form fields → req.body
app.use((0, express_2.clerkMiddleware)()); // Identifying loggedIn users
app.use((0, cors_1.default)({
    origin: env_1.default.ALLOWED_FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
app.get("/health", (req, res) => {
    // console.log("hey from backend");
    res.status(200).json({ message: "Server is running..." });
});
//ROUTES
app.use("/api/users", userRoutes_1.default);
app.use("/api/products", productRoutes_1.default);
app.use("/api/comments", commentRoutes_1.default);
// START SERVER
app.listen(env_1.default.PORT, () => {
    console.log("Starting Server....");
    console.log(`Server is running at http://localhost:${env_1.default.PORT}`);
});
// SHUTDOWN
const gracefulShutdown = async (reason, error) => {
    if (error)
        console.error(error, reason);
    console.log(`${reason} received`);
    console.log("Shutting down server...");
    try {
        console.log("DB disconnected Successfully");
        console.log("Shutdown completed Successfully");
        await index_1.pool.end();
        process.exit(0);
    }
    catch (error) {
        console.error("Shutdown failed", error);
        process.exit(1);
    }
};
process.on("SIGINT", () => gracefulShutdown("SIGINT", null));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM", null));
process.on("unhandledRejection", (err) => gracefulShutdown("unhandledRejection", err));
process.on("uncaughtException", (err) => gracefulShutdown("uncaughtException", err));
