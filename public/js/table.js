// Fetch transactions from the API and load them into DataTables
async function loadTable() {
  const response = await fetch('/api/transactions');
  const data = await response.json();

  const rows = data.map(t => [
    t.tx_date.slice(0, 10),
    t.description,
    t.category,
    t.product || '-',
    t.quantity || '-',
    Number(t.amount).toFixed(2)
  ]);

  new DataTable('#txTable', {
    data: rows,
    order: [[0, 'desc']]
  });
}

loadTable();