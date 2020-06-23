const express = require("express");
const user = require("../Controllers/user");
const router = express.Router();
const Auth = require("../Helpers/auth");

router.all("/*", Auth.authInfo);
router.get("/getAll/", user.getAll);
router.post("/updatePerm/", user.updatePermission);
router.post("/updateUser/:id", user.updateUser);
router.get("/deleted/:id", user.deleteUser);

module.exports = router;
