import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { LOG_LEVEL, logger, whiteListedUrls } from "./configs/global.config";

import { errorHandler } from "core-api-lib/middleware/error.middleware";
import { notFoundHandler } from "core-api-lib/middleware/notFound.middleware";
import { checkJwt, IAuthConfig, init } from "core-api-lib/middleware/auth.middleware";
import { AllRoutes } from "./routes/routes.index";
import { AllServices } from "./services/service.index";
import { ConfigService } from './configs/config.service';

dotenv.config();

/**
 * App Variables
 */
// if (!process.env.PORT) {
//     logger.log(LOG_LEVEL.error, `PORT configuration value not found!`);
//     process.exit(1);
// }

// const PORT: number = parseInt(process.env.PORT as string, 10);
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

app.use(express.json());
app.use(checkJwt);
AllRoutes.init(app);

app.use(errorHandler);
app.use(notFoundHandler);

const service_env = ConfigService.allConfigs().environment;
console.log(`Service Environment ::: ${service_env}`);

const appUrl = (ConfigService.isProdEnv() ? process.env.APP_URL : process.env.DEV_APP_URL) || 'http://localhost:4200';
const corsOptions = {
    origin: /example\.com$/,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', appUrl );
  next();
});

/**
 * Server Activation
 */
app.listen(PORT, async () => {
    logger.log(LOG_LEVEL.info, `listening on port ${PORT}`);
    AllServices.init();
});

process.on('exit', () => {
    AllServices.dbClose();
});

process.on('SIGINT', () => {
    AllServices.dbClose();
});

const service_name = ConfigService.isProdEnv() ? 'app' : `app${service_env}`;
exports[service_name] = functions.https.onRequest(app);

