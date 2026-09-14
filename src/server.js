const express = require('express');
const pool = require('./db');

const app = express();
const PORT = 3000;


app.use(express.static('public'));

// API: return all transactions with their category and product names
app.get('/api/transactions', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        t.id,
        t.tx_date,
        t.amount,
        t.quantity,
        t.description,
        c.name AS category,
        c.type AS category_type,
        p.name AS product
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      LEFT JOIN products p ON t.product_id = p.id
      ORDER BY t.tx_date
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});