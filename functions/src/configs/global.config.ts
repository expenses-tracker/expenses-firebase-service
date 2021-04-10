import { loggerService } from "core-api-lib";

export const GLOBAL_CONFIG = {
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS ? Number(process.env.BCRYPT_SALT_ROUNDS) : 12
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