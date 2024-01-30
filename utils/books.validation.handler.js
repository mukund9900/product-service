const { body, param } = require('express-validator');

// Validation for creating a new book
const createBookValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('publishedDate').optional().isISO8601().toDate().withMessage('Invalid published date'),
  body('genre').optional().isString().withMessage('Genre must be a string'),
  body('isbn').optional().isString().withMessage('ISBN must be a string'),
  body('availability').optional().isBoolean().withMessage('Availability must be a boolean'),
];

// Validation for updating a book by ID
const updateBookValidation = [
  param('id').isInt().withMessage('Invalid book ID'),
  body('title').optional().notEmpty().withMessage('Title is required'),
  body('author').optional().notEmpty().withMessage('Author is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('publishedDate').optional().isISO8601().toDate().withMessage('Invalid published date'),
  body('genre').optional().isString().withMessage('Genre must be a string'),
  body('isbn').optional().isString().withMessage('ISBN must be a string'),
  body('availability').optional().isBoolean().withMessage('Availability must be a boolean'),
];

module.exports = {
  createBookValidation,
  updateBookValidation,
};
