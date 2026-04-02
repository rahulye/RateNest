/** @format */

import * as dotenv from "dotenv";
dotenv.config({ quiet: true });

const ENV = {
	ALLOWED_FRONTEND_URL: process.env.ALLOWED_FRONTEND_URL || "http://localhost:5173",	PORT: Number(process.env.PORT) || 5000,
	NODE_ENV: process.env.NODE_ENV || "development",
	DATABASE_URL: process.env.DATABASE_URL,
	CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY ?? "",
	CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ?? "",
};

export default ENV;
 