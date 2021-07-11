/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";

import { UsersService } from "../services/users.service";
import { logger, LOG_LEVEL } from "../configs/global.config";
import { CommonsUtil } from "../utils/commons.util";
import { ErrorHandler } from "../handlers/error.handler";
import { Error } from "../handlers/error.model";

/**
 * Router Definition
 */
export const usersRouter = express.Router();

/**
 * Controller Definitions
 */

// GET users/
usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UsersService.getInstance().findAllUsers();
    return res.status(200).send(users);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// GET users/:id
usersRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await UsersService.getInstance().findUserById(req.params.id);
    if (!user) {
      return ErrorHandler.handleError(res, UsersService.getInstance().userNotFound());
    }
    return res.status(200).send(user);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// GET users/:attribute/:value
usersRouter.get("/:attribute/:value", async (req: Request, res: Response) => {
  try {
    const user = await UsersService.getInstance().findUserByAttribute(req.params.attribute, req.params.value);
    if (user.length === 0) {
      return ErrorHandler.handleError(res, UsersService.getInstance().userNotFound());
    }
    return res.status(200).send(user);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// POST users/register
usersRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const defaultCurrency = req.body.currency ? req.body.currency : 'INR';
    const permissions = req.body.permissions ? req.body.permissions: ['default_user'];
    const fullName = req.body.fullName;
    const question = req.body.securityQuestion;
    const answer = req.body.securityAnswer;
    logger.log(LOG_LEVEL.info, `user ${email} trying to register...`);
    const hashedPassword = await CommonsUtil.hashString(password);
    const addedUser = await UsersService.getInstance().registerUser(email, hashedPassword, fullName, defaultCurrency, permissions, question, answer);
    logger.log(LOG_LEVEL.info, `User ${email} successfully registered!`);
    return res.status(200).send(addedUser);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// POST users/login
usersRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userLogin = await UsersService.getInstance().loginUser(email, password);
    return res.status(200).send(JSON.parse(userLogin));
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

usersRouter.post("/logout", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const userLogin = await UsersService.getInstance().logoutUser(email);
    return res.status(200).send(JSON.parse(userLogin));
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// POST items/
usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const addedUser = await UsersService.getInstance().insertUser(item);
    return res.status(200).send(addedUser);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// PUT items/
usersRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const addedUser = await UsersService.getInstance().updateUser(req.params.id, item, userData);
    return res.status(200).send(addedUser);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// DELETE items/:id
usersRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedUser = await UsersService.getInstance().deleteUser(req.params.id);
    return res.status(200).send(deletedUser);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});

// DELETE all items/
usersRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const users = await UsersService.getInstance().deleteAllUser();
    return res.status(200).send(users);
  } catch (e) {
    return ErrorHandler.handleError(res, e || new Error());
  }
});