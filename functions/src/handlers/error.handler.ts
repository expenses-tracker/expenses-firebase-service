import { Response } from 'express';
import { Error } from './error.model';

export class ErrorHandler {
    static handleError(res: Response, error: Error = new Error()) {
        return res.status(error.httpStatus || 500).send(error);
    }
}