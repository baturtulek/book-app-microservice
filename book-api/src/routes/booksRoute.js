const express           = require("express");
const BookController    = require("../controllers/booksController");
const {isUserLoggedIn}  = require('../middlewares/checkAuth');
const router            = express.Router();

router.get("/", BookController.book_get_all);

router.get("/detail/:bookId", BookController.book_get_id);

router.post("/add", isUserLoggedIn ,BookController.book_create);

router.get("/delete/:bookId",isUserLoggedIn ,BookController.book_delete);

module.exports = router;
