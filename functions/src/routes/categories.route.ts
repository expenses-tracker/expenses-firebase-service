/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";

import { CategoryService } from "../services/categories.service";
import { CommonsUtil } from "../utils/commons.util";

/**
 * Router Definition
 */
export const categoriesRouter = express.Router();

/**
 * Controller Definitions
 */

// GET categories/
categoriesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const paymentTypes = await CategoryService.getInstance().findAllCategories(userData);
    return res.status(200).send(paymentTypes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET categories/:id
categoriesRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const paymentType = await CategoryService.getInstance().findCategoryById(req.params.id);
    return res.status(200).send(paymentType);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET categories/:attribute/:value
categoriesRouter.get("/:attribute/:value", async (req: Request, res: Response) => {
  try {
    const paymentType = await CategoryService.getInstance().findCategoryByAttribute(req.params.attribute, req.params.value);
    return res.status(200).send(paymentType);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// POST categories/
categoriesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const addedPaymentTypes = await CategoryService.getInstance().insertCategory(item);
    return res.status(200).send(addedPaymentTypes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// PUT categories/
categoriesRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const addedPaymentTypes = await CategoryService.getInstance().updateCategory(req.params.id, item);
    return res.status(200).send(addedPaymentTypes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// DELETE categories/:id
categoriesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedPaymentTypes = await CategoryService.getInstance().deleteCategory(req.params.id);
    return res.status(200).send(deletedPaymentTypes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// DELETE all categories/
categoriesRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const paymentTypes = await CategoryService.getInstance().deleteAllCategory();
    return res.status(200).send(paymentTypes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});