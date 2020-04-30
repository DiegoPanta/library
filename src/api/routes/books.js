const express = require("express");
const router = express.Router();

const BooksController = require('../controllers/books');

router.get("/", BooksController.books_get_all);
router.post("/", BooksController.books_post_create);
router.get("/:bookId", BooksController.books_get_byId);
router.patch("/:bookId", BooksController.books_patch_byId);
router.delete("/:bookId", BooksController.books_delete_byId);

module.exports = router;