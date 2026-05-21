import { pool } from "../../config/db";
import type { IIssue } from "./issue.interface";

const createIssueIntoDb = async (payload: IIssue) => {
  const { title, description, type, status, reporter_id } = payload;
  const result = await pool.query(
    `
        INSERT INTO issues(title,description,type,status,reporter_id)
        VALUES($1,$2,$3,COALESCE($4,'open'),$5) RETURNING *
    `,
    [title, description, type, status, reporter_id],
  );

  return result.rows[0];
};

const gelAllIssuesAndUserFromDb = async () => {
  const issues = await pool.query(`
        SELECT * FROM issues;
    `);
    const users = await pool.query(`
        SELECT id,name,role FROM users;
    `)
  return {issues:issues.rows,users:users.rows};
};

export const issueService = {
  createIssueIntoDb,
  gelAllIssuesAndUserFromDb,
};
