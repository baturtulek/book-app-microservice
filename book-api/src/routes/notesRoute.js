const express           = require("express");
const Note              = require("../models/noteModel");
const NotesController   = require("../controllers/notesController");
const router            = express.Router();

//router.get("/detail/:noteId", checkAuth, NotesController.notes_get_id);

// router.get("/add/:bookid", (req, res) => {
//     res.render("notes/addnote", { req });
// });

router.post("/add/:bookid", NotesController.notes_create);



router.get("/note/:bookid", NotesController.notes_get_book);

router.get("/delete", NotesController.notes_delete);

router.get("/delete/all", (req, res) => {
    Note.deleteMany({}).then(() => {
        res.status(200).json({
            message: "jdfsa"
        });
    });
});

module.exports = router;
