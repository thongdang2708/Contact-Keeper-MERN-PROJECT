
const express = require("express");

const {register, login, getMe} = require("../controllers/userControllers");

const {protect} = require("../middleware/auth");
const router = express.Router();

router.route("/").post(register);
router.route("/login").post(login);
router.route("/me").get(protect, getMe);

module.exports = router;