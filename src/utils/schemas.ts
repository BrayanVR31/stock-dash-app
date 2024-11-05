import { Types } from "mongoose";
import { User } from "@models";
import { z } from "zod";
import { castIdToObjectId, matchIdInCollection } from "@utils";

// Define error definition when the transformation to object id fails
export const parsedToObjectId = (errorDef: z.IssueData) => {
  // Parsed each given string into ObjectId format (mongodb)
  return function (arg: string[] | string, ctx: z.RefinementCtx) {
    try {
      const parsedIds = castIdToObjectId(arg);
      return parsedIds;
    } catch (error) {
      ctx.addIssue(errorDef);
      return z.NEVER;
    }
  };
};

// Verify each ID exists in documents saved in a collection
export const verifyIdInCollection =
  (collection: string) => async (value: Types.ObjectId[]) => {
    return await matchIdInCollection(collection, value);
  };

export const getItemFromArray = <T>(arg: T[], ctx: z.RefinementCtx) => {
  if (arg.length > 0) return arg[0];
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Error while it was processed the list data",
  });
  return z.NEVER;
};

// Find user in the collection using certain parameters
/**
 * value: can be any parameter related with unique data (string)
 * condition: it's related with fields in document to match the value
 */
export const verifyExistingUserBy =
  (condition: string) => async (value: string) => {
    try {
      const user = await User.findOne({ [`${condition}`]: value });
      if (!user) return true;
      return false;
    } catch (error) {
      return false;
    }
  };
