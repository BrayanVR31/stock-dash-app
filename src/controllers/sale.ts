import { Error as MongooseError } from "mongoose";
import { Controller, ServerError } from "@interfaces";
import {
  SERVER_STATUS_CODE,
  SERVER_STATUS_DESCRIPTION,
  DB_STATUS_CODE,
  DB_STATUS_DESCRIPTION,
} from "@enums";
import { Sale } from "@models";
import { SaleBaseSchema } from "@schemas";

// Get all resources
const home: Controller<SaleBaseSchema> = async (request, response, next) => {
  try {
    const sales = await Sale.find();
    return response.json({ sales });
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
const create: Controller<SaleBaseSchema> = async (request, response, next) => {
  try {
    const sale = new Sale(request.body);
    await sale.save();
    return response.status(201).json(sale);
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
const edit: Controller<SaleBaseSchema> = async (request, response, next) => {
  try {
    const sale = await Sale.findById(request.params.id).orFail();
    return response.json(sale);
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
const update: Controller<SaleBaseSchema> = async (request, response, next) => {
  try {
    const {
      params: { id },
      body,
    } = request;
    const sale = await Sale.findByIdAndUpdate(id, body, {
      returnDocument: "after",
    }).orFail();
    return response.json(sale);
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
const destroy: Controller<SaleBaseSchema> = async (request, response, next) => {
  try {
    await Sale.findByIdAndDelete(request.params.id).orFail();
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
