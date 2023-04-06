const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reimbursementSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    assignedTo: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    comments: [
      {
        text: { type: String, required: true },
        createdBy: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Reimbursement = mongoose.model('Reimbursement', reimbursementSchema);

module.exports = Reimbursement;
