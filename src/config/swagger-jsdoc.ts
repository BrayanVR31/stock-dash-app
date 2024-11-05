import path from "node:path";
import swaggerJsdoc, { Options, SwaggerDefinition } from "swagger-jsdoc";

const routePath = path.join(__dirname, "..", "docs");

// Swagger definition
const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Stockdash api",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://192.168.100.2:3000/api/v1",
      description: "Development server",
    },
  ],
};

// Options
const options: Options = {
  failOnErrors: true,
  swaggerDefinition,
  apis: [`${routePath}/api/**/*.yml`],
};

// Specification
const swaggerSpecification = swaggerJsdoc(options);

export { swaggerSpecification };
