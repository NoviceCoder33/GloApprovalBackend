const Transaction = require("../models/Transaction");
const auth = require("../middlewares/auth");

const mongoose = require("mongoose");
const router = require("express").Router();

// create transaction
router.post("/transaction", auth, async (req, res) => {
  try {
    const { name, imageUrl, amount, type, currencySymbol } = req.body;

    const transaction = new Transaction({
      name,
      imageUrl,
      amount,
      type,
      currencySymbol,
      userId: req.user.id,
    });
    const result = await transaction.save();

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// fetch transaction
router.get("/transaction", auth, async (req, res) => {
  try {
    const { limit = 10, transactionId } = req.query;

    const query = transactionId ? { _id: { $lt: transactionId } } : {};

    const transaction = await Transaction.find(
      { ...query, userId: req.user.id },
      null,
      { sort: { _id: -1 }, limit: +limit }
    );

    res.json(transaction);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
