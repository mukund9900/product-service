
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:', { logging: false });


// Define your models here (similar to your actual models)
const BookStore = sequelize.define(
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
      unique: true,
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

module.exports = { sequelize, BookStore };
