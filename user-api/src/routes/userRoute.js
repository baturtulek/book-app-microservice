const express           = require("express");
const UserController    = require("../controllers/userController");
const router            = express.Router();

router.get('/profile', UserController.get_profile);
router.post("/login", UserController.user_login);
router.post("/register", UserController.user_signup);
module.exports = router;
