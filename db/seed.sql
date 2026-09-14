-- EDEN Finance Dashboard sample data

-- Categories
INSERT INTO categories (name, type) VALUES
('Reagent sales', 'income'),
('Grant funding', 'income'),
('Investment', 'income'),
('Culture media and chemicals', 'expense'),
('Energy', 'expense'),
('Lab consumables', 'expense'),
('Labor', 'expense'),
('Logistics', 'expense'),
('Maintenance', 'expense');

-- Products (the four reagents)
INSERT INTO products (name, unit) VALUES
('C-phycocyanin', 'mg'),
('SOD', 'mg'),
('R-phycoerythrin', 'mg'),
('Astaxanthin', 'g');

-- Transactions
-- category_id and product_id refer to the rows inserted above, in order
INSERT INTO transactions (tx_date, amount, quantity, description, category_id, product_id) VALUES
('2026-01-08', 4200.00, 350, 'C-phycocyanin batch sale', 1, 1),
('2026-01-15', 1800.00, 120, 'SOD sale', 1, 2),
('2026-01-22', 60000.00, NULL, 'Seed grant tranche', 2, NULL),
('2026-01-31', 2100.00, NULL, 'Monthly electricity', 5, NULL),
('2026-02-05', 3500.00, NULL, 'Culture media restock', 4, NULL),
('2026-02-12', 5600.00, 40, 'Astaxanthin sale', 1, 4),
('2026-02-18', 900.00, NULL, 'Pipette tips and tubes', 6, NULL),
('2026-02-27', 8000.00, NULL, 'Salaries', 7, NULL),
('2026-03-04', 2750.00, 180, 'R-phycoerythrin sale', 1, 3),
('2026-03-11', 1200.00, NULL, 'Shipping to distributor', 8, NULL),
('2026-03-19', 2100.00, NULL, 'Monthly electricity', 5, NULL),
('2026-03-25', 450.00, NULL, 'Equipment calibration', 9, NULL),
('2026-03-28', 40000.00, NULL, 'Angel investment', 3, NULL);

-- Budgets (planned monthly amounts per expense category)
INSERT INTO budgets (category_id, period_month, planned_amount) VALUES
(4, '2026-01-01', 3000.00),
(5, '2026-01-01', 2000.00),
(7, '2026-01-01', 8000.00),
(4, '2026-02-01', 3000.00),
(5, '2026-02-01', 2000.00),
(7, '2026-02-01', 8000.00);