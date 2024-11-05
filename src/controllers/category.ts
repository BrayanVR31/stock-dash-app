import { Error as MongooseError } from "mongoose";
import { Controller, ServerError } from "@interfaces";
import {
  SERVER_STATUS_CODE,
  SERVER_STATUS_DESCRIPTION,
  DB_STATUS_CODE,
  DB_STATUS_DESCRIPTION,
} from "@enums";
import { Category } from "@models";
import { CategorySchema } from "@schemas";

// Get all resources
const home: Controller<CategorySchema> = async (request, response, next) => {
  try {
    const categories = await Category.find();
    return response.json({ categories });
  } catch (error) {
    let serverError = new Error("") as ServerError;
    // Server errors
    serverError.message = SERVER_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR;
    serverError.statusCode = SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR;
    serverError.type =
      SERVER_STATUS_CODE[SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR];
    return next(serverError);
  }
};

// Create a new resource(s)
const create: Controller<CategorySchema> = async (request, response, next) => {
  try {
    const category = new Category(request.body);
    await category.save();
    return response.status(201).json(category);
  } catch (error) {
    let serverError = new Error("") as ServerError;
    // Server errors
    serverError.message = SERVER_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR;
    serverError.statusCode = SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR;
    serverError.type =
      SERVER_STATUS_CODE[SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR];
    return next(serverError);
  }
};

// Get an specific resource
const edit: Controller<CategorySchema> = async (request, response, next) => {
  try {
    const category = await Category.findById(request.params.id).orFail();
    return response.json(category);
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Mongoose errors
    if (error instanceof MongooseError.CastError) {
      serverError.statusCode = DB_STATUS_CODE.CAST_ID;
      serverError.message = DB_STATUS_DESCRIPTION.CAST_ID;
      serverError.type = DB_STATUS_CODE[DB_STATUS_CODE.CAST_ID];
      return next(serverError);
    } else if (error instanceof MongooseError.DocumentNotFoundError) {
      serverError.statusCode = DB_STATUS_CODE.DOC_NOT_FOUND;
      serverError.message = DB_STATUS_DESCRIPTION.DOC_NOT_FOUND;
      serverError.type = DB_STATUS_CODE[DB_STATUS_CODE.DOC_NOT_FOUND];
      return next(serverError);
    }
    // Server errors
    serverError.message = SERVER_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR;
    serverError.statusCode = SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR;
    serverError.type =
      SERVER_STATUS_CODE[SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR];
    return next(serverError);
  }
};

// Update an specific resource
const update: Controller<CategorySchema> = async (request, response, next) => {
  try {
    const {
      params: { id },
      body,
    } = request;
    const category = await Category.findByIdAndUpdate(id, body, {
      returnDocument: "after",
    }).orFail();
    return response.json(category);
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Mongoose errors
    if (error instanceof MongooseError.CastError) {
      serverError.statusCode = DB_STATUS_CODE.CAST_ID;
      serverError.message = DB_STATUS_DESCRIPTION.CAST_ID;
      serverError.type = DB_STATUS_CODE[DB_STATUS_CODE.CAST_ID];
      return next(serverError);
    } else if (error instanceof MongooseError.DocumentNotFoundError) {
      serverError.statusCode = DB_STATUS_CODE.DOC_NOT_FOUND;
      serverError.message = DB_STATUS_DESCRIPTION.DOC_NOT_FOUND;
      serverError.type = DB_STATUS_CODE[DB_STATUS_CODE.DOC_NOT_FOUND];
      return next(serverError);
    }
    // Server errors
    serverError.message = SERVER_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR;
    serverError.statusCode = SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR;
    serverError.type =
      SERVER_STATUS_CODE[SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR];
    return next(serverError);
  }
};

// Delete a resource
const destroy: Controller<CategorySchema> = async (request, response, next) => {
  try {
    await Category.findByIdAndDelete(request.params.id).orFail();
    return response.status(204).end();
  } catch (error) {
    const serverError = new Error("") as ServerError;
    // Mongoose errors
    if (error instanceof MongooseError.CastError) {
      serverError.statusCode = DB_STATUS_CODE.CAST_ID;
      serverError.message = DB_STATUS_DESCRIPTION.CAST_ID;
      serverError.type = DB_STATUS_CODE[DB_STATUS_CODE.CAST_ID];
      return next(serverError);
    } else if (error instanceof MongooseError.DocumentNotFoundError) {
      serverError.statusCode = DB_STATUS_CODE.DOC_NOT_FOUND;
      serverError.message = DB_STATUS_DESCRIPTION.DOC_NOT_FOUND;
      serverError.type = DB_STATUS_CODE[DB_STATUS_CODE.DOC_NOT_FOUND];
      return next(serverError);
    }
    // Server errors
    serverError.message = SERVER_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR;
    serverError.statusCode = SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR;
    serverError.type =
      SERVER_STATUS_CODE[SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR];
    return next(serverError);
  }
};

export { home, create, edit, update, destroy };
