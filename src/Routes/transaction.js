const express = require("express");
const router = express.Router();

const transactionsController = require("../Controllers/transaction");

router
  .get("/:id_user", transactionsController.getTransaction)
  .get("/month/:month", transactionsController.getTransactionsByMonth)
  .post("/:id_user", transactionsController.postTransaction);

module.exports = router;
