# EDEN Finance Dashboard

A web application that shows EDEN Bioworks' income and expenses in one place,
as a table and as charts.

Each entry has a date, an amount and a category. Sales entries also carry the
product and the quantity sold. Storing the data this way means the same records
can be read as a transaction list, a monthly summary or a product breakdown,
without entering anything twice.

The founders are the users. They use it to see how each reagent is selling,
where the money goes across cost categories, and how income compares to
expenses month by month. The same figures feed the numbers used in investor
reports.

There are two views. The transaction table lists every record and can be
sorted, searched and filtered. The visualizer page turns the same data into
charts: expenses by category, income against expenses per month, spending
over time, and budget against actual spending per category. Filters run
without a page reload.

This is a prototype built for a university project. It uses sample data, not
live financial records. It does not connect to accounting or banking systems
and it has no login. Production volume is not tracked, and there is no
comparison against market prices. Both could be added later.

## Tech stack

- **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript (ES6, no frontend framework)
- **Table:** DataTables.js
- **Charts:** Chart.js
- **Backend:** Node.js with Express
- **Database:** PostgreSQL

## Features

**Core**

- Transaction table with sorting, filtering, pagination and search
- Pie chart: expenses by category
- Bar chart: monthly income vs expenses
- Line chart: spending trend over time
- Budget vs actual chart per category
- Date range filter on both views, applied without a page reload (AJAX)
- REST API serving JSON from a relational database
- Responsive layout with navigation between the table and the visualizer

**Planned extensions**

- Revenue and sales volume by product
- Market price benchmarking against reference prices

## Data model

Four tables: `categories`, `products`, `transactions`, `budgets`.
See `docs/phase1/erd.pdf` for the entity relationship diagram.

## Setup

1. Install Node.js and PostgreSQL.

2. Create the database and load the schema and sample data:
```
psql -U postgres -c "CREATE DATABASE eden_finance;"
psql -U postgres -d eden_finance -f db/schema.sql
psql -U postgres -d eden_finance -f db/seed.sql
```

3. Copy `.env.example` to `.env` and fill in your database password.

4. Install dependencies and start the server:
```
npm install
npm start
```

5. Open http://localhost:3000 in your browser.

## Project status

Phase 3 (finalization)

## Author

Öykü Balaban
IU International University of Applied Sciences
Project: Getting started in Web Programming (DLBITPEWP01_E)
