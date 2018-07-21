import * as express from "express";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as mongo from "connect-mongo";
import * as compression from "compression";


export let app = app => {
    const MongoStore = mongo(session);

    app.set("view engine", "pug");
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_KEY,
        store: new MongoStore({
            url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
            autoReconnect: true
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};