import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import path from "path";
import morgan from "morgan";
import session from "express-session";
import validator from "express-validator";
import { createClient } from "redis";
import connectRedis from "connect-redis";
import passport from "passport";
import lusca from "lusca";
import logger from "./util/logger";
import { PORT, SESSION_SECRET, REDIS_PORT, REDIS_HOST } from "./util/secrets";
import { createConnection } from "typeorm";
import { ROOT, STATIC_PATH } from "setting/constants";
import router from "./routes";
import "./util/passport";

const redisStore = connectRedis(session);
const redisClient = createClient({ port: REDIS_PORT, host: REDIS_HOST });
redisClient.on("connect", () => logger.info("redis connected"));

const dbConnectionLoop = (seconds: number) => {
  const startTime = new Date().getTime();
  const connect = () => {
    createConnection()
      .then(async connection => {
        await connection.query(`CREATE DATABASE IF NOT EXISTS cuisine`);
        await connection.query(`USE cuisine`);
        logger.info("mysql connected");
      })
      .catch(err => {
        const curTime = new Date().getTime();
        if (curTime - startTime > seconds * 1000) {
          logger.error(err);
        } else {
          connect();
        }
      });
  };
  connect();
};
dbConnectionLoop(30);

const app = express();

app.set("port", PORT || 8888);
app.set("views", path.resolve(__dirname, "../views"));
app.set("view engine", "pug");

app.use(compression());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    name: "cuisine.sid",
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new redisStore({ client: redisClient })
  })
);
app.use(validator());
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(lusca.csrf());
app.disable("x-powered-by");

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals._csrf = req.csrfToken();
  next();
});

app.use(
  STATIC_PATH,
  express.static(path.resolve(__dirname, "../dist"), { maxAge: 31557600000 })
);

app.use(ROOT || "/", router);

export default app;
