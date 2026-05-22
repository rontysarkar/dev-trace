import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { authService } from "../modules/auth/auth.service";
import type { Role } from "../types";

const auth = (...roles: Role[]) => {
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
      if (!roles.includes(user?.role)) {
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: "Forbidden Access",
        });
      }
      req.user = {
        id: user.id,
        name: user.name,
        role: user.role,
      };
      next();
    } catch (error: any) {
      // console.log(error);
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
