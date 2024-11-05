import express from "express";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { api } from "@routes";
import { swaggerSpecification } from "@config";
import { handleServerError } from "@middlewares";
import { SERVER_STATUS_CODE, SERVER_STATUS_DESCRIPTION } from "@enums";

const app = express();
// Configuration
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Route paths
app.use(api);
app.use("/api/docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerSpecification));
app.use(handleServerError);
app.use("*", (request, response) => {
  response.status(SERVER_STATUS_CODE.NOT_FOUND).json({
    error: {
      code: SERVER_STATUS_CODE.NOT_FOUND,
      message: SERVER_STATUS_DESCRIPTION.NOT_FOUND,
      type: SERVER_STATUS_CODE[SERVER_STATUS_CODE.NOT_FOUND],
    },
  });
});

export default app;
