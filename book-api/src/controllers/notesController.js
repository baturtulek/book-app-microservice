const mongoose  = require("mongoose");
const Note      = require("../models/noteModel");

exports.notes_create = (req, res) => {
    let userData = req.userData;
    const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        note: req.body.note,
        book: req.params.bookid,
        user: userData.userId
    });
    note.save()
    .then(note => {
        return res.status(200).json({
            data: { note },
            errors: [],
            message: 'Note is created!'
          });
    });
};

exports.notes_get_book = (req, res, next) => {
    let userData = req.userData;
    Note.find( { user: userData.userId, book: req.params.bookid })
        .select("_id note book")
        .populate({ path: "book", select: "name editor author" })
        .exec()
        .then(notes => {
            if (notes.length > 0) {
                console.log("docs ", notes);
                return res.status(200).json({
                    data: { notes },
                    errors: [],
                });
            } else {
                return res.status(404).json({
                    data: null,
                    errors: ['Can not find notes!']
                });
            }
        })
        .catch(error => {
            return res.status(500).json({
                data: null,
                errors: ['Db Error!']
            });
        });
};

exports.notes_delete = (req, res, next) => {};
