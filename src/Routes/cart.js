const express = require("express");
const router = express.Router();
const cart = require("../Controllers/cart");

router
  .get("/:id_user", cart.getCart)
  .post("/:id_user/:id_item", cart.postCart)
  .delete("/:id_user/:id_item", cart.deleteCart);

module.exports = router;
