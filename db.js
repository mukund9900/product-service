/**
 * Created on 29/1/2024; @author Mukund Raj
 * @version v1.0
 * This file is required only once in your application.
 */
"use strict";
require("dotenv").config();


const {logger} = require("./winstonLogger");
const pgdb = require("./model/psql");

//relational DB  
pgdb.sequelize.sync()
  .then(() => {
    logger.debug("Store Service :: Synced db.");
  })
  .catch((err) => {
    logger.error("Store Service :: Failed to sync db: " + err.stack);
  });

