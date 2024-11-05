import jwt from "jsonwebtoken";
import { Controller, User as UserInt } from "@interfaces";
import { User } from "@models";
import {
  SERVER_STATUS_CODE,
  SERVER_STATUS_DESCRIPTION,
  AUTH_DESCRIPTION,
  JWT_DESCRIPTION,
} from "@enums";
import { ROLES } from "@enums";

// Types
type Credentials = Pick<UserInt, "email">;

const secretWord = "SECRET_WORD";

// Verify the structure of web token
export const verifyAuth: Controller = async (request, response, next) => {
  try {
    // Get token saved in cookie
    const accessToken = request.cookies["accessToken"];
    const token = jwt.verify(accessToken, secretWord);
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return response.status(SERVER_STATUS_CODE.UNAUTHORIZED).json({
        error: {
          code: SERVER_STATUS_CODE.UNAUTHORIZED,
          message: JWT_DESCRIPTION.JWT_ERROR,
          type: SERVER_STATUS_CODE[SERVER_STATUS_CODE.UNAUTHORIZED],
        },
      });
    }
    console.log(error);
    return response.status(SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error: {
        code: SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: SERVER_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR,
        type: SERVER_STATUS_CODE[SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR],
      },
    });
  }
};

// Create a new token
export const generateToken: Controller<Credentials> = async (
  request,
  response,
) => {
  try {
    // Get info from current user
    const { email } = request.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("Error to find out user in collection");
    // Token generation
    const token = jwt.sign({ id: user.id }, secretWord);
    // Create a new token inside cookie
    response.cookie("accessToken", token, {
      httpOnly: true,
    });
    return response
      .status(SERVER_STATUS_CODE.OK)
      .json({ message: AUTH_DESCRIPTION.LOGIN_SUCCESS });
  } catch (error) {
    console.log(error);
    return response.status(SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error: {
        code: SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: SERVER_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR,
        type: SERVER_STATUS_CODE[SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR],
      },
    });
  }
};
