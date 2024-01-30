
# Book Store Service

A simple REST API for managing books with search capabilities.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Testing](#testing)
- [Contributing](#contributing)

## Introduction

The Book Store Service is a RESTful API designed to manage books. It supports various search criteria and provides endpoints for retrieving and adding books.

## Features

- Retrieve a list of books based on search criteria (title, author, published date range, genre, sort order, pagination).
- Add new books to the database.
- JSON formatted responses for easy integration.

## Requirements

- Node.js
- npm (Node Package Manager)
- PostgreSQL database
- API testing tools (e.g., Postman)
- ExpressJS
- unit testing mocha, chai
- swagger-ui(api docmentation)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/book-store-service.git
   cd book-store-service


- Install Dependencies
    npm install
    npm run dev

## Usage

1. Start the server as mentioned in the installation steps.

2. Use API endpoints for book retrieval and addition. See Endpoints for details.

## Endpoints

1. GET /books: Retrieve a list of books based on search criteria.
2. POST /books: Add a new book to the database.

## Testing

npm test

