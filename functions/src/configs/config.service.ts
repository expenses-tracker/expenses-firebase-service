import { logger, LOG_LEVEL } from './global.config';

export interface ServiceConfig {
    environment: string;
    domain: string;
    mongourl: string;
}

export class ConfigService {
    private static defaults: ServiceConfig = {
        environment: 'dev',
        domain: '',
        mongourl: 'mongodb://localhost:27017/expenses'
    }

    static allConfigs(): any {
        if (process.env && process.env.NODE_ENV === 'LOCAL') {
            return this.defaults;
        }
        const config: ServiceConfig = {
            environment: process.env.environment || this.defaults.environment,
            domain: process.env.domain || this.defaults.domain,
            mongourl: process.env.mongourl || this.defaults.mongourl
        }
        logger.log(LOG_LEVEL.info, `Application config: ${JSON.stringify(config)}`);
        if (!config.mongourl || !config.environment || !config.domain) {
            logger.log(LOG_LEVEL.error, `Environment variables not configured!`);
            throw new Error('Environment variables not configured!');
        }
        return config;
    }

    static isDevEnv(): boolean {
        return this.allConfigs().environment === 'dev';
    }

    static isProdEnv(): boolean {
        return this.allConfigs().environment === 'prod';
    }

    static mongoUrl() {
        return this.allConfigs().mongourl;
    }
}
