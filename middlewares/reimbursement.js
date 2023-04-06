const validateReimbursement = (req, res, next) => {
    const { title, description, amount, assignedTo } = req.body;
  
    if (!title || !description || !amount || !assignedTo) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    if (amount > 3000) {
      return res.status(400).json({ error: 'Amount cannot be more than INR 3000' });
    }
  
    Reimbursement.countDocuments({ createdBy: req.body.createdBy, month: new Date().getMonth() }).then((count) => {
      if (count >= 3) {
        return res.status(400).json({ error: 'Cannot add more than 3 reimbursements in a given month});}
      }));
    }