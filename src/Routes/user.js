const express = require("express");
const user = require("../Controllers/user");
const router = express.Router();
const Auth = require("../Helpers/auth");

router.all("/*", Auth.authInfo);
router.post("/register/", user.register);
router.post("/login/", user.login);
router.get("/getus/:id", user.getUser);

module.exports = router;
