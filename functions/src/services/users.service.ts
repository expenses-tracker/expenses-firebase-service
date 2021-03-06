import { logger, LOG_LEVEL } from "../configs/global.config";
import { UsersDbService } from "./users-db.service";
import { IUsers } from "../models/users.model";
import Auth from "core-api-lib";
import { generateJwt } from "core-api-lib/middleware/auth.middleware";
import { UserMetaData } from "../models/userMetaData.model";

let instance: UsersService;

export class UsersService {
    dbService = new UsersDbService();
    constructor() {
        logger.log(LOG_LEVEL.info, `UsersService initialized`);
    }

    static getInstance() {
        if (!instance) {
            instance = new UsersService()
        }
        return instance
    }

    async findAllUsers() {
        return this.dbService.find();
    }

    async findUserById(id: string) {
        return this.dbService.findById(id);
    }

    async findUserByAttribute(attr: string, value: any) {
        return this.dbService.findByAttribute(attr, value);
    }

    async insertUser(doc: IUsers) {
        return this.dbService.insert(doc);
    }

    async registerUser(email: string, password: string, fullName: string, defaultCurrency: string, permissions: string[], question: string, answer: string) {
        const ifUserExists = await this.dbService.findByAttribute(`email`, email);
        if (ifUserExists.length > 0) {
            logger.log(LOG_LEVEL.warn, `User ${email} already exists!`);
            return Promise.reject(`Username already exists`);
        }
        const identifierIdx = email.indexOf('@');
        const userId = email.substring(0, identifierIdx);
        const userDetails: IUsers = {
            userId: userId,
            email: email,
            password: password,
            fullName: fullName,
            isLoggedIn: false,
            createdBy: `Service`,
            updatedBy: `Service`,
            permissions: permissions,
            preferences: {
                currency: [{
                    type: defaultCurrency,
                    isDefault: true
                }],
                security: {
                    question: question,
                    answer: answer
                }
            },
            createdOn: new Date(),
            updatedOn: new Date()
        };
        const userInfo = await this.dbService.insert(userDetails);
        const payload = {
            userId: userInfo.userId,
            email: userDetails.email,
            permissions: userDetails.permissions,
            fullName: userDetails.fullName
        };
        const jwtToken = generateJwt(payload);
        const resObj = {
            userId: userDetails.userId,
            email: userDetails.email,
            permissions: userDetails.permissions,
            token: jwtToken
        };
        return Promise.resolve(JSON.stringify(resObj));
    }

    async loginUser(email: string, password: string) {
        const ifUserExists = await this.dbService.findByAttribute(`email`, email);
        if (ifUserExists.length === 0) {
            logger.log(LOG_LEVEL.error, `User ${email} not found!`);
            return Promise.reject(`User_Not_Found`);
        }
        const userDetails = ifUserExists[0];
        const pwdToCompare = userDetails.password;
        const comparePassword = new Promise<boolean | null>((resolve, reject) => {
            Auth.compare(password, pwdToCompare, (err, isMatched) => {
                if (err) {
                    logger.log(LOG_LEVEL.error, `Error during password comparing!`);
                    resolve(false);
                }
                resolve(isMatched);
            });
        });
        const passwordMatch = await comparePassword;
        if (passwordMatch) {
            const userLoggedIn = userDetails;
            userLoggedIn.isLoggedIn = true;
            userLoggedIn.lastLoggedOn = new Date();
            await this.dbService.update(userLoggedIn);
            const payload = {
                userId: userDetails.userId,
                email: userDetails.email,
                permissions: userDetails.permissions,
                fullName: userDetails.fullName
            };
            const jwtToken = generateJwt(payload);
            const resObj = {
                email: userDetails.email,
                permissions: userDetails.permissions,
                token: jwtToken
            };
            return Promise.resolve(JSON.stringify(resObj));
        } else {
            return Promise.reject('Wrong_Password');
        }
    }

    async logoutUser(email: string) {
        const ifUserExists = await this.dbService.findByAttribute(`email`, email);
        if (ifUserExists.length === 0) {
            logger.log(LOG_LEVEL.error, `User ${email} not found!`);
            return Promise.reject(`User_Not_Found`);
        }
        const userDetails = ifUserExists[0];
        userDetails.isLoggedIn = false;
        const res = await this.dbService.update(userDetails);
        return Promise.resolve(JSON.stringify(res));
    }

    async updateUser(_id: string, doc: IUsers, userMetaData: UserMetaData) {
        const currentUser = await this.dbService.findById(_id);
        if (!currentUser) {
            return Promise.reject(`No data found`);
        }
        doc.updatedOn = new Date();
        doc.updatedBy = userMetaData.fullName;
        return this.dbService.update(doc);
    }

    async deleteUser(_id: string) {
        const currentUser = await this.dbService.findById(_id);
        if (!currentUser) {
            return Promise.reject(`No data found`);
        }
        return this.dbService.delete(_id);
    }

    async deleteAllUser() {
        return this.dbService.deleteAll();
    }
}