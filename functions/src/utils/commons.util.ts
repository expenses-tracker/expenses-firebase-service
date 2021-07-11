import Auth from "core-api-lib";
import getUuidByString from 'uuid-by-string';
import { logger, LOG_LEVEL } from "../configs/global.config";
import { Error, ErrorType } from "../handlers/error.model";
import { UserMetaData } from "../models/userMetaData.model";

const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);

export class CommonsUtil {
    static getUserInfo(payload: any): UserMetaData {
        const defaultUser = payload.permissions.includes('default_user');
        const isAdmin = payload.permissions.includes('admin');
        return {
            userId: payload.userId,
            fullName: payload.fullName,
            email: payload.email,
            defaultUser: defaultUser,
            isAdmin: isAdmin
        }
    }

    static getUUIDFromString(someStr: string, namespace = undefined) {
        return getUuidByString(someStr, namespace, 5);
    }

    static hashString(someStr: string) {
        return new Promise<string>((resolve, reject) => {
            Auth.hashPassword(someStr, BCRYPT_SALT_ROUNDS, (err, hash) => {
                if (err) {
                    logger.log(LOG_LEVEL.error, `Error during string hashing!`);
                    reject(Auth.MSG_BCRYPT_HASH_ERROR);
                }
                resolve(hash);
            });
        });
    }

    static createError(type: ErrorType, message: string, httpStatus: number) {
        const err = new Error();
        err.type = type;
        err.message = message;
        err.httpStatus = httpStatus;
        return err;
    }

    static dataNotFound(): Error {
        return CommonsUtil.createError(ErrorType.NO_DATA_FOUND, 'You seem to be trying to access something that doesn\'t exist', 404);
    }
}