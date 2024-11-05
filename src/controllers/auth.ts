import { Controller } from "@interfaces";
import { UserBaseSchema } from "@schemas";
import { User } from "@models";
import { hashPass, checkPass } from "@utils";
import {
  DB_STATUS_DESCRIPTION,
  SERVER_STATUS_CODE,
  SERVER_STATUS_DESCRIPTION,
  AUTH_DESCRIPTION,
} from "@enums";

// Types
type Credentials = Pick<UserBaseSchema, "email" | "password">;
type SignUp = Pick<
  UserBaseSchema,
  "email" | "name" | "image" | "lastName" | "password"
>;

// Sign In
export const signIn: Controller<Credentials> = async (
  request,
  response,
  next,
) => {
  try {
    // Credentials
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    // Validation of credentials
    if (!user)
      return response.status(SERVER_STATUS_CODE.UNAUTHORIZED).json({
        error: {
          message: SERVER_STATUS_DESCRIPTION.UNAUTHORIZED,
          status: SERVER_STATUS_CODE.UNAUTHORIZED,
          type: SERVER_STATUS_CODE[SERVER_STATUS_CODE.UNAUTHORIZED],
        },
      });
    // Validation of hashed password
    const validPass = await checkPass(password, user?.password);
    if (!validPass)
      return response.status(SERVER_STATUS_CODE.UNAUTHORIZED).json({
        error: {
          message: SERVER_STATUS_DESCRIPTION.UNAUTHORIZED,
          status: SERVER_STATUS_CODE.UNAUTHORIZED,
          type: SERVER_STATUS_CODE[SERVER_STATUS_CODE.UNAUTHORIZED],
        },
      });
    return next();
  } catch (error) {}
};

// Sign up
export const signUp: Controller<SignUp> = async (request, response, next) => {
  try {
    // Encrypt password and save it in the database
    const hashedPass = await hashPass(request.body.password);
    await User.create({
      ...request.body,
      password: hashedPass,
    });
    return next();
  } catch (error) {}
};

// Logout
export const logOut: Controller = async (request, response) => {
  try {
    response.clearCookie("accessToken");
    return response.status(SERVER_STATUS_CODE.OK).json({
      message: AUTH_DESCRIPTION.LOGOUT_SUCCESS,
    });
  } catch (error) {}
};
