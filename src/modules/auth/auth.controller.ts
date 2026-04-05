import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User login successfully",
    data: result,
  });
});
const registerNewUser = catchAsync(async (req, res) => {
  const result = await authServices.registerNewUser(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const result = await authServices.getMe(req.user!);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User find successfully",
    data: result,
  });
});
const generateAccessToken = catchAsync(async (req, res) => {
  const token = req.headers?.authorization!;
  const result = await authServices.generateAccessToken(token);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Access token generated successfully",
    data: result,
  });
});

export const authControllers = {
  loginUser,
  registerNewUser,
  getMe,
  generateAccessToken,
};
