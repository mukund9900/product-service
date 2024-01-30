const db = require("../model/psql");
const Books = db.books;
const { logger } = require("../winstonLogger");

const { Op } = require("sequelize");

let acceptedOptionalFilters = ["genre", "isbn", "availability", "bookId"];

const { validationResult } = require("express-validator");

const fetchAllBooks = async (req, res) => {
  try {
    const query = {};
    const filters = req.query;
    let searchText = req.query.searchTxt;
    let size = filters.size || 10;
    let page = filters.page || 1;

    let fromDate, toDate;
    let order = [["createdAt", "DESC"]];

    if (filters?.order) {
      filters.order = filters.order.replace(/'/g, '"');
      order = JSON.parse(filters.order) || [];
    }

    for (const key of acceptedOptionalFilters) {
      if (filters[key]) {
        query[key] = filters[key];
      }
    }

    if (searchText) {
      searchText = searchText.trim();
      query[Op.or] = [
        {
          title: { [Op.iLike]: `%${searchText}%` },
        },
        {
          author: { [Op.iLike]: `%${searchText}%` },
        },
      ];
    }

    if (filters.fromDate) {
      filters.fromDate = parseInt(filters.fromDate);
      fromDate = new Date(filters.fromDate);
    }
    if (filters.toDate) {
      filters.toDate = parseInt(filters.toDate);
      toDate = new Date(filters.toDate);
    }
    if (fromDate && toDate) {
      query["publishedDate"] = { [Op.gte]: fromDate, [Op.lte]: toDate };
    } else if (fromDate) {
      query["publishedDate"] = { [Op.gte]: fromDate };
    } else if (toDate) {
      query["publishedDate"] = { [Op.lte]: toDate };
    }

    const books = await Books.findAll({
      where: query,
      offset: (page - 1) * size,
      limit: size,
      order: order,
    });

    logger.debug("Successfully retrived the books for the given query");
    return res.status(200).json(books);
  } catch (error) {
    logger.error(error.stack);
    return res.status(500).json({ error: "Unable to fetch Books" });
  }
};

const createBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newBook = await Books.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    logger.error(error.stack);
    res.status(500).json({ error: error.message });
    return;
  }
};

const getBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Books.findByPk(bookId);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const [updatedRowsCount] = await Books.update(req.body, {
      where: { bookId: bookId },
    });
    if (updatedRowsCount > 0) {
      res.status(200).json({ message: "Book updated successfully" });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const deletedRowCount = await Books.destroy({
      where: { bookId: bookId },
    });
    if (deletedRowCount > 0) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  fetchAllBooks,
  createBook,
  getBookById,
  updateBookById,
  deleteBookById,
};
