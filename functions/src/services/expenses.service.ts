import { logger, LOG_LEVEL } from "../configs/global.config";
import { ExpensesDbService } from "./expenses-db.service";
import { IExpense } from "../models/expenses.model";
import { UserMetaData } from "../models/userMetaData.model";

let instance: ExpenseService;

export class ExpenseService {
    dbService = new ExpensesDbService();
    constructor() {
        logger.log(LOG_LEVEL.info, `ExpensesService initialized`);
    }

    static getInstance() {
        if (!instance) {
            instance = new ExpenseService()
        }
        return instance
    }

    async findAllExpenses(userData: UserMetaData) {
        return await this.dbService.find(userData);
    }

    async findLimitedExpenses(userData: UserMetaData) {
        return await this.dbService.findLimited(5, userData);
    }

    async findExpenseById(id: string) {
        return await this.dbService.findById(id);
    }

    async findExpenseByAttribute(userData: UserMetaData, attr: string, value: any) {
        return await this.dbService.findByAttribute(userData, attr, value);
    }

    async findExpenseByDateRange(userData: UserMetaData, fromDate: string, toDate: string) {
        return await this.dbService.findByDateRange(userData, fromDate, toDate);
    }

    async findMonthlyExpensesGroupedByCategory(userData: UserMetaData) {
        return await this.dbService.findMonthlyExpensesGroupedByCategory(userData);
    }

    async findMonthlyExpensesGroupedByPaymentType(userData: UserMetaData) {
        return await this.dbService.findMonthlyExpensesGroupedByPaymentType(userData);
    }

    async findMonthYearWiseExpenses(userData: UserMetaData, dateRange: {from: string, to: string}) {
        return await this.dbService.findMonthYearWiseExpenses(userData, dateRange);
    }

    async insertExpense(doc: IExpense) {
        return await this.dbService.insert(doc);
    }

    async updateExpense(_id: string, doc: IExpense) {
        const currentExpense = await this.dbService.findById(_id);
        if (!currentExpense) {
            return Promise.resolve(`No data found`);
        }
        const docToUpdate: IExpense = {
            _id: _id,
            description: doc.description,
            amount: doc.amount,
            paymentType: doc.paymentType,
            category: doc.category,
            dated: doc.dated,
            tag: doc.tag,
            subDescription: doc.subDescription,
            createdBy: currentExpense.get('createdBy'),
            updatedBy: doc.updatedBy,
            createdOn: currentExpense.get('createdOn'),
            updatedOn: new Date()
        };
        return await this.dbService.update(docToUpdate);
    }

    async deleteExpense(_id: string) {
        const currentExpense = await this.dbService.findById(_id);
        if (!currentExpense) {
            return Promise.resolve(`No data found`);
        }
        return await this.dbService.delete(_id);
    }

    async deleteAllExpense(userData: UserMetaData) {
        return await this.dbService.deleteAll(userData);
    }
}