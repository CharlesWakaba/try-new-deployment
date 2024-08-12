const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Get all expenses for the logged-in user
router.get('/', expenseController.getExpenses);

// Add a new expense
router.post('/', expenseController.addExpense);

// Update an existing expense
router.put('/:id', expenseController.updateExpense);

// Delete an expense
router.delete('/:id', expenseController.deleteExpense);

// Get monthly total expenses
router.get('/monthly-total', expenseController.getMonthlyTotal);

module.exports = router;