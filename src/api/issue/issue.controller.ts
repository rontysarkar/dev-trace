import type { Request, Response } from "express";
import { issueService } from "./issue.service";
import { sendResponse } from "../../utils";

const createIssue = async (req: Request, res: Response) => {
  try {
    const { title, description, type, status } = req.body;
    const payload = {
      title,
      description,
      type,
      status,
      reporter_id: req.user.id,
    };
    const result = await issueService.createIssueIntoDb(payload);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
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
    const { issues, users } = await issueService.gelAllIssuesAndUserFromDb();
    const lookup = users.reduce((table, post) => {
      table[post.id] = post;
      return table;
    }, {});

    const issuesWithUser = issues.map((issue) => {
      const updatedIssue = {
        ...issue,
        reporter: lookup[`${issue.reporter_id}`],
      };
      delete updatedIssue.reporter_id;
      return updatedIssue;
    });

    res.status(200).json({
      success: true,
      data: issuesWithUser,
    });
  } catch (error: any) {
    console.log(error);
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
};
