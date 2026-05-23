import type { Request, Response } from "express";
import { issueService } from "./issue.service";
import { sendResponse } from "../../utils";

const createIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.createIssueIntoDb(req.body, req.user.id);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const { issues, users } = await issueService.gelAllIssuesAndUserFromDb(
      req.query,
    );
    const lookup = users.reduce((table, post) => {
      table[post.id] = post;
      return table;
    }, {});

    const issuesWithUser = issues.map((issue) => {
      const { created_at, updated_at, ...remainingData } = issue;
      const updatedIssue = {
        ...remainingData,
        reporter: lookup[`${issue.reporter_id}`],
        created_at,
        updated_at,
      };
      delete updatedIssue.reporter_id;
      return updatedIssue;
    });

    res.status(200).json({
      success: true,
      message:"Issues retrived successfully",
      data: issuesWithUser,
    });
  } catch (error: any) {
    // console.log(error);
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  try {
    let result = await issueService.getSingleIssueByIdWithUser(
      Number(req.params?.id),
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    // console.log(error);
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  try {
    if (req.user.role === "contributor") {
      const issue = await issueService.getSingleIssue(Number(req.params?.id));
      if (req.user.id !== issue.reporter_id || issue.status !== "open") {
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "Forbidden access",
          error: "contributor can not update this issue",
        });
      }
    }

    const result = await issueService.updatedIssueIntoDb(
      req.body,
      Number(req.params?.id),
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: any) {
    // console.log(error);
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
    const result = await issueService.deleteIssueFromDb(Number(req.params?.id));
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error: any) {
    // console.log(error);
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const issueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
