/** @format */

import { Pool } from "pg";
import * as schema from "./schema";
import ENV from "../config/env";
import { drizzle } from "drizzle-orm/node-postgres";

if (!ENV.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set in environment variables");
}

// postgree connection pool

const pool = new Pool({ connectionString: ENV.DATABASE_URL });
pool.on("connect", () => {
	console.log("Database connected successfully");
});
pool.on("error", (err) => {
	console.error("Database is not connected:", err);
});

const db = drizzle({ client: pool, schema });

export { db, pool };
