const express = require("express");
const router = express.Router();
const user = require("../controller/sign.controller");

// Create Movie
router.post("/createmovie", user.createmovie);

// Create User Can Add Comment
router.post("/addcommentrating", user.addcommentrating);

// Get all Rating
router.get("/totalrating", user.totalrating);

// All Rating and comments
router.get("/allcomment", user.allcomment);

module.exports = router;
