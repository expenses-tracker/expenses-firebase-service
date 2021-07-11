/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";

import { IncomeService } from "../services/incomes.service";
import { CommonsUtil } from "../utils/commons.util";
import { ErrorHandler } from "../handlers/error.handler";
import { Error } from "../handlers/error.model";

/**
 * Router Definition
 */
export const incomesRouter = express.Router();

/**
 * Controller Definitions
 */

// GET incomes/
incomesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const incomes = await IncomeService.getInstance().findAllIncomes(userData);
    return res.status(200).send(incomes);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// POST incomes/monthYear
incomesRouter.post("/monthYear", async (req: Request, res: Response) => {
  try {
    const dateRange: {from: string, to: string} = req.body;
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const incomes = await IncomeService.getInstance().findMonthYearWiseIncome(userData, dateRange);
    return res.status(200).send(incomes);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// GET incomes/dateRange
incomesRouter.post("/dateRange", async (req: Request, res: Response) => {
  try {
    const fromDate = req.body.from;
    const toDate = req.body.to;
    const incomes = await IncomeService.getInstance().findIncomeByDateRange(fromDate, toDate);
    return res.status(200).send(incomes);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// GET incomes/:id
incomesRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const income = await IncomeService.getInstance().findIncomeById(req.params.id);
    return res.status(200).send(income);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// GET incomes/:attribute/:value
incomesRouter.get("/:attribute/:value", async (req: Request, res: Response) => {
  try {
    const income = await IncomeService.getInstance().findIncomeByAttribute(req.params.attribute, req.params.value);
    return res.status(200).send(income);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// POST incomes/
incomesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const addedIncomes = await IncomeService.getInstance().insertIncome(item);
    return res.status(200).send(addedIncomes);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// PUT incomes/
incomesRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const addedIncomes = await IncomeService.getInstance().updateIncome(req.params.id, item);
    return res.status(200).send(addedIncomes);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// DELETE incomes/:id
incomesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedIncomes = await IncomeService.getInstance().deleteIncome(req.params.id);
    return res.status(200).send(deletedIncomes);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// DELETE all incomes/
incomesRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const incomes = await IncomeService.getInstance().deleteAllIncome();
    return res.status(200).send(incomes);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});