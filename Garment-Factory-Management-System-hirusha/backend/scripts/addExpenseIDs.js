const mongoose = require('mongoose');
const Budget = require('../model/Budget');
const Counter = require('../model/Counter');

// Replace with your actual MongoDB connection string and database name
const MONGO_URI = 'mongodb://localhost:27017/YOUR_DB_NAME';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function addExpenseIDs() {
  try {
    // Get the current counter
    let counter = await Counter.findById('expenseid');
    let seq = counter ? counter.seq : 0;

    // Find all expenses without ExpenseID, sorted by date
    const expenses = await Budget.find({ ExpenseID: { $exists: false } }).sort({ Date: 1 });

    for (const expense of expenses) {
      seq += 1;
      expense.ExpenseID = seq;
      await expense.save();
      console.log(`Updated expense ${expense._id} with ExpenseID ${seq}`);
    }

    // Update the counter
    await Counter.findByIdAndUpdate(
      { _id: 'expenseid' },
      { seq },
      { upsert: true }
    );

    console.log('All missing ExpenseIDs have been added.');
    process.exit();
  } catch (err) {
    console.error('Error updating ExpenseIDs:', err);
    process.exit(1);
  }
}

addExpenseIDs(); 