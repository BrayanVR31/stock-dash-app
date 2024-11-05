import mongoose from "mongoose";

// Connection instance
export const connection = mongoose.createConnection(
  "mongodb://root:root@database:27017/stockdash",
);

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://root:root@database:27017/stockdash");

    return "CONNECTION WAS SUCCESS";
  } catch (error) {
    throw new Error("CONNECTION WAS FAILED");
  }
}
