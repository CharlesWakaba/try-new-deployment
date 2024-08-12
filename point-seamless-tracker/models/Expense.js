const db = require('../config/database');

const Expense = {
  create: (userId, amount, description, category) => {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO expenses (user_id, amount, description, category) VALUES (?, ?, ?, ?)', 
        [userId, amount, description, category], function(err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  },

  findByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM expenses WHERE user_id = ? ORDER BY created_at DESC', [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  update: (id, userId, amount, description, category) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE expenses SET amount = ?, description = ?, category = ? WHERE id = ? AND user_id = ?',
        [amount, description, category, id, userId], function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  },

  delete: (id, userId) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM expenses WHERE id = ? AND user_id = ?', [id, userId], function(err) {
        if (err) reject(err);
        else resolve(this.changes);
      });
    });
  },

  getMonthlyTotal: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT strftime('%Y-%m', created_at) as month, SUM(amount) as total
        FROM expenses
        WHERE user_id = ?
        GROUP BY strftime('%Y-%m', created_at)
        ORDER BY month DESC
        LIMIT 6
      `, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

module.exports = Expense;