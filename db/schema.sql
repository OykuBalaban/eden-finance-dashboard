-- EDEN Finance Dashboard database schema

DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  
  name VARCHAR(50) NOT NULL,
  type VARCHAR(10) NOT NULL  -- 'income' or 'expense'
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  unit VARCHAR(20)
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  tx_date DATE NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  quantity NUMERIC(10,2),
  description TEXT,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  product_id INTEGER REFERENCES products(id)
);

CREATE TABLE budgets (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  period_month DATE NOT NULL,
  planned_amount NUMERIC(12,2) NOT NULL
);