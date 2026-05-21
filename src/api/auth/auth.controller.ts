import type { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils";
import type { RUser } from "./auth.interface";
import jwt from 'jsonwebtoken'
import config from "../../config";

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

    const payload = {
        id:user.id,
        name:user.name,
        role:user.role,
    }
    const token = jwt.sign(payload,config.jwt_access_secret as string,{expiresIn:'1d'});
    
    sendResponse(res,{statusCode:200,success:true,message:"Login successfully",data:{
        token,
        user,
    }})
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
