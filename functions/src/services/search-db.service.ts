import mongoose = require("mongoose");
import { ConfigService } from "../configs/config.service";

import { logger, LOG_LEVEL } from "../configs/global.config";
import { ExpenseModel } from "../models/expenses.model";
import { IncomeModel } from "../models/incomes.model";
import { SearchMetaData } from "../models/searchMetaData.model";
import { UserMetaData } from "../models/userMetaData.model";
import { SearchQueryBuilder } from "../queries/search.query";

export class SearchDbService {
    incomeModel = IncomeModel;
    expenseModel = ExpenseModel;

    constructor() {
        logger.log(LOG_LEVEL.verbose, `SearchDbService initialized`);
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

    search(userData: UserMetaData, searchAttr: SearchMetaData) {
        if (searchAttr.type === 'expenses') {
            return this.searchExpenses(userData, searchAttr);
        } else {
            return this.searchIncomes(userData, searchAttr);
        }
    }

    private searchIncomes(userData: UserMetaData, searchAttr: SearchMetaData) {
        return this.incomeModel.aggregate(SearchQueryBuilder.build(userData, searchAttr)).exec();
    }

    private searchExpenses(userData: UserMetaData, searchAttr: SearchMetaData) {
        return this.expenseModel.aggregate(SearchQueryBuilder.build(userData, searchAttr)).exec();
    }
}