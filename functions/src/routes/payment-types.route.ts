/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";

import { PaymentTypesService } from "../services/payment-types.service";
import { CommonsUtil } from "../utils/commons.util";

/**
 * Router Definition
 */
export const paymentTypesRouter = express.Router();

/**
 * Controller Definitions
 */

// GET paymentTypes/
paymentTypesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const paymentTypes = await PaymentTypesService.getInstance().findAllPaymentTypes(userData);
    return res.status(200).send(paymentTypes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET paymentTypes/:id
paymentTypesRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const paymentType = await PaymentTypesService.getInstance().findPaymentTypeById(req.params.id);
    return res.status(200).send(paymentType);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET paymentTypes/:attribute/:value
paymentTypesRouter.get("/:attribute/:value", async (req: Request, res: Response) => {
  try {
    const paymentType = await PaymentTypesService.getInstance().findPaymentTypeByAttribute(req.params.attribute, req.params.value);
    return res.status(200).send(paymentType);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// POST items/
paymentTypesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const addedPaymentTypes = await PaymentTypesService.getInstance().insertPaymentType(item);
    return res.status(200).send(addedPaymentTypes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// PUT items/
paymentTypesRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const addedPaymentTypes = await PaymentTypesService.getInstance().updatePaymentType(req.params.id, item);
    return res.status(200).send(addedPaymentTypes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// DELETE items/:id
paymentTypesRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedPaymentTypes = await PaymentTypesService.getInstance().deletePaymentType(req.params.id);
    return res.status(200).send(deletedPaymentTypes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// DELETE all items/
paymentTypesRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const paymentTypes = await PaymentTypesService.getInstance().deleteAllPaymentType();
    return res.status(200).send(paymentTypes);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});