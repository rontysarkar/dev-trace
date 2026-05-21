import type { Request, Response } from "express";
import { issueService } from "./issue.service";
import { sendResponse } from "../../utils";

const createIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.createIssueIntoDb(req.body);
    console.log(req.user);
  } catch (error: any) {
    console.log(error);
    sendResponse(res,{statusCode:500,success:false,message:error.message,error:error})
  }
};

export const issueController = {
  createIssue,
};
