const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");

router.post("/", BookController.createBook);
router.get("/", BookController.getBooks);
router.get("/:bookId", BookController.getBookById);
router.put("/:bookId", BookController.updateBook);
router.delete("/:bookId", BookController.deleteBook);

module.exports = router;
