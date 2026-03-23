/** @format */

import { Pool } from "pg";
import * as schema from "./schema";
import ENV from "../config/env";
import { drizzle } from "drizzle-orm/node-postgres";

if (!ENV.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set in environment variables");
}

// postgree connection pool

const pool = new Pool({ connectionString: ENV.DATABASE_URL }); // databse is connected when first query and runs until we say the pool.end() or server end porocess.end()
const db = drizzle({ client: pool, schema });
// “The database connects only when the first query is executed; until then, we only initialize the pool.”

export { db, pool };
