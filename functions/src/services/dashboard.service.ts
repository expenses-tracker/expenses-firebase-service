import { logger, LOG_LEVEL } from "../configs/global.config";
import { UserMetaData } from "../models/userMetaData.model";
import { ExpenseService } from "./expenses.service";
import { IncomeService } from "./incomes.service";

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