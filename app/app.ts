import * as express from "express";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as config from "./config/app";
import * as Api from "../routes/api";
import * as Web from "../routes/web";
import PassportSession from "./middleware/PassportSession";
import "./config/passport";


const app = express();

dotenv.config({path: '.env'});

/**
 * Database connection
 */
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { useNewUrlParser: true });
// (<any>mongoose).Promise = global.Promise;

/**
 * Express config
 */
config.app(app);

/**
 * Middleware
 */
PassportSession.handle(app);

/**
 * Routes
 */
Web.route(app);
Api.route(app);


export default app;