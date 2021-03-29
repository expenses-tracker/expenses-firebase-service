import mongoose = require("mongoose");

import { logger, LOG_LEVEL } from "../configs/global.config";
import { ExpenseModel, IExpense } from "../models/expenses.model";
import { MonthlyCategoryExpensesQueryBuilder } from "../queries/category-expenses.query";
import { MonthlyPaymentTypeExpensesQueryBuilder } from "../queries/payment-type-expenses.query";
import { MonthYearExpensesQueryBuilder } from "../queries/month-year-expenses.query";
import { UserMetaData } from "../models/userMetaData.model";
import { ConfigService } from "../configs/config.service";

export class ExpensesDbService {

    model = ExpenseModel;

    constructor() {
        logger.log(LOG_LEVEL.verbose, `ExpensesDbService initialized`);
    }

    connect() {
        mongoose.connect(ConfigService.mongoUrl(), { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.connection.once('open', () => {
            logger.log(LOG_LEVEL.info, 'Connected to Mongo via Mongoose');
        });
        mongoose.connection.on('error', (err) => {
            logger.log(LOG_LEVEL.error, `Unable to connect to Mongo via Mongoose: ${err}`);
        });
    }

    find(userData: UserMetaData) {
        return this.model.find({createdBy: userData.fullName}).sort({ 'dated': -1 }).exec();
    }

    findLimited(limit: number, userData: UserMetaData) {
        return this.model.find({createdBy: userData.fullName}).sort({ 'dated': -1 }).limit(limit).exec();
    }

    findById(id: string) {
        return this.model.findById(id).exec();
    }

    findByAttribute(userData: UserMetaData, attr: string, value: any) {
        return this.model.find({ [attr]: value, createdBy: userData.fullName }).sort({ 'dated': -1 }).exec();
    }

    findByDateRange(userData: UserMetaData, fromDate: string, toDate: string) {
        return this.model.find({ dated: {$gte: new Date(fromDate), $lte: new Date(toDate)}, createdBy: userData.fullName }).sort({ 'dated': -1 }).exec();
    }

    findMonthlyExpensesGroupedByCategory(userData: UserMetaData) {
        return this.model.aggregate(MonthlyCategoryExpensesQueryBuilder.build(userData)).sort({ '_id.category': 1 }).exec();
    }

    findMonthlyExpensesGroupedByPaymentType(userData: UserMetaData) {
        return this.model.aggregate(MonthlyPaymentTypeExpensesQueryBuilder.build(userData)).sort({ '_id.paymentType': 1 }).exec();
    }

    findMonthYearWiseExpenses(userData: UserMetaData, dateRange: {from: string, to: string}) {
        return this.model.aggregate(MonthYearExpensesQueryBuilder.build(userData, dateRange)).exec();
    }

    insert(doc: IExpense) {
        return this.model.create(doc);
    }

    update(doc: IExpense) {
        return this.model.updateOne({_id: doc._id}, doc).exec();
    }

    delete(_id: string) {
        return this.model.deleteOne({_id: _id}).exec();
    }

    deleteAll(userData: UserMetaData) {
        return this.model.deleteMany({createdBy: userData.fullName}).exec();
    }
}