let dataTable = null;

// Fetch transactions (optionally filtered by date) and load into DataTables
async function loadTable(from, to) {
  let url = '/api/transactions';
  const params = [];
  if (from) params.push('from=' + from);
  if (to) params.push('to=' + to);
  if (params.length) url += '?' + params.join('&');

  const response = await fetch(url);
  const data = await response.json();

  const rows = data.map(t => [
    t.tx_date.slice(0, 10),
    t.description,
    t.category,
    t.product || '-',
    t.quantity || '-',
    Number(t.amount).toFixed(2)
  ]);

  // Rebuild the table on each filter change
  if (dataTable) {
    dataTable.clear();
    dataTable.rows.add(rows);
    dataTable.draw();
  } else {
    dataTable = new DataTable('#txTable', {
      data: rows,
      order: [[0, 'desc']]
    });
  }
}

document.getElementById('applyFilter').addEventListener('click', () => {
  const from = document.getElementById('fromDate').value;
  const to = document.getElementById('toDate').value;
  loadTable(from, to);
});

document.getElementById('clearFilter').addEventListener('click', () => {
  document.getElementById('fromDate').value = '';
  document.getElementById('toDate').value = '';
  loadTable();
});

loadTable();