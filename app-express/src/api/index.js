const express = require("express");
const transactionRoutes = require("./transaction");
const accountRoutes = require("./account");
const router = express.Router();

router.get("/ping", (req, res) => {
  res.send("pong")
})

router.use("/api/transaction", transactionRoutes )
router.use("/api/account", accountRoutes )

module.exports = router;
