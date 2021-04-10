import mongoose = require("mongoose");
import { ConfigService } from "../configs/config.service";

import { logger, LOG_LEVEL } from "../configs/global.config";

import { CategoryService } from "./categories.service";
import { DashboardService } from "./dashboard.service";
import { ExpenseService } from "./expenses.service";
import { IncomeService } from "./incomes.service";
import { PaymentTypesService } from "./payment-types.service";
import { ReferenceDataService } from "./referencedata.service";
import { SearchService } from "./search.service";
import { UsersService } from "./users.service";

export class AllServices {
    static init() {
        this.dbInit();
        DashboardService.getInstance();
        CategoryService.getInstance();
        ExpenseService.getInstance();
        IncomeService.getInstance();
        PaymentTypesService.getInstance();
        ReferenceDataService.getInstance();
        UsersService.getInstance();
        SearchService.getInstance();
    }

    static dbInit() {
        logger.log(LOG_LEVEL.info, `Connecting to Mongo...`);
        this.connect();
    }

    static connect() {
        const dbUrl = ConfigService.mongoUrl();
        mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.connection.once('open', () => {
            logger.log(LOG_LEVEL.info, 'Connected to Mongo via Mongoose');
        });
        mongoose.connection.on('error', (err) => {
            logger.log(LOG_LEVEL.error, `Unable to connect to Mongo via Mongoose: ${err}`);
        });
    }

    static dbClose() {
        mongoose.connection.close(() => {
            logger.log(LOG_LEVEL.info, `mongo connection closed successfully`);
        });
    }
}