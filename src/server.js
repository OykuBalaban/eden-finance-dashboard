const express = require('express');
const pool = require('./db');

const app = express();
const PORT = 3000;


app.use(express.static('public'));


function dateFilter(req, params) {
  const clauses = [];
  if (req.query.from) {
    params.push(req.query.from);
    clauses.push(`t.tx_date >= $${params.length}`);
  }
  if (req.query.to) {
    params.push(req.query.to);
    clauses.push(`t.tx_date <= $${params.length}`);
  }
  return clauses.length ? 'WHERE ' + clauses.join(' AND ') : '';
}


app.get('/api/transactions', async (req, res) => {
  try {
    const params = [];
    const where = dateFilter(req, params);
    const result = await pool.query(`
      SELECT
        t.id, t.tx_date, t.amount, t.quantity, t.description,
        c.name AS category, c.type AS category_type, p.name AS product
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      LEFT JOIN products p ON t.product_id = p.id
      ${where}
      ORDER BY t.tx_date
    `, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});


app.get('/api/category-summary', async (req, res) => {
  try {
    const params = [];
    const dateWhere = dateFilter(req, params);
    const where = dateWhere
      ? dateWhere + " AND c.type = 'expense'"
      : "WHERE c.type = 'expense'";
    const result = await pool.query(`
      SELECT c.name AS category, SUM(t.amount) AS total
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      ${where}
      GROUP BY c.name
      ORDER BY total DESC
    `, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// API: income and expenses per month
app.get('/api/monthly-summary', async (req, res) => {
  try {
    const params = [];
    const where = dateFilter(req, params);
    const result = await pool.query(`
      SELECT
        to_char(date_trunc('month', t.tx_date), 'YYYY-MM') AS month,
        c.type, SUM(t.amount) AS total
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      ${where}
      GROUP BY month, c.type
      ORDER BY month
    `, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});