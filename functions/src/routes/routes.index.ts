import express from "express";

import { categoriesRouter } from "./categories.route";
import { dashboardRouter } from "./dashboard.route";
import { expensesRouter } from "./expenses.route";
import { incomesRouter } from "./incomes.route";
import { paymentTypesRouter } from "./payment-types.route";
import { referenceDataRouter } from "./referencedata.route";
import { searchRouter } from "./search.route";
import { usersRouter } from "./users.route";

export class AllRoutes {
    static init(app: express.Express) {
        app.use('/dashboard', dashboardRouter);
        app.use('/categories', categoriesRouter);
        app.use('/expenses', expensesRouter);
        app.use('/incomes', incomesRouter);
        app.use('/paymentTypes', paymentTypesRouter);
        app.use('/users', usersRouter);
        app.use('/referenceData', referenceDataRouter);
        app.use('/search', searchRouter);

        app.get('/', (req, res, next) => {
            res.send('Hoorah! Expenses Service is ready...');
        });

        app.get('/web/env.js', (req, res, next) => {
            let settings = undefined;
            try {
                settings = require('../configs/environment.web');
                res.set('Content-Type', 'text/javascript');
                res.status(200).send(`window.webAppConfig = ${JSON.stringify(settings?.environment)}`);
            } catch(e) {
                res.status(500).send({message: e.message});
            }
        });

        app.get('/healthCheck', (req, res, next) => {
            res.status(200).send('success');
        });
    }
}