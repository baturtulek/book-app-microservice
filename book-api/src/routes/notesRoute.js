const express           = require("express");
const Note              = require("../models/noteModel");
const NotesController   = require("../controllers/notesController");
const {isUserLoggedIn}  = require('../middlewares/checkAuth');
const router            = express.Router();

router.post("/add/:bookid", isUserLoggedIn, NotesController.notes_create);

router.get("/note/:bookid", isUserLoggedIn, NotesController.notes_get_book);

router.get("/delete", isUserLoggedIn,  NotesController.notes_delete);

module.exports = router;
