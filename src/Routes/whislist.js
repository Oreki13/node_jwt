const express = require("express");
const router = express.Router();
const wishlist = require("../Controllers/whislist");

router
  .get("/:id_user", wishlist.getWishlist)
  .post("/:id_user/:id_course", wishlist.postWishlist)
  .delete("/:id_user/:id_course", wishlist.deleteWishlist);

module.exports = router;
