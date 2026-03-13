/** @format */

import dotenv from "dotenv";
dotenv.config({ quiet: true });

const ENV = {
	ALLOWED_FRONTEND_URL : process.env.ALLOWED_FRONTEND_URL,
	PORT: Number(process.env.PORT) || 5000,
	NODE_ENV: process.env.NODE_ENV || "development",
	DB_URL: process.env.DB_URL ?? "",
	CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY ?? "",
	CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ?? "",
};

export default ENV;
 