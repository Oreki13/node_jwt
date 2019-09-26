const express = require("express");
const store = require("../Routes/store");
const user = require("../Routes/user");
const cart = require("./cart");
const whislist = require("./whislist");
const transaction = require("./transaction");

const router = express.Router();

router.use("/store", store);
router.use("/auth", user);
router.use("/cart", cart);
router.use("/whislist", whislist);
router.use("/transaction", transaction);

module.exports = router;
