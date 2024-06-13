const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const auth = require("../auth.js");

const User = require("../Controllers/Users.js");

router.post("/register", User.Register);
router.post("/login", User.Login);

module.exports = router;
