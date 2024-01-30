/**
 * Created on 29/1/2024; @author Mukund Raj
 * @version v1.0
 * This file is required only once in your application.
 */

"use strict";

const {logger} = require("./winstonLogger");

process.on("uncaughtException", function (err) {
  logger.error("Uncaught exception: ", err);
  logger.error(err.stack);
});

/* 
cache library
*/
var disconnectCache = function () {
  logger.info("Disconnecting cache...");
  /* disconnect the cache */
};

var cleanup = function () {
  disconnectCache();
  logger.debug("Cleanup Done");
};

process.once("SIGINT", function () {
  logger.debug("Server is shutting down from SIGINT (Ctrl-C)...");
  process.exit(1);
});

process.once("SIGTERM", function () {
  logger.debug("Server is shutting down from SIGTERM...");
  process.exit(1);
});

process.once("exit", function () {
  cleanup();
});
