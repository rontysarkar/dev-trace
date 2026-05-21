import { pool } from "../../config/db";
import type { User } from "./auth.interface";
import bcrypt from "bcrypt";

const createUser = async (payload: User) => {
  let { name, email, password, role } = payload;
  if (role != "maintainer") role = "contributor";
  const hash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
     INSERT INTO users(name,email,password,role)
     VALUES($1,$2,$3,COALESCE($4,'contributor')) RETURNING *
  `,
    [name, email, hash, role],
  );

  delete result.rows[0]?.password;
  return result.rows[0];
};

const validateUser = async (email: string, password: string) => {
  const result = await pool.query(
    `
       SELECT * FROM users WHERE email =$1; 
    `,
    [email],
  );

  if (result.rows.length === 0) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, result.rows[0].password);
  if (!isMatch) {
    return null;
  }
  delete result.rows[0].password;
  return result.rows[0];
};

export const authService = {
  createUser,
  validateUser,
};
