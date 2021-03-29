import * as functions from 'firebase-functions';

const defaultServiceEndpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
    user: '/users/',
    dashboard: '/dashboard/',
    referenceData: '/referenceData/',
    categoryService: '/categories/',
    paymentTypesService: '/paymentTypes/',
    incomeService: '/incomes/',
    expenseService: '/expenses/',
    monthlyExpense: '/expenses/monthYear',
    monthlyIncome: '/incomes/monthYear',
    monthlyCategoryExpense: '/expenses/categories',
    monthlyPaymentTypeExpense: '/expenses/paymentTypes',
    dateRange: 'dateRange',
  };

exports.environment = {
    production: functions.config().expenseservice?.environment === 'prod',
    service: {
        domain: functions.config().expenseservice?.environment === 'prod' ? 
        'https://us-central1-com-varnit-expense-sheet.cloudfunctions.net/app' : 
        'https://us-central1-expense-sheets-dev.cloudfunctions.net/appdev',
        endpoints: defaultServiceEndpoints
    }
};
