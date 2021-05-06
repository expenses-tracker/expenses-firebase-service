import { logger, LOG_LEVEL } from "../configs/global.config";
import { UserMetaData } from "../models/userMetaData.model";
import { ExpenseService } from "./expenses.service";
import { IncomeService } from "./incomes.service";
import * as lodash from 'lodash';

let instance: DashboardService;

export class DashboardService {
    constructor() {
        logger.log(LOG_LEVEL.info, `DashboardService initialized`);
    }

    static getInstance() {
        if (!instance) {
            instance = new DashboardService()
        }
        return instance
    }

    async getDashboardData(userData: UserMetaData, dateRange: {from: string, to: string}) {
        const recentExpenses = await ExpenseService.getInstance().findLimitedExpenses(userData);
        const expenseChart = await ExpenseService.getInstance().findMonthYearWiseExpenses(userData, dateRange);
        const recentIncomes = await IncomeService.getInstance().findLimitedIncomes(userData);
        const incomeChart = await IncomeService.getInstance().findMonthYearWiseIncome(userData, dateRange);
        const allIdsInExpenseCharts = lodash.sortBy(lodash.map(expenseChart, '_id'), ['month']);
        const allIdsInIncomeCharts = lodash.sortBy(lodash.map(incomeChart, '_id'), ['month']);
        const diffInExpenseChart = lodash.differenceBy(allIdsInExpenseCharts, allIdsInIncomeCharts, 'month');
        const diffInIncomeChart = lodash.differenceBy(allIdsInIncomeCharts, allIdsInExpenseCharts, 'month');
        diffInExpenseChart.forEach(diff => {
            incomeChart.push({
                _id: diff,
                amount: 0,
                paymentTypes: []
            });
        });
        diffInIncomeChart.forEach(diff => {
            expenseChart.push({
                _id: diff,
                amount: 0,
                paymentTypes: [],
                categories: []
            });
        });
        return {
            expenses: {
                entries: recentExpenses,
                chart: expenseChart
            },
            incomes: {
                entries: recentIncomes,
                chart: incomeChart
            }
        };
    }

}