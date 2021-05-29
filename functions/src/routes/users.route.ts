/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";

import { UsersService } from "../services/users.service";
import { logger, LOG_LEVEL } from "../configs/global.config";
import Auth from "core-api-lib";
import { CommonsUtil } from "../utils/commons.util";

/**
 * Router Definition
 */
export const usersRouter = express.Router();
const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);

/**
 * Controller Definitions
 */

// GET users/
usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UsersService.getInstance().findAllUsers();
    return res.status(200).send(users);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET users/:id
usersRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const paymentType = await UsersService.getInstance().findUserById(req.params.id);
    return res.status(200).send(paymentType);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET users/:attribute/:value
usersRouter.get("/:attribute/:value", async (req: Request, res: Response) => {
  try {
    const paymentType = await UsersService.getInstance().findUserByAttribute(req.params.attribute, req.params.value);
    return res.status(200).send(paymentType);
  } catch (e) {
    return res.status(500).send(e.message);
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
    const hashPassword = new Promise<string>((resolve, reject) => {
      Auth.hashPassword(password, BCRYPT_SALT_ROUNDS, (err, hash) => {
        if (err) {
          logger.log(LOG_LEVEL.error, `Error during password hashing!`);
         reject(Auth.MSG_BCRYPT_HASH_ERROR);
        }
        resolve(hash);
      });
    });
    const hashedPassword = await hashPassword;
    const addedUser = await UsersService.getInstance().registerUser(email, hashedPassword, fullName, defaultCurrency, permissions, question, answer);
    logger.log(LOG_LEVEL.info, `User ${email} successfully registered!`);
    return res.status(200).send(addedUser);
  } catch (e) {
    return res.status(500).send(e.message);
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
    if (e === 'User_Not_Found') {
      return res.status(404).send(e);
    }
    if (e === 'Wrong_Password') {
      return res.status(403).send('Incorrect Password. Please try again.');
    }
    return res.status(500).send(e.message);
  }
});

usersRouter.post("/logout", async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const userLogin = await UsersService.getInstance().logoutUser(email);
    return res.status(200).send(JSON.parse(userLogin));
  } catch (e) {
    if (e === 'User_Not_Found') {
      return res.status(404).send(e);
    }
    return res.status(500).send(e.message);
  }
});

// POST items/
usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const addedUser = await UsersService.getInstance().insertUser(item);
    return res.status(200).send(addedUser);
  } catch (e) {
    return res.status(500).send(e.message);
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
    return res.status(500).send(e.message);
  }
});

// DELETE items/:id
usersRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedUser = await UsersService.getInstance().deleteUser(req.params.id);
    return res.status(200).send(deletedUser);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// DELETE all items/
usersRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const users = await UsersService.getInstance().deleteAllUser();
    return res.status(200).send(users);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});