/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";

import { IncomeService } from "../services/incomes.service";
import { CommonsUtil } from "../utils/commons.util";

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
    return res.status(500).send(e.message);
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
    return res.status(500).send(e.message);
  }
});

// GET incomes/dateRange
incomesRouter.post("/dateRange", async (req: Request, res: Response) => {
  try {
    const fromDate = req.body.from;
    const toDate = req.body.to;
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const incomes = await IncomeService.getInstance().findIncomeByDateRange(userData, fromDate, toDate);
    return res.status(200).send(incomes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET incomes/:id
incomesRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const income = await IncomeService.getInstance().findIncomeById(req.params.id);
    return res.status(200).send(income);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET incomes/:attribute/:value
incomesRouter.get("/:attribute/:value", async (req: Request, res: Response) => {
  try {
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const income = await IncomeService.getInstance().findIncomeByAttribute(userData, req.params.attribute, req.params.value);
    return res.status(200).send(income);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// POST incomes/
incomesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const addedIncomes = await IncomeService.getInstance().insertIncome(item);
    return res.status(200).send(addedIncomes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// PUT incomes/
incomesRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const addedIncomes = await IncomeService.getInstance().updateIncome(req.params.id, item);
    return res.status(200).send(addedIncomes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// DELETE incomes/:id
incomesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedIncomes = await IncomeService.getInstance().deleteIncome(req.params.id);
    return res.status(200).send(deletedIncomes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// DELETE all incomes/
incomesRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const incomes = await IncomeService.getInstance().deleteAllIncome();
    return res.status(200).send(incomes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});