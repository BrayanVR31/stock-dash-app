import { genSalt, hash, compare } from "bcryptjs";

/**
 * Hash a new password
 */
export async function hashPass(password: string) {
  try {
    const salt = await genSalt(10);
    return await hash(password, salt);
  } catch (error) {
    console.log(error);
  }
}

/**
 * Check the matched password
 * return value is truthy
 */
export async function checkPass(password: string, hashedPassword: string) {
  try {
    return await compare(password, hashedPassword);
  } catch (error) {}
}
