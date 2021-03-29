/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";

import { ExpenseService } from "../services/expenses.service";
import { CommonsUtil } from "../utils/commons.util";

/**
 * Router Definition
 */
export const expensesRouter = express.Router();

/**
 * Controller Definitions
 */

// GET expenses/
expensesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const expenses = await ExpenseService.getInstance().findAllExpenses(userData);
    return res.status(200).send(expenses);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET expenses/categories
expensesRouter.get("/categories", async (req: Request, res: Response) => {
  try {
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const expense = await ExpenseService.getInstance().findMonthlyExpensesGroupedByCategory(userData);
    return res.status(200).send(expense);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET expenses/categories
expensesRouter.get("/paymentTypes", async (req: Request, res: Response) => {
  try {
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const expense = await ExpenseService.getInstance().findMonthlyExpensesGroupedByPaymentType(userData);
    return res.status(200).send(expense);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// POST expenses/monthYear
expensesRouter.post("/monthYear", async (req: Request, res: Response) => {
  try {
    const dateRange: {from: string, to: string} = req.body;
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const expense = await ExpenseService.getInstance().findMonthYearWiseExpenses(userData, dateRange);
    return res.status(200).send(expense);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// POST expenses/dateRange
expensesRouter.post("/dateRange", async (req: Request, res: Response) => {
  try {
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const fromDate = req.body.from;
    const toDate = req.body.to;
    const expense = await ExpenseService.getInstance().findExpenseByDateRange(userData, fromDate, toDate);
    return res.status(200).send(expense);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET expenses/:id
expensesRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const expense = await ExpenseService.getInstance().findExpenseById(req.params.id);
    return res.status(200).send(expense);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET expenses/:attribute/:value
expensesRouter.get("/:attribute/:value", async (req: Request, res: Response) => {
  try {
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const expense = await ExpenseService.getInstance().findExpenseByAttribute(userData, req.params.attribute, req.params.value);
    return res.status(200).send(expense);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// POST expenses/
expensesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const addedExpenses = await ExpenseService.getInstance().insertExpense(item);
    return res.status(200).send(addedExpenses);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// PUT expenses/
expensesRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const addedExpenses = await ExpenseService.getInstance().updateExpense(req.params.id, item);
    return res.status(200).send(addedExpenses);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// DELETE expenses/:id
expensesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedExpenses = await ExpenseService.getInstance().deleteExpense(req.params.id);
    return res.status(200).send(deletedExpenses);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// DELETE all expenses/
expensesRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const expenses = await ExpenseService.getInstance().deleteAllExpense(userData);
    return res.status(200).send(expenses);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});