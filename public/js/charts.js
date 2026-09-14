// Keep references so charts can be destroyed and redrawn on filter change
let pieChart = null;
let barChart = null;
let lineChart = null;

function buildQuery(from, to) {
  const params = [];
  if (from) params.push('from=' + from);
  if (to) params.push('to=' + to);
  return params.length ? '?' + params.join('&') : '';
}

async function drawPieChart(query) {
  const res = await fetch('/api/category-summary' + query);
  const data = await res.json();

  if (pieChart) pieChart.destroy();
  pieChart = new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
      labels: data.map(d => d.category),
      datasets: [{ data: data.map(d => Number(d.total)) }]
    }
  });
}

async function drawMonthlyCharts(query) {
  const res = await fetch('/api/monthly-summary' + query);
  const data = await res.json();

  const months = [...new Set(data.map(d => d.month))].sort();
  const income = months.map(m => {
    const row = data.find(d => d.month === m && d.type === 'income');
    return row ? Number(row.total) : 0;
  });
  const expense = months.map(m => {
    const row = data.find(d => d.month === m && d.type === 'expense');
    return row ? Number(row.total) : 0;
  });

  if (barChart) barChart.destroy();
  barChart = new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        { label: 'Income', data: income },
        { label: 'Expenses', data: expense }
      ]
    }
  });

  if (lineChart) lineChart.destroy();
  lineChart = new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        { label: 'Expenses', data: expense, fill: false, tension: 0.2 }
      ]
    }
  });
}

function loadCharts(from, to) {
  const query = buildQuery(from, to);
  drawPieChart(query);
  drawMonthlyCharts(query);
}

document.getElementById('applyFilter').addEventListener('click', () => {
  const from = document.getElementById('fromDate').value;
  const to = document.getElementById('toDate').value;
  loadCharts(from, to);
});

document.getElementById('clearFilter').addEventListener('click', () => {
  document.getElementById('fromDate').value = '';
  document.getElementById('toDate').value = '';
  loadCharts();
});

loadCharts();