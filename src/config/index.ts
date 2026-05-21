import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  db_connecting_string:process.env.DB_CONNECTING_STRING,
  jwt_access_secret:process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
};

export default config;
