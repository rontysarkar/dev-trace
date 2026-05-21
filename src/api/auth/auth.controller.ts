import type { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils";
import type { RUser } from "./auth.interface";

const signup = async (req: Request, res: Response) => {
  try {
    const result = await authService.createUser(req.body);
    sendResponse<RUser>(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    sendResponse<any>(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await authService.validateUser(email, password);
    if (!user) {
      return sendResponse<any>(res, {
        statusCode: 404,
        success: false,
        message: "incorrect email or password",
      });
    }
    console.log(user);
  } catch (error: any) {
    console.log(error);
    sendResponse<any>(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authController = {
  signup,
  login,
};
