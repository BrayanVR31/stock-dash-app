import { Error as MongooseError } from "mongoose";
import { Product as ProductInt, Controller, ServerError } from "@interfaces";
import { Product } from "@models";
import {
  SERVER_STATUS_CODE,
  SERVER_STATUS_DESCRIPTION,
  DB_STATUS_CODE,
  DB_STATUS_DESCRIPTION,
} from "@enums";

// Types
type Body = Pick<
  ProductInt,
  | "name"
  | "images"
  | "categories"
  | "description"
  | "price"
  | "quantity"
  | "status"
  | "stock"
  | "suppliers"
>;

// Get all resources
const home: Controller<Body> = async (request, response, next) => {
  try {
    const products = await Product.find().populate("categories", {
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    return response.json({ products });
  } catch (error) {
    let serverError = new Error("") as ServerError;
    // Server errors
    serverError.message = SERVER_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR;
    serverError.statusCode = SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR;
    return next(serverError);
  }
};

// Create a new resource(s)
const create: Controller = async (request, response, next) => {
  try {
    response.json(request.body);
    const product = new Product(request.body);
    await product.save();
    return response.status(201).json(product);
  } catch (error) {
    let serverError = new Error("") as ServerError;
    // Server errors
    serverError.message = SERVER_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR;
    serverError.statusCode = SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR;
    return next(serverError);
  }
};

// Get an specific resource
const edit: Controller = async (request, response, next) => {
  try {
    const product = await Product.findById(request.params.id)
      .populate("categories", {
        _id: 0,
        createdAt: 0,
        updatedAt: 0,
      })
      .orFail();
    return response.json(product);
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Mongoose errors
    if (error instanceof MongooseError.CastError) {
      serverError.statusCode = DB_STATUS_CODE.CAST_ID;
      serverError.message = DB_STATUS_DESCRIPTION.CAST_ID;
      return next(serverError);
    } else if (error instanceof MongooseError.DocumentNotFoundError) {
      serverError.statusCode = DB_STATUS_CODE.DOC_NOT_FOUND;
      serverError.message = DB_STATUS_DESCRIPTION.DOC_NOT_FOUND;
      return next(serverError);
    }
    // Server errors
    serverError.message = SERVER_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR;
    serverError.statusCode = SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR;
    return next(serverError);
  }
};

// Update an specific resource
const update: Controller = async (request, response, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        returnDocument: "after",
      },
    ).orFail();
    return response.json(product);
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Mongoose errors
    if (error instanceof MongooseError.CastError) {
      serverError.statusCode = DB_STATUS_CODE.CAST_ID;
      serverError.message = DB_STATUS_DESCRIPTION.CAST_ID;
      return next(serverError);
    } else if (error instanceof MongooseError.DocumentNotFoundError) {
      serverError.statusCode = DB_STATUS_CODE.DOC_NOT_FOUND;
      serverError.message = DB_STATUS_DESCRIPTION.DOC_NOT_FOUND;
      return next(serverError);
    }
    // Server errors
    serverError.message = SERVER_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR;
    serverError.statusCode = SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR;
    return next(serverError);
  }
};

// Delete a resource
const destroy: Controller = async (request, response, next) => {
  try {
    await Product.findByIdAndDelete(request.params.id).orFail();
    return response.status(204).end();
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Mongoose errors
    if (error instanceof MongooseError.CastError) {
      serverError.statusCode = DB_STATUS_CODE.CAST_ID;
      serverError.message = DB_STATUS_DESCRIPTION.CAST_ID;
      return next(serverError);
    } else if (error instanceof MongooseError.DocumentNotFoundError) {
      serverError.statusCode = DB_STATUS_CODE.DOC_NOT_FOUND;
      serverError.message = DB_STATUS_DESCRIPTION.DOC_NOT_FOUND;
      return next(serverError);
    }
    // Server errors
    serverError.message = SERVER_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR;
    serverError.statusCode = SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR;
    return next(serverError);
  }
};

export { home, create, edit, update, destroy };
