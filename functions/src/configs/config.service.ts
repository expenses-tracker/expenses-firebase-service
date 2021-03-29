import * as functions from 'firebase-functions';
import { GLOBAL_CONFIG } from './global.config';

export interface ServiceConfig {
    environment: string;
    domain: string;
    mongopwd?: string;
}

export interface ExpenseConfig {
    expenseservice: ServiceConfig;
}

export class ConfigService {
    private static firebaseConfig = functions.config();

    private static defaults: ExpenseConfig = {
        expenseservice: {
            environment: 'dev',
            domain: '',
            mongopwd: ''
        }
    }

    static allConfigs(): ServiceConfig {
        if (process.env && process.env.NODE_ENV === 'LOCAL') {
            console.info(`loading default firebase configs`);
            return this.defaults.expenseservice;
        }
        if (!this.firebaseConfig.expenseservice) {
            console.error(`Environment variables not configured! "expenseservice" config key must be configured.`);
            throw new Error('Environment variables not configured! \"expenseservice\" config key must be configured.');
        }
        console.info(`Found firebase config`);
        return this.firebaseConfig.expenseservice as ServiceConfig;
    }

    static isDevEnv(): boolean {
        return this.allConfigs().environment === 'dev';
    }

    static isProdEnv(): boolean {
        return this.allConfigs().environment === 'prod';
    }

    static mongoUrl() {
        if (this.isDevEnv()) {
            return GLOBAL_CONFIG.database.devurl;
        } else if (this.isProdEnv()) {
            return GLOBAL_CONFIG.database.produrl;
        } else {
            throw new Error('Environment value not found');
        }
    }
}
