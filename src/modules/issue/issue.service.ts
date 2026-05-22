import { pool } from "../../config/db";
import type { IIssue, RIssue, RReporter, UpdateIssue } from "./issue.interface";

const createIssueIntoDb = async (payload: IIssue,reporter_id:number) => {
  const { description, type, status,title } = payload;
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

const getSingleIssueByIdWithUser = async(id:number) =>{

    const issue = await pool.query(`
        SELECT * FROM issues WHERE id =$1;
    `,[id])
    if(issue.rows.length === 0){
      throw new Error('issue not found');
      return;
    }
    const user = await pool.query(`
        SELECT id,name,role FROM users WHERE id=$1;
    `,[issue.rows[0].reporter_id])
    const issueWithUser = {
        ...issue.rows[0],
        reporter:user.rows[0],
    }
    delete issueWithUser.reporter_id;
    return issueWithUser as RIssue
    
}

const updatedIssueIntoDb = async(payload:UpdateIssue,id:number)=>{
  const {title,description,type} = payload;
  const result = await pool.query(`
    UPDATE issues
    SET title = COALESCE($1,title),description = COALESCE($2,description),type=COALESCE($3,type)
    WHERE id = $4 RETURNING *;
  `,[title,description,type,id]);
  if(result.rows.length === 0){
    throw new Error('Issue not found');
  }
  return result.rows[0];
}

const getSingleIssue = async(id:number)=>{
  const result = await pool.query(`
    SELECT * FROM issues WHERE id=$1;
  `,[id]);
  if(result.rows.length === 0){
    throw new Error('Issue not found');
  }
  return result.rows[0];
}

const deleteIssueFromDb = async(id:number)=>{
  const result = await pool.query(`
    DELETE FROM issues WHERE id=$1;
  `,[id]);

  if(result.rowCount === 0){
    throw new Error('Issue not found');
  }
  return;
}

export const issueService = {
  createIssueIntoDb,
  gelAllIssuesAndUserFromDb,
  getSingleIssueByIdWithUser,
  updatedIssueIntoDb,
  getSingleIssue,
  deleteIssueFromDb,
};
