const BookModel = require("../models/bookModel");

exports.createBook = async (req, res, next) => {
  try {
    const created = await BookModel.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

exports.getBooks = async (req, res, next) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await BookModel.findById(req.params.bookId);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const updated = await BookModel.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      { new: true }
    );
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const deleted = await BookModel.findByIdAndDelete(req.params.bookId);
    if (deleted) {
      res.status(200).json({ message: "Book deleted successfully" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    next(error);
  }
};
