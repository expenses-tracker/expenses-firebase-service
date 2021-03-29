import { logger, LOG_LEVEL } from "../configs/global.config";
import { IncomesDbService } from "./incomes-db.service";
import { IIncome } from "../models/incomes.model";
import { UserMetaData } from "../models/userMetaData.model";

let instance: IncomeService;

export class IncomeService {
    dbService = new IncomesDbService();
    constructor() {
        logger.log(LOG_LEVEL.info, `IncomesService initialized`);
    }

    static getInstance() {
        if (!instance) {
            instance = new IncomeService()
        }
        return instance
    }

    async findAllIncomes(userData: UserMetaData) {
        return await this.dbService.find(userData);
    }

    async findLimitedIncomes(userData: UserMetaData) {
        return await this.dbService.findLimited(5, userData);
    }

    async findIncomeById(id: string) {
        return await this.dbService.findById(id);
    }

    async findIncomeByAttribute(attr: string, value: any) {
        return await this.dbService.findByAttribute(attr, value);
    }

    async findIncomeByDateRange(fromDate: string, toDate: string) {
        return await this.dbService.findByDateRange(fromDate, toDate);
    }

    async findMonthYearWiseIncome(userData: UserMetaData, dateRange: {from: string, to: string}) {
        return await this.dbService.findMonthYearWiseIncome(userData, dateRange);
    }

    async insertIncome(doc: IIncome) {
        return await this.dbService.insert(doc);
    }

    async updateIncome(_id: string, doc: IIncome) {
        const currentIncome = await this.dbService.findById(_id);
        if (!currentIncome) {
            return Promise.resolve(`No data found`);
        }
        const docToUpdate: IIncome = {
            _id: _id,
            description: doc.description,
            amount: doc.amount,
            paymentType: doc.paymentType,
            dated: doc.dated,
            tag: doc.tag,
            subDescription: doc.subDescription,
            createdBy: currentIncome.get('createdBy'),
            updatedBy: doc.updatedBy,
            createdOn: currentIncome.get('createdOn'),
            updatedOn: new Date()
        };
        return await this.dbService.update(docToUpdate);
    }

    async deleteIncome(_id: string) {
        const currentIncome = await this.dbService.findById(_id);
        if (!currentIncome) {
            return Promise.resolve(`No data found`);
        }
        return await this.dbService.delete(_id);
    }

    async deleteAllIncome() {
        return await this.dbService.deleteAll();
    }
}