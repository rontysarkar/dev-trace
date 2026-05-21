import { pool } from "../../config/db"


const createIssueIntoDb = async(payload:any)=>{
    const {title,description,type,status,reporter_id} = payload;
    const result = await pool.query(`
        INSERT INTO issues(title,description,type,status,reporter_id)
        VALUES($1,$2,$3,COALESCE($4,'open'),$5) RETURNING *
    `,[title,description,type,status,reporter_id])

    return result.rows[0];
}


export const issueService = {
    createIssueIntoDb
}