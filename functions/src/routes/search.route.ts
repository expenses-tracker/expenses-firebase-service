/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import { SearchMetaData } from "../models/searchMetaData.model";
import { SearchService } from "../services/search.service";
import { CommonsUtil } from "../utils/commons.util";

/**
 * Router Definition
 */
export const searchRouter = express.Router();

/**
 * Controller Definitions
 */

// POST search/
searchRouter.post("/", async (req: Request, res: Response) => {
    try {
        const userData = CommonsUtil.getUserInfo(res.locals.jwtPayload);
        const searchAttr: SearchMetaData = req.body;
        const searchResults = await SearchService.getInstance().searchData(userData, searchAttr);
        return res.status(200).send(searchResults);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});