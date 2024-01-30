process.env.NODE_ENV = process.env.NODE_ENV || "development";

require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const helmet = require("helmet");
const version = process.env.API_VERSION || `v1`;
const port = process.env.SERVER_PORT || 3000;
const { errors } = require("celebrate");
const { logger } = require("./winstonLogger");

logger.debug(
  `Logging for debug purpose urls; mongo :: ${process.env.MONGODB_URL}, upm url:: ${process.env.UPM_URL}`
);

/* please mention any cache cleanup or db disconnect in this file */
require("./clear");
require("./db");

//app routing
const fs = require("fs");

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
      },
    },
  })
);

// Use JSON parser for parsing payloads as JSON on all non-webhook routes.
app.use((req, res, next) => {
  if (req.originalUrl === `/api/${version}/webhook`) {
    logger.info(`Store-Service :: webhook originalUrl ${req.originalUrl}`);
    next();
  } else {
    logger.info(`Store-Service :: bodyparsing URL`);
    bodyParser.json()(req, res, next);
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
//cookie parser
app.use(cookieParser());

//cors middleware;
app.use(express.json({ limit: "5mb" }));
app.use(cors());

app.use(express.urlencoded({ extended: false }));
//incase public used
// app.use(express.static(path.join(__dirname, "public")));

const routesDir = "./routes";
fs.readdirSync(routesDir).forEach((subdirectory) => {
  const subdirectoryPath = path.join(routesDir, subdirectory);

  if (fs.lstatSync(subdirectoryPath).isDirectory()) {
    fs.readdirSync(subdirectoryPath).forEach((file) => {
      if (file !== ".DS_Store") {
        const routePath = path.join(subdirectoryPath, file);
        const endpoint = `/api`; // Construct the endpoint based on the subdirectory and file name
        app.use(endpoint, require(`./${routePath}`));
      }
    });
  }
});

app.use(errors());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(port, () => {
  logger.info(`Starting Store Service On PORT :: ${port} `);
});

module.exports = app;
