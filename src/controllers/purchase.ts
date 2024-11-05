import { Error as MongooseError } from "mongoose";
import { Controller, ServerError } from "@interfaces";
import {
  SERVER_STATUS_CODE,
  SERVER_STATUS_DESCRIPTION,
  DB_STATUS_CODE,
  DB_STATUS_DESCRIPTION,
} from "@enums";
import { Purchase } from "@models";
import { PurchaseIntBase, PurchaseIntPartial } from "@schemas";

// Get all resources
const home: Controller = async (request, response, next) => {
  try {
    const purchases = await Purchase.find()
      .populate("products")
      .populate("supplier");
    return response.json({ purchases });
  } catch (error) {
    let serverError = new Error("") as ServerError;
    // Server errors
    serverError.message = SERVER_STATUS_DESCRIPTION.INTERNAL_SERVER_ERROR;
    serverError.statusCode = SERVER_STATUS_CODE.INTERNAL_SERVER_ERROR;
    return next(serverError);
  }
};

// Create a new resource(s)
const create: Controller<PurchaseIntBase> = async (request, response, next) => {
  try {
    const purchase = new Purchase(request.body);
    await purchase.save();
    return response.status(201).json(purchase);
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
    const purchase = await Purchase.findById(request.params.id)
      .populate("products")
      .populate("supplier")
      .orFail();
    return response.json(purchase);
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
const update: Controller<PurchaseIntPartial> = async (
  request,
  response,
  next,
) => {
  try {
    const purchase = await Purchase.findByIdAndUpdate(
      request.params.id,
      request.body,
      { returnDocument: "after" },
    ).orFail();
    return response.json(purchase);
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
    await Purchase.findByIdAndDelete(request.params.id).orFail();
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
