const Reimbursement = require("../models/Reimbursement");
const auth = require("../middlewares/auth");

const mongoose = require("mongoose");
const router = require("express").Router();

router.route('/').get((req, res) => {
  Reimbursement.find()
    .then((reimbursements) => res.json(reimbursements))
    .catch((err) => res.status(400).json('Error: ' + err));
  });

router.route('/:id').get((req, res) => {
  Reimbursement.findById(req.params.id)
  .then((reimbursement) => res.json(reimbursement))
  .catch((err) => res.status(400).json('Error: ' + err));
  });
  
  router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const amount = req.body.amount;
  const assignedTo = req.body.assignedTo;
  const createdBy = req.body.createdBy;
  
  const newReimbursement = new Reimbursement({
  title,
  description,
  amount,
  assignedTo,
  createdBy,
  });
  
  newReimbursement
  .save()
  .then(() => res.json('Reimbursement added!'))
  .catch((err) => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').put((req, res) => {
  Reimbursement.findByIdAndUpdate(
  req.params.id,
  {
  $set: {
  title: req.body.title,
  description: req.body.description,
  amount: req.body.amount,
  assignedTo: req.body.assignedTo,
  updatedAt: Date.now(),
  },
  },
  { new: true }
  )
  .then(() => res.json('Reimbursement updated!'))
  .catch((err) => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id/status').patch((req, res) => {
  const status = req.body.status;
  const comment = req.body.comment;
  const createdBy = req.body.createdBy;
  
  Reimbursement.findByIdAndUpdate(
  req.params.id,
  {
  $set: {
  status,
  updatedAt: Date.now(),
  },
  $push: {
  comments: {
  text: comment,
  createdBy,
  },
  },
  },
  { new: true }
  )
  .then(() => res.json('Reimbursement status updated!'))
  .catch((err) => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
  Reimbursement.findByIdAndDelete(req.params.id)
  .then(() => res.json('Reimbursement deleted.'))
  .catch((err) => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;

