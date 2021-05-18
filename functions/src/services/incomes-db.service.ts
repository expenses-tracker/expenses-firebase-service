import mongoose = require("mongoose");
import { ConfigService } from "../configs/config.service";

import { logger, LOG_LEVEL } from "../configs/global.config";
import { IncomeModel, IIncome } from "../models/incomes.model";
import { UserMetaData } from "../models/userMetaData.model";
import { MonthYearIncomeQueryBuilder } from "../queries/month-year-income.query";

export class IncomesDbService {

    model = IncomeModel;

    constructor() {
        logger.log(LOG_LEVEL.verbose, `IncomesDbService initialized`);
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

    findByAttribute(attr: string, value: any) {
        return this.model.find({ [attr]: value }).sort({ 'dated': -1 }).exec();
    }

    findByDateRange(fromDate: string, toDate: string) {
        return this.model.find({ dated: {$gte: new Date(fromDate), $lte: new Date(toDate)} }).sort({ 'dated': -1 }).exec();
    }

    findMonthYearWiseIncome(userData: UserMetaData, dateRange: {from: string, to: string}) {
        return this.model.aggregate(MonthYearIncomeQueryBuilder.build(userData, dateRange)).exec();
    }

    insert(doc: IIncome) {
        return this.model.create(doc);
    }

    update(doc: IIncome) {
        return this.model.updateOne({_id: doc._id}, doc).exec();
    }

    delete(_id: string) {
        return this.model.deleteOne({_id: _id}).exec();
    }

    deleteAll() {
        return this.model.deleteMany({}).exec();
    }
}