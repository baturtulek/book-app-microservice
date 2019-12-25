const express           = require("express");
const User              = require("../models/userModel");
const UserController    = require("../controllers/userController");
const router            = express.Router();

router.get('/profile', UserController.get_profile);
router.post("/login", UserController.user_login);
router.post("/register", UserController.user_signup);
router.get("/logout", UserController.user_logout);
module.exports = router;

// router.post("/addlist/:bookid", UserController.addlist);
// router.post("/mylist", UserController.mylist);