import * as express from "express";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as config from "./config/app";
import * as route from "./config/route";
import { PassportSession } from "./middleware/PassportSession";
import "./config/passport";


const app = express();

dotenv.config({path: '.env'});

/**
 * Database connection
 */
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, { useNewUrlParser: true });
// (<any>mongoose).Promise = global.Promise;

/**
 * Express config
 */
config.app(app);

/**
 * Middleware
 */
(new PassportSession).handle(app);

/**
 * Routes
 */
route.web(app);
route.api(app);


export default app;