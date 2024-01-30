'use strict';

// uncomment this and comment below for development
module.exports = {
    HOST: "my-database-1.cpeoek6204ty.ap-south-1.rds.amazonaws.com",
    USER: "postgres",
    PASSWORD: "12345678",
    DB: "initialdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
/* module.exports = {
    HOST: process.env.PGHOST,
    USER: process.env.PGUSER,
    PASSWORD: process.env.PGPWD,
    DB: process.env.PGDB,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
 */