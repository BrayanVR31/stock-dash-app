import { z } from "zod";
import { User as UserInt } from "@interfaces";
import {
  verifyIdInCollection,
  parsedToObjectId,
  verifyExistingUserBy,
} from "@utils";

// Types
interface Shape
  extends Pick<UserInt, "email" | "name" | "lastName" | "password" | "image"> {
  confirmationPassword: string;
}

// Schemas
export const User = z
  .object({
    email: z
      .string({
        required_error: "The email is a required field",
        invalid_type_error:
          "The email must be string and it would have valid structure",
      })
      .email()
      .refine(verifyExistingUserBy("email"), {
        message: "The user is already register in the system, try again",
        path: ["existingCredentials"],
      }),
    name: z.string({
      required_error: "The name is a required field",
      invalid_type_error: "The name must be string",
    }),
    lastName: z.string({
      required_error: "The lastName is a required field",
      invalid_type_error: "The lastName must be string",
    }),
    password: z
      .string({
        required_error: "The password is a required field",
        invalid_type_error: "The password must be string",
      })
      .min(14),
    confirmationPassword: z.string().min(14, {
      message:
        "The password is so weak and it must be have at leats 14 characters as minimum",
    }),
    image: z.array(z.string()).optional(),
  })
  .refine(
    ({ confirmationPassword, password }) => confirmationPassword === password,
    { message: "The confirmation password doesn't match with previous" },
  ) satisfies z.ZodType<Shape>;

export const UserPartial = User.sourceType().partial();
export const UserLogin = z.object({
  email: z
    .string({
      required_error: "The email is a required field",
      invalid_type_error:
        "The email must be string and it would have valid structure",
    })
    .email()
    .refine(
      async (email) => {
        return !(await verifyExistingUserBy("email")(email));
      },
      {
        message: "The email is not register in the system, please try again",
        path: ["existingCredentials"],
      },
    ),
  password: z
    .string({
      required_error: "The password is a required field",
      invalid_type_error: "The password must be string",
    })
    .min(14),
});

// Schema types
export type UserBaseSchema = z.infer<typeof User>;
export type UserPartialSchema = z.infer<typeof UserPartial>;
export type UserLoginSchema = z.infer<typeof UserLogin>;
