import { Types, isValidObjectId } from "mongoose";
import { connection } from "@config";

// Verify if exist an ID or set of ID's in the collection and return false or true
export async function matchIdInCollection(
  collection: string,
  id: Types.ObjectId[],
) {
  try {
    const conn = await connection.asPromise();
    const docs = await conn
      .collection(collection)
      .find({
        $or: id.map((_id) => ({ _id })),
      })
      .toArray();
    return id.length === docs.length;
  } catch (error) {
    return false;
  }
}

// Cast string format to ObjectId
export function castIdToObjectId(id: string | string[]) {
  const ids = typeof id === "string" ? [id] : id;
  // Casted array of string or string into falsy values
  const castedIdToValidObjects: number[] =
    ids.length !== 0
      ? ids.map((value) => (isValidObjectId(value) ? 1 : 0))
      : [0];
  const hasIdValidFormat = Boolean(
    castedIdToValidObjects.reduce((prev, current) => prev * current),
  );

  if (!hasIdValidFormat) {
    throw new Error("The set of arguments are not valid with ObjectId format");
  }

  return ids.map((id) => new Types.ObjectId(id));
}
