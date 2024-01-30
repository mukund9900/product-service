
/* The code you provided is a JavaScript module that exports a Sequelize model definition for a
"BookStore" table in a database. */
"use strict";

module.exports = (sequelize, Sequelize) => {
  const book_store = sequelize.define(
    "BookStore",
    {
      bookId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      publishedDate: {
        type: Sequelize.DATE,
      },
      genre: {
        type: Sequelize.STRING(50),
      },
      isbn: {
        type: Sequelize.STRING(20),
      },
      availability: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
      tableName: "bookStore",
    }
  );
  return book_store;
};
