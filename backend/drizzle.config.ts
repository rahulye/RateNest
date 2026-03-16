/** @format */
// this file is for DB migrations

import { defineConfig } from "drizzle-kit";
import ENV from "./src/config/env"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing for drizzle-kit");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: ENV.DATABASE_URL!,
  },
});