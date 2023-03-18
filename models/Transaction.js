const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true },
  imageUrl: {
    type: String,
    required: true },
  amount: { 
    type: Number, 
    required: true },
  type: { 
    type: String, 
    required: true },
  currencySymbol: { 
    type: String, 
    required: true },
  postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },  
});

const Transaction =  mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
