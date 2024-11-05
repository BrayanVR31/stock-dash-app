import app from "./app";
import { connectDB } from "@config";

const main = async () => {
  try {
    const result = await connectDB();
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    app.listen(3000, "0.0.0.0", () =>
      console.log("Server is ready at http://192.168.100.2:3000"),
    );
  }
};

main();
