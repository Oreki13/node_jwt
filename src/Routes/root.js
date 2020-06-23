const express = require("express");
const user = require("../Routes/user");
const users = require("../Routes/users");


const router = express.Router();


router.use("/auth", user);
router.use("/user", users);



module.exports = router;
