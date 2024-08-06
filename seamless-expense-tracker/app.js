const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// In-memory storage for expenses (replace with a database in a real application)
let expenses = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { expenses });
});

app.post('/add-expense', (req, res) => {
    const { description, amount, date } = req.body;
    expenses.push({ description, amount: parseFloat(amount), date });
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});