const express = require("express");
const getStore = require("../Controllers/store");
const router = express.Router();
const Auth = require("../Helpers/auth");

router.all("/*", Auth.authInfo);

router.get("/get/:page", getStore.getAllStore);
router.get("/category", getStore.getCategory);
router.get("/branch", getStore.getBranch);

router.post("/item/", getStore.postStore);
router.post("/category/", getStore.postCcatgory);

router.delete("/:id", getStore.deleteItem);
router.patch("/:id", getStore.updateItem);

module.exports = router;
