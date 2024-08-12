const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findByUserId(req.user.userId);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses' });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const expenseId = await Expense.create(req.user.userId, amount, description, category);
    const newExpense = await Expense.findByUserId(req.user.userId);
    res.json(newExpense[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense' });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id, amount, description, category } = req.body;
    await Expense.update(id, req.user.userId, amount, description, category);
    res.json({ message: 'Expense updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense' });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.delete(id, req.user.userId);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense' });
  }
};

exports.getMonthlyTotal = async (req, res) => {
  try {
    const monthlyTotal = await Expense.getMonthlyTotal(req.user.userId);
    res.json(monthlyTotal);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monthly total' });
  }
};