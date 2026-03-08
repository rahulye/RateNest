import dotenv from "dotenv";
dotenv.config();


const ENV = {
  PORT:process.env.PORT,
  NODE_ENV:process.env.NODE_ENV,
  DB_URL:process.env.DB_URL,
}

export default ENV;
