/** @format */

import dotenv from "dotenv";
dotenv.config({quiet:true});

const ENV = {
	PORT: Number(process.env.PORT) || 5000,
	NODE_ENV: process.env.NODE_ENV || "development",
	DB_URL: process.env.DB_URL ?? "",
};

export default ENV;
