
const express = require("express");

const {createContact, getAllContacts, getSingleContact, updateContact, deleteContact} = require("../controllers/contactControllers");

const {protect} = require("../middleware/auth");

const router = express.Router();

router.route("/").get(protect, getAllContacts).post(protect, createContact);
router.route("/:id").get(protect, getSingleContact).put(protect, updateContact).delete(protect, deleteContact);

module.exports = router;