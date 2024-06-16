const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const auth = require("../auth.js");

const { verify } = auth;

const User = require("../Controllers/Users.js");

router.post("/register", User.Register);
router.post("/login", User.Login);
router.post("/:userID",verify, User.getUserDetail);

module.exports = router;
