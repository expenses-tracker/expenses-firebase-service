/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";

import { DashboardService } from "../services/dashboard.service";
import { CommonsUtil } from "../utils/commons.util";


/**
 * Router Definition
 */
export const dashboardRouter = express.Router();

/**
 * Controller Definitions
 */

// POST dashboard/
dashboardRouter.post("/", async (req: Request, res: Response) => {
  try {
    const dates: {from: string, to: string} = req.body;
    const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
    const data = await DashboardService.getInstance().getDashboardData(userData, dates);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});
