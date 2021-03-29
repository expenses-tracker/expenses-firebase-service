import { loggerService } from "core-api-lib";

export const GLOBAL_CONFIG = {
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS ? Number(process.env.BCRYPT_SALT_ROUNDS) : 12,
    database: {
        produrl: 'mongodb+srv://varnit-mongodb:qD9gPINXmP9C4zXF@azure-asia-cluster.bellz.azure.mongodb.net/expenses?retryWrites=true&w=majority',
        devurl: 'mongodb+srv://varnit-mongodb:oykq7IiTURHoU03Z@expense-dev.vhxfi.mongodb.net/expenses?retryWrites=true&w=majority'
    }
};

export const whiteListedUrls = [
    '/users/login',
    '/users/register',
    '/referenceData/',
    '/healthcheck',
    '/web/env.js',
    '/'
];

export enum LOG_LEVEL {
    error = 'error',
    warn = 'warn',
    info = 'info',
    http = 'http',
    verbose = 'verbose',
    debug = 'debug',
    silly = 'silly'
};

export const logger = loggerService;