import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { authService } from "../api/auth/auth.service";

const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Token not found",
          error: "Unauthorized access",
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      const user = await authService.getUserById(decoded?.id);
      if (!user) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "User not found",
          error: "Unauthorized access",
        });
      }
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      next();
    } catch (error: any) {
      console.log(error);
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: error.message,
        error: error,
      });
    }
  };
};

export default auth;
