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
    production: process.env.environment === 'prod',
    service: {
        domain: process.env.domain,
        endpoints: defaultServiceEndpoints
    }
};
