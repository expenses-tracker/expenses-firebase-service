import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { LOG_LEVEL, logger, whiteListedUrls } from './configs/global.config';

import { errorHandler } from 'core-api-lib/middleware/error.middleware';
import { notFoundHandler } from 'core-api-lib/middleware/notFound.middleware';
import { checkJwt, IAuthConfig, init } from 'core-api-lib/middleware/auth.middleware';
import { AllRoutes } from './routes/routes.index';
import { AllServices } from './services/service.index';
import { ConfigService } from './configs/config.service';

dotenv.config();

/**
 * App Variables
 */
const PORT: number = 3000;

const app = express();

/**
 *  Auth Configuration
 */
const authConfig: IAuthConfig = {
    PRIVATE_KEY_PATH: './src/configs/public.key',
    PUBLIC_KEY_PATH: './src/configs/public.key',
    WHITELISTED_URLS: whiteListedUrls
}
init(authConfig);

/**
 *  App Configuration
 */
app.use(helmet());
app.use(express.json({
    limit: '2mb'
}));

// CORS setup
const service_env = ConfigService.allConfigs().environment;
console.log(`Service Environment ::: ${service_env}`);
const clientUrl = ConfigService.isProdEnv() ? process.env.APP_URL : process.env.DEV_APP_URL;
const appUrl = clientUrl || 'http://localhost:4200';

const corsOptions = {
    'origin': appUrl,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 204
  };
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Routes init
app.use(checkJwt);
AllRoutes.init(app);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */
app.listen(PORT, async () => {
    logger.log(LOG_LEVEL.info, `listening on port ${PORT}`);
    AllServices.init();
});

process.on('SIGINT', async () => {
    logger.log(LOG_LEVEL.error, `Process SIGINT type failure!`);
    await AllServices.dbClose();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    logger.log(LOG_LEVEL.error, `Process SIGTERM type failure!`);
    await AllServices.dbClose();
    process.exit(0);
});

process.on('uncaughtexception', async (err, origin) => {
    logger.log(LOG_LEVEL.error, `Process UnCaught Exception type failure! Error: ${JSON.stringify(err)} Origin: ${JSON.stringify(origin)}`);
    await AllServices.dbClose();
    process.exit(0);
});

const service_name = ConfigService.isProdEnv() ? 'app' : `app${service_env}`;
exports[service_name] = functions.https.onRequest(app);

