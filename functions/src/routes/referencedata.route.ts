/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";

import { ReferenceDataService } from "../services/referencedata.service";
import { ErrorHandler } from "../handlers/error.handler";
import { Error } from "../handlers/error.model";

/**
 * Router Definition
 */
export const referenceDataRouter = express.Router();

/**
 * Controller Definitions
 */

// GET referenceData/
referenceDataRouter.get("/", async (req: Request, res: Response) => {
  try {
    const referenceData = await ReferenceDataService.getInstance().findAllReferenceData();
    return res.status(200).send(referenceData);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// GET referenceData/:id
referenceDataRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const income = await ReferenceDataService.getInstance().findReferenceDataById(req.params.id);
    return res.status(200).send(income);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// GET referenceData/:attribute/:value
referenceDataRouter.get("/:attribute/:value", async (req: Request, res: Response) => {
  try {
    const income = await ReferenceDataService.getInstance().findReferenceDataByAttribute(req.params.attribute, req.params.value);
    return res.status(200).send(income);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// POST referenceData/
referenceDataRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const addedIncomes = await ReferenceDataService.getInstance().insertReferenceData(item);
    return res.status(200).send(addedIncomes);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// DELETE referenceData/:id
referenceDataRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedIncomes = await ReferenceDataService.getInstance().deleteReferenceData(req.params.id);
    return res.status(200).send(deletedIncomes);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// DELETE all referenceData/
referenceDataRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const referenceData = await ReferenceDataService.getInstance().deleteAllReferenceData();
    return res.status(200).send(referenceData);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});