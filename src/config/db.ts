import { Pool } from "pg";
import config from ".";

export const pool = new Pool({ connectionString: config.db_connecting_string });

export const initDB = async () => {
  try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(30) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'contributor' CHECK(role IN ('contributor','maintainer')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS issues(
       id SERIAL PRIMARY KEY,
       title VARCHAR(150) NOT NULL,
       description TEXT CHECK (char_length(description) >= 20) NOT NULL,
       type TEXT CHECK (type IN ('bug','feature_request')) NOT NULL,
       status TEXT DEFAULT 'open' CHECK(status IN ('open','in_progress','resolved')),
       reporter_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
       created_at TIMESTAMP DEFAULT NOW(),
       updated_at TIMESTAMP DEFAULT NOW()

    )`);
    console.log("Database table created successfully");
  } catch (error) {
    console.log(error);
  }
};
